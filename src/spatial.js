export function setupSpatial(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 let off=reduced.matches;let frame=0;
 const cards=[...document.querySelectorAll('[data-tilt]')];
 const buttons=[...document.querySelectorAll('[data-motion-toggle]')];
 const reset=()=>cards.forEach(c=>{c.style.removeProperty('--rx');c.style.removeProperty('--ry');});
 const update=()=>{document.body.classList.toggle('motion-off',off);buttons.forEach(b=>{b.textContent=off?'Enable motion':'Pause motion';b.setAttribute('aria-pressed',String(off));});reset();};
 const toggle=()=>{off=!off;update();};const preference=()=>{off=reduced.matches;update();};
 buttons.forEach(b=>b.addEventListener('click',toggle));reduced.addEventListener('change',preference);
 const move=e=>{if(off||reduced.matches||!fine.matches)return;const c=e.currentTarget;const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{c.style.setProperty('--rx',`${(0.5-y)*5}deg`);c.style.setProperty('--ry',`${(x-0.5)*5}deg`);c.style.setProperty('--mx',`${x*100}%`);c.style.setProperty('--my',`${y*100}%`);});};
 const leave=()=>{cancelAnimationFrame(frame);reset();};cards.forEach(c=>{c.addEventListener('pointermove',move);c.addEventListener('pointerleave',leave);});update();
 return()=>{cancelAnimationFrame(frame);cards.forEach(c=>{c.removeEventListener('pointermove',move);c.removeEventListener('pointerleave',leave);});buttons.forEach(b=>b.removeEventListener('click',toggle));reduced.removeEventListener('change',preference);};
}
