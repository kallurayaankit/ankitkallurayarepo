/* Scroll-driven launch vignette. Original meshes and shaders; no external assets. */
(() => {
  'use strict';
  const canvas = document.getElementById('launch-canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let toggle = null;
  const gl = canvas.getContext('webgl', { antialias: true, alpha: false, depth: true });
  if (!gl) return;

  const s = (lo, hi, n) => {
    const x = Math.min(1, Math.max(0, (n-lo)/(hi-lo)));
    return x*x*(3-2*x);
  };
  const mix = (a,b,t) => a + (b-a)*t;
  const vsub = (a,b) => a.map((x,i) => x-b[i]);
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const dot = (a,b) => a.reduce((q,x,i)=>q+x*b[i],0);
  const norm = a => { const n = Math.hypot(...a) || 1; return a.map(x => x/n); };
  const color = (hex) => hex.match(/../g).map(c=>parseInt(c,16)/255);
  const scale = (a,x) => a.map(c=>c*x);
  const add = (a,b) => a.map((x,i)=>x+b[i]);
  const rad = Math.PI*2;
  const bgVs = 'attribute vec2 p;varying vec2 uv;void main(){uv=p;gl_Position=vec4(p,0.,1.);}';
  const bgFs = `
    precision mediump float;
    varying vec2 uv;
    uniform vec3 R,U,F;
    uniform vec2 z;
    uniform float ascent,orbit,clock,detail;
    float hash(vec2 p){p=fract(p*vec2(.1031,.11369)); p+=dot(p,p.yx+19.19);return fract((p.x+p.y)*p.x);}
    float n(vec2 p){
      vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);
    }
    float fb(vec2 p){return .56*n(p)+.27*n(p*2.08+13.)+.115*n(p*4.21+27.)+.055*n(p*8.62+37.);}
    void main(){
      vec3 ray=normalize(F+uv.x*R*z.x+uv.y*U*z.y);
      vec3 dusk=vec3(.086,.102,.164);
      vec3 horizon=vec3(.22,.265,.378);
      float h=exp(-abs(ray.y-.04)*5.);
      float sunset=pow(max(dot(ray,normalize(vec3(.48,.033,-.51))),0.),11.);
      vec3 sky=mix(dusk,horizon,h*.86)+sunset*h*vec3(.24,.145,.078);
      sky=mix(sky,vec3(.037,.061,.131),ascent*.78);
      sky=mix(sky,vec3(.018,.027,.064),orbit);
      vec2 dome=vec2(atan(ray.x,-ray.z),asin(ray.y));
      if(detail>0.){
        // Perspective sky and broad layered cirrus at low altitude.
        vec2 c=vec2(dome.x*7.,dome.y*30.+clock*.023);
        float a=smoothstep(.45,.81,fb(c))*smoothstep(-.02,.15,ray.y);
        float b=smoothstep(.38,.71,fb(c*vec2(.87,1.72)+41.))*smoothstep(.01,.21,ray.y);
        sky+=mix(vec3(.065,.075,.10),vec3(.162,.13,.105),sunset)*(.59*a+.28*b)*(1.-ascent);
      }
      vec2 stars=dome*vec2(290.,255.);
      vec2 cell=floor(stars), frac=fract(stars)-.5;
      float dice=hash(cell);
      float point=max(0.,1.-length(frac-vec2(hash(cell+39.),hash(cell+63.))*.64+.32)*5.);
      sky+=vec3(.63,.75,1.)*(point*point)*step(.965,dice)*mix(.13,.97,orbit);
      // Curved Earth limb: a sphere viewed below the camera, with procedural
      // ocean, continents and cloud belts. Artist's impression, not a map.
      if(ascent>.02){
        float width=max(z.x/z.y,1.);
        vec2 xy=vec2(uv.x*width,uv.y);
        vec2 center=vec2(-.35,-3.6+orbit*.93);
        vec2 d=(xy-center)/2.69;
        float l=length(d), soft=exp(-abs(l-1.)*73.)*.48;
        vec3 rim=vec3(.14,.39,.67)*soft*ascent;
        sky+=rim;
        if(l<1.){
          float wz=sqrt(max(0.,1.-dot(d,d)));
          vec3 N=vec3(d,wz);
          float sunlight=max(0.,dot(N,normalize(vec3(.28,.89,.37))));
          vec2 map=vec2(atan(N.x,N.z),asin(N.y))*6.5+vec2(clock*.002,.0);
          float land=smoothstep(.498,.585,fb(map+vec2(7.7,32.5)));
          float cloud=smoothstep(.47,.8,fb(map*vec2(1.85,3.7)+vec2(21.,4.)));
          vec3 surface=mix(vec3(.040,.116,.235),vec3(.11,.22,.205),land);
          surface=mix(surface,vec3(.54,.68,.78),cloud*.64);
          vec3 earth=surface*(.34+sunlight*.69)+vec3(.07,.20,.41)*pow(1.-wz,4.);
          sky=mix(sky,earth+rim,ascent);
        }
      }
      sky*=mix(.71,1.,smoothstep(-1.,.6,uv.x));
      sky-=dot(uv*vec2(.45,.52),uv*vec2(.45,.52))*.04;
      gl_FragColor=vec4(sky,1.);
    }
  `;
  const meshVs = `
    attribute vec3 p,n,c; uniform mat4 mv;
    uniform vec3 offset; uniform float angle; uniform float lean;
    varying vec3 C,N,P;
    void main(){
      float a=cos(angle),b=sin(angle);
      float l=cos(lean),h=sin(lean);
      mat3 rot=mat3(a,0.,-b,0.,1.,0.,b,0.,a);
      mat3 tilt=mat3(l,-h,0.,h,l,0.,0.,0.,1.);
      P=tilt*rot*p+offset;N=tilt*rot*n; C=c;
      gl_Position=mv*vec4(P,1.);
    }
  `;
  const meshFs = `
    precision mediump float; varying vec3 C,N,P;
    uniform vec3 eye; uniform float orbit,burn,isRocket,air;
    void main(){
      vec3 n=normalize(N);
      vec3 key=normalize(vec3(.64,.45,-.55));
      float keyL=max(0.,dot(n,key));
      float fill=max(0.,dot(n,normalize(vec3(-.7,.3,1.))));
      float rim=pow(1.-abs(dot(n,normalize(eye-P))),2.4)*(.19+.18*orbit);
      float bottom=exp(-length(P*vec3(.22,.38,.22)))*burn*(1.-isRocket)*.47;
      vec3 db=vec3(.32,.37,.48)+vec3(.73,.70,.64)*keyL+vec3(.20,.24,.32)*fill;
      float speck=fract(sin(dot(mod(floor(P.xz*34.),71.),vec2(12.9898,78.233)))*87.541);
      float spec=pow(max(dot(reflect(-key,n),normalize(eye-P)),0.),23.)*isRocket;
      db*=mix(.89+speck*.18,1.,isRocket);
      vec3 lit=C*db+vec3(.16,.25,.39)*rim*(.22+C.r*.78);
      lit+=vec3(.92,.41,.13)*bottom+vec3(.34,.43,.59)*spec;
      float fog=(1.-exp(-max(0.,length(eye-P)-14.)*.023))*(1.-isRocket);
      lit=mix(lit,vec3(.175,.214,.31),fog);
      lit=mix(lit,vec3(.108,.135,.211),air*(1.-isRocket));
      gl_FragColor=vec4(lit,1.);
    }
  `;
  const particleVs = `
    attribute vec4 p;
    uniform mat4 mv;
    uniform vec3 offset;
    uniform float px,size;
    uniform mediump float amount,kind;
    varying float age,jitter;
    void main(){
      gl_Position=mv*vec4(p.xyz+offset,1.);
      gl_PointSize=clamp(px*size*(kind<.5?mix(.4,2.3,p.w):mix(.6,2.8,p.w))/gl_Position.w,1.,96.);
      age=p.w; jitter=fract(p.x*9.71+p.z*7.43);
    }
  `;
  const particleFs = `
    precision mediump float;
    uniform float amount,kind;
    varying float age,jitter;
    void main(){
      vec2 d=gl_PointCoord-.5;
      float q=length(d)*2.;
      float m=1.-smoothstep(.08,1.,q);
      float alpha=m*m*(1.-age)*amount;
      vec3 smoke=mix(vec3(.46,.45,.48),vec3(.24,.28,.35),age);
      vec3 flame=mix(vec3(1.,.88,.61),vec3(.83,.24,.055),age);
      if(kind<.5) gl_FragColor=vec4(flame,alpha*.58);
      else gl_FragColor=vec4(smoke+vec3(.09,.041,.0)*(1.-age),alpha*.57);
    }
  `;
  function compile(t,source){
    const shader=gl.createShader(t);
    gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  function program(v,f,attrs,uniforms){
    const p=gl.createProgram();
    const vs=compile(gl.VERTEX_SHADER,v),fs=compile(gl.FRAGMENT_SHADER,f);
    gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);
    gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    return {p,a:Object.fromEntries(attrs.map(x=>[x,gl.getAttribLocation(p,x)])),u:Object.fromEntries(uniforms.map(x=>[x,gl.getUniformLocation(p,x)]))};
  }
  function view(eye,center,aspect){
    const f=norm(vsub(center,eye)),r=norm(cross(f,[0,1,0])),u=cross(r,f);
    const fy=1/Math.tan(19*Math.PI/180),fx=fy/aspect;
    const near=.15,far=250,az=(far+near)/(near-far),bz=2*far*near/(near-far);
    const m=[r[0]*fx,u[0]*fy,-f[0]*az,f[0],r[1]*fx,u[1]*fy,-f[1]*az,f[1],r[2]*fx,u[2]*fy,-f[2]*az,f[2],-dot(r,eye)*fx,-dot(u,eye)*fy,az*dot(f,eye)+bz,-dot(f,eye)];
    return {f,r,u,mat:new Float32Array(m),sf:[1/fx,1/fy]};
  }
  function triangle(mesh,a,b,c,n,col,override){
    for(const [i,p] of [a,b,c].entries()) mesh.push(...p,...(override?.[i] || n),...col);
  }
  function quad(mesh,a,b,c,d,colorVal,n){
    const normal=n||norm(cross(vsub(b,a),vsub(c,a)));
    triangle(mesh,a,b,c,normal,colorVal);triangle(mesh,a,c,d,normal,colorVal);
  }
  function box(mesh,pos,dims,col){
    const x=pos[0],y=pos[1],z=pos[2],a=dims[0]/2,b=dims[1]/2,c=dims[2]/2;
    const p=[[-a,-b,c],[a,-b,c],[a,b,c],[-a,b,c],[-a,-b,-c],[a,-b,-c],[a,b,-c],[-a,b,-c]].map(q=>add([x,y,z],q));
    for(const i of [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[3,2,6,7],[4,5,1,0]]) quad(mesh,...i.map(j=>p[j]),col);
  }
  function beam(mesh,a,b,width,col){
    const y=norm(vsub(b,a)),x=norm(cross(y,Math.abs(y[1])>.95?[1,0,0]:[0,1,0])),z=cross(x,y);
    const endpoints=[a,b].map(o=>[[-1,-1],[1,-1],[1,1],[-1,1]].map(([xx,zz])=>add(add(o,scale(x,xx*width/2)),scale(z,zz*width/2))));
    for(let i=0;i<4;i++){const j=(i+1)%4;quad(mesh,endpoints[0][i],endpoints[1][i],endpoints[1][j],endpoints[0][j],col);}
  }
  function lathe(mesh,x,z,profile,n=40){
    for(let p=0;p<profile.length-1;p++){
      const [y0,r0,c0]=profile[p], [y1,r1]=profile[p+1], slope=(r1-r0)/(y1-y0||.01);
      for(let i=0;i<n;i++){
        const a=i*rad/n,b=(i+1)*rad/n;
        const pos=(ang,r,y)=>[x+Math.cos(ang)*r,y,z+Math.sin(ang)*r];
        const N=ang=>norm([Math.cos(ang),-slope,Math.sin(ang)]);
        const A=pos(a,r0,y0), B=pos(b,r0,y0), C=pos(b,r1,y1), D=pos(a,r1,y1);
        const c=scale(c0,1+(i%11===0?-.032:0));
        triangle(mesh,A,C,B,null,c,[N(a),N(b),N(b)]);triangle(mesh,A,D,C,null,c,[N(a),N(a),N(b)]);
      }
    }
  }
  const rocket=[],pad=[];
  const white=color('d7dee9'),dark=color('2c3544'),metal=color('697c92'),joint=color('9aadc5'),amber=color('d09d59');
  lathe(rocket,0,0,[
    [0,.44,dark],[.10,.44,metal],[.16,.37,dark],[.27,.28,metal],[.48,.31,metal],
    [.52,.56,joint],[.58,.61,dark],[.75,.63,white],[1.03,.63,white],[2.1,.63,white],[3.25,.63,joint],[3.29,.639,white],
    [6.38,.639,dark],[6.46,.646,joint],[6.51,.646,dark],[6.65,.646,white],
    [7.65,.646,joint],[7.69,.647,white],[8.10,.646,white],[8.58,.617,white],[8.96,.55,white],
    [9.30,.45,white],[9.63,.314,white],[9.91,.169,white],[10.12,.075,joint],[10.23,.006,white]
  ]);
  for(let i=0;i<6;i++){
    const a=rad*i/6,x=Math.cos(a)*.44,z=Math.sin(a)*.44;
    lathe(rocket,x,z,[[.12,.129,dark],[.16,.129,metal],[.23,.106,metal],[.48,.077,metal]],16);
    beam(rocket,[Math.cos(a)*.664,.79,Math.sin(a)*.664],[Math.cos(a)*.673,3.22,Math.sin(a)*.673],.04,joint);
  }
  // Opaque material markings are geometry, not a copied livery.
  for(let i=0;i<5;i++){
    box(rocket,[-.135+i*.068,7.97,.646],[.039,.27,.012],i===1||i===2?amber:dark);
  }
  for(let i=0;i<4;i++) {
    const sx=i%2?1:-1,sz=i<2?1:-1;
    const verts=[[sx*.41,.54,sz*.41],[sx*.85,.60,sz*.85],[sx*.79,.82,sz*.79],[sx*.423,1.36,sz*.423]];
    const V=norm([sz,0,-sx]),A=verts.map(v=>add(v,scale(V,.026))),B=verts.map(v=>add(v,scale(V,-.026)));
    quad(rocket,...A,metal,V);quad(rocket,...B,dark,scale(V,-1));
    for(let j=0;j<4;j++){const k=(j+1)%4;quad(rocket,A[j],A[k],B[k],B[j],joint);}
  }
  // Launch complex: pad, deck, raised steelwork, mountains and sparse safety lights.
  box(pad,[0,-.30,0],[5.4,.60,5.0],color('6b7788'));
  box(pad,[0,-.72,0],[9.8,.65,8.5],color('424a5c'));
  box(pad,[0,-1.16,0],[43,.22,35],color('343c4b'));
  const steel=color('677585'), shade=color('3d4c60');
  const tx=3.6,tz=-1.8,w=1.52,top=11.55,floors=8;
  const corners=[[tx-w/2,tz-w/2],[tx+w/2,tz-w/2],[tx+w/2,tz+w/2],[tx-w/2,tz+w/2]];
  for(let y=0;y<floors;y++){
    const h=top*y/floors,k=top*(y+1)/floors;
    for(let i=0;i<4;i++){
      const [x,z]=corners[i],[x2,z2]=corners[(i+1)%4];
      beam(pad,[x,h,z],[x,k,z],.13,steel);
      beam(pad,[x,k,z],[x2,k,z2],.10,steel);
      beam(pad,[x,h,z],[x2,k,z2],.071,shade);
      beam(pad,[x,k,z],[x2,h,z2],.071,shade);
    }
    if(y%2===1)box(pad,[tx,k,tz],[w*1.08,.055,w*1.08],color('545f71'));
  }
  box(pad,[tx,top+.19,tz],[1.7,.44,1.65],steel);
  beam(pad,[tx,top+.4,tz],[tx,top+1.0,tz],.064,joint);
  for(const y of [2.68,6.46,8.3]){
    beam(pad,[tx-w/2,y,tz+.35],[.73,y,-.20],.106,steel);
    beam(pad,[tx-w/2,y-.55,tz+.35],[.73,y,-.20],.063,steel);
  }
  for(let i=0;i<7;i++){
    const big=i%3===0;
    box(pad,[i*2.8-13,-.53,-5.9-i%2*4],[big?2.2:1.45,big?1.05:.65,1.35],shade);
    box(pad,[i*2.8-13,-.13,-5.17-i%2*4],[.22,.095,.029],amber);
  }
  for(let i=0;i<2;i++){
    const x=i?7:-5.2,z=i?-7:3.7;
    beam(pad,[x,-1,z],[x,3.5,z],.088,steel);
    box(pad,[x,3.52,z],[.43,.17,.17],metal);
    box(pad,[x,3.50,z+.092],[.32,.09,.025],color('ffde9a'));
  }
  // Slightly terraced terrain, grass and distant ridges.
  box(pad,[0,-1.39,-6],[550,.14,550],color('303746'));
  const rng = i => {const f=Math.sin(i*127.18+8.349)*13847.291;return f-Math.floor(f);};
  for(let layer=0;layer<3;layer++){
    const baseZ=-43-layer*18;
    const ridge=(i)=> {
      const h=1.85+Math.sin(i*1.22+layer*4.4)*1.24+Math.cos(i*.41+layer*2.6)*1.1+rng(i+layer*94)*1.35;
      return [-178+i*5,h+layer*.54,baseZ+Math.cos(i*.53)*4];
    };
    const toe=(i,side)=>[-178+i*5,-1.32,baseZ+side*15+Math.sin(i*.42+layer)*4];
    for(let i=0;i<72;i++){
      const a=ridge(i),b=ridge(i+1),c=toe(i,1),d=toe(i+1,1),e=toe(i,-1),f=toe(i+1,-1);
      const c1=scale(color('3a4655'),1+rng(i+8)*.10),c2=scale(color('414d62'),.92+rng(i+61)*.13);
      quad(pad,c,d,b,a,c1);quad(pad,b,f,e,a,c2);
    }
  }
  for(let i=0;i<55;i++){
    const x=(rng(i+90)-.5)*115,z=(rng(i+169)-.5)*65;
    if(Math.abs(x)<23&&Math.abs(z)<20)continue;
    box(pad,[x,-1.30,z],[.9+rng(i+24)*6,.08,.7+rng(i+51)*4],color(i%3?'333c49':'373f4d'));
  }
  for(let i=0;i<13;i++){
    box(pad,[i*1.55-9.3,-1.261,6.7],[.65,.025,.08],color('7b8090'));
  }
  function buffer(data,usage=gl.STATIC_DRAW){
    const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,usage);return b;
  }
  const fulldata=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
  const off=[0,0,0], rocketVerts=rocket.length/9,padVerts=pad.length/9;
  const pts=145, raw = new Float32Array(pts*4);
  const mobile=()=>innerWidth<720;
  let bg,mesh,particles,fullB,padB,rocketB,particleB,stopped=false,pending=0,lastFrame=-1,animated=false,changeObserver,resizeObserver;
  try {
    bg=program(bgVs,bgFs,['p'],['R','U','F','z','ascent','orbit','clock','detail']);
    mesh=program(meshVs,meshFs,['p','n','c'],['mv','offset','angle','lean','eye','orbit','burn','isRocket','air']);
    particles=program(particleVs,particleFs,['p'],['mv','offset','px','size','amount','kind']);
    fullB=buffer(fulldata);padB=buffer(new Float32Array(pad));rocketB=buffer(new Float32Array(rocket));particleB=buffer(raw,gl.DYNAMIC_DRAW);
  } catch(err){console.warn('Launch backdrop unavailable:',err.message);return;}

  function attrib(location,n,stride,offset){
    gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,n,gl.FLOAT,false,stride,offset);
  }
  function drawMesh(b,count,offset,angle,lean,isRocket){
    gl.bindBuffer(gl.ARRAY_BUFFER,b);
    attrib(mesh.a.p,3,36,0);attrib(mesh.a.n,3,36,12);attrib(mesh.a.c,3,36,24);
    gl.uniform3fv(mesh.u.offset,offset);gl.uniform1f(mesh.u.angle,angle);
    gl.uniform1f(mesh.u.lean,lean);gl.uniform1f(mesh.u.isRocket,isRocket);
    gl.drawArrays(gl.TRIANGLES,0,count);
  }
  function spray(cam,clock,w,h,burn,lift,rx,lean,flame){
    const n=mobile()?105:pts, offset=flame?[rx,lift,0]:off;
    for(let i=0;i<n;i++){
      const age=(rng(i+257)+clock*(flame?1.58:.30))%1;
      const theta=rad*rng(i+588),r=rng(i+566);
      const reach=(flame ? .15+.68*age : 1.3+7.5*age)*r;
      const dx=Math.cos(theta)*reach,dz=Math.sin(theta)*reach;
      raw.set(flame?[dx-age*lean*5.4,-(.04+age*5.3),dz,age]:
        [dx,Math.max(-.9,.21+Math.sin(age*2.5)*age*1.7+Math.sin(theta)*.38),dz,age],i*4);
    }
    gl.useProgram(particles.p);
    const p=particles.u;
    gl.uniformMatrix4fv(p.mv,false,cam.mat);
    gl.uniform3fv(p.offset,offset);
    gl.uniform1f(p.kind,flame?0:1);
    gl.uniform1f(p.px,h/2);
    gl.uniform1f(p.size,flame?1.5:4.45);
    gl.uniform1f(p.amount,burn*(flame?1.24:1.55));
    gl.bindBuffer(gl.ARRAY_BUFFER,particleB);gl.bufferSubData(gl.ARRAY_BUFFER,0,raw);
    attrib(particles.a.p,4,16,0);
    gl.drawArrays(gl.POINTS,0,n);
  }
  function render(ms){
    pending=0;
    if(stopped)return;
    if(animated && lastFrame>=0 && ms-lastFrame<26){queue();return;}
    lastFrame=ms;
    if(reduce.matches){
      delete canvas.dataset.renderer;animated=false;
      return;
    }
    const pause=toggle?.getAttribute('aria-pressed')==='true';
    const story=document.scrollingElement;
    const max=story.scrollHeight-innerHeight;
    const now=ms*.001;
    const time=pause?0:now;
    const p=!pause&&max>0?Math.max(0,Math.min(1,story.scrollTop/max)):0;
    const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight;
    const dpr=Math.min(devicePixelRatio||1,mobile()?1.08:1.4,1650/w,1250/h);
    const vw=Math.max(1,Math.round(w*dpr)),vh=Math.max(1,Math.round(h*dpr));
    if(canvas.width!==vw||canvas.height!==vh){canvas.width=vw;canvas.height=vh;}
    const aspect=w/h,ascent=s(.43,.76,p),orbit=s(.69,.93,p),flight=s(.11,.30,p);
    const lift=s(.14,.46,p)*28+s(.39,.96,p)*30;
    const lx=s(.35,.83,p)*7.9,lean=s(.35,.97,p)*.93;
    const burn=s(.08,.21,p)*(1-s(.78,.96,p));
    const az=.42+s(.03,.83,p)*1.08, distance=mix(23.8,28,s(.3,.9,p));
    const mid=4.5+lift+mix(.17,-.75,orbit);
    const logical=[lx,mid,0];
    const direction=norm([Math.sin(az),.075*flight-.07*(1-flight),Math.cos(az)]);
    const opticalRight=norm(cross(scale(direction,-1),[0,1,0]));
    const offset=distance*aspect*Math.tan(19*Math.PI/180)*(mobile()?.58:.51);
    const target=add(logical,scale(opticalRight,-offset));
    const eye=add(target,scale(direction,distance));
    const cam=view(eye,target,aspect);

    gl.viewport(0,0,vw,vh);
    gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.depthMask(true);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.useProgram(bg.p);gl.bindBuffer(gl.ARRAY_BUFFER,fullB);attrib(bg.a.p,2,8,0);
    gl.uniform3fv(bg.u.R,cam.r);gl.uniform3fv(bg.u.U,cam.u);gl.uniform3fv(bg.u.F,cam.f);
    gl.uniform2fv(bg.u.z,cam.sf);
    gl.uniform1f(bg.u.ascent,ascent);gl.uniform1f(bg.u.orbit,orbit);gl.uniform1f(bg.u.clock,Math.min(time,10));
    gl.uniform1f(bg.u.detail,1);gl.drawArrays(gl.TRIANGLES,0,6);
    gl.disableVertexAttribArray(bg.a.p);

    gl.enable(gl.DEPTH_TEST);gl.useProgram(mesh.p);
    gl.uniformMatrix4fv(mesh.u.mv,false,cam.mat);
    gl.uniform3fv(mesh.u.eye,eye);gl.uniform1f(mesh.u.orbit,orbit);gl.uniform1f(mesh.u.burn,burn);
    gl.uniform1f(mesh.u.air,s(.31,.44,p));
    if(p<.44)drawMesh(padB,padVerts,off,0,0,0);
    drawMesh(rocketB,rocketVerts,[lx,lift,0],.20,lean,1);
    for(const a of Object.values(mesh.a))gl.disableVertexAttribArray(a);

    if(burn>.01){
      gl.depthMask(false);gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
      if(p<.37) spray(cam,time,vw,vh,burn*(1-s(.29,.38,p)),lift,lx,lean,false);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
      spray(cam,time,vw,vh,burn,lift,lx,lean,true);
      gl.depthMask(true);gl.disable(gl.BLEND);gl.disableVertexAttribArray(particles.a.p);
    }
    if(!canvas.dataset.renderer){
      if(gl.getError()!==gl.NO_ERROR){stopped=true;return;}
      canvas.dataset.renderer='webgl';
    }
    animated=!document.hidden&&!pause&&burn>.02;
    if(animated) queue();
  }
  function queue(){if(!pending&&!stopped)pending=requestAnimationFrame(render);}
  canvas.addEventListener('webglcontextlost',(e)=>{
    e.preventDefault();delete canvas.dataset.renderer;stopped=true;
    if(pending)cancelAnimationFrame(pending);
  });
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
  document.addEventListener('visibilitychange',queue);
  if (reduce.addEventListener) reduce.addEventListener('change',queue);
  else if (reduce.addListener) reduce.addListener(queue);
  changeObserver=new MutationObserver((items) => {
    const next = document.getElementById('motion-toggle');
    if(next!==toggle||items.some(item=>item.target===toggle&&item.attributeName==='aria-pressed')){toggle=next;queue();}
  });
  changeObserver.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  toggle=document.getElementById('motion-toggle');
  document.addEventListener('click',event => {if(event.target.closest?.('#motion-toggle')) queue();});
  if(window.ResizeObserver){resizeObserver=new ResizeObserver(queue);resizeObserver.observe(document.body);}
  queue();
})();
