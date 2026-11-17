import { useState } from 'react';
const phases = [
  { label: '01 / Ground', title: 'Build with intent.', copy: 'Requirements. Risks. A testable idea.', status: 'SYSTEMS READY' },
  { label: '02 / Ascent', title: 'Challenge assumptions.', copy: 'Test the boundaries before the launch.', status: 'VALIDATION IN FLIGHT' },
  { label: '03 / Orbit', title: 'Bring back evidence.', copy: 'Useful applications. Inspectable results.', status: 'MISSION IN ORBIT' },
];
export default function LaunchScene() {
 const [phase, setPhase] = useState(0);
 return <section className={`launch-scene phase-${phase}`} aria-label="Interactive portfolio launch scene">
  <div className="scene-stars" aria-hidden="true"/>
  <div className="scene-grid" aria-hidden="true"/>
  <div className="scene-planet" aria-hidden="true"/>
  <div className="rocket-wrap" aria-hidden="true"><div className="rocket"><i className="nose"/><i className="hull"/><i className="window"/><i className="fin left"/><i className="fin right"/><i className="engine"/></div><div className="plume"/></div>
  <div className="telemetry"><span>AK / EXPLORATION SYSTEMS</span><span>INTERACTIVE CONCEPT · NOT LIVE TELEMETRY</span></div>
  <div className="scene-caption" aria-live="polite"><p className="eyebrow">{phases[phase].status}</p><h2>{phases[phase].title}</h2><p>{phases[phase].copy}</p></div>
  <div className="flight-controls" aria-label="Choose flight stage">{phases.map((p,i)=><button key={p.label} onClick={()=>setPhase(i)} aria-pressed={phase===i}>{p.label}</button>)}<button className="launch-next" onClick={()=>setPhase((phase+1)%3)}>{phase===2?'Replay launch ↺':'Launch next stage ↗'}</button></div>
 </section>
}
