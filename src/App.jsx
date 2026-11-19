import { useEffect, useState } from 'react';
import { heroData, experienceData, skills, projectsData, socialLinks } from './data/portfolioData';
import './flight.css';

const navigation = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']];
const projects = ['ReleaseRadar', 'B-Ram', 'Orbit Desk Companion'].map(title => projectsData.find(project => project.title === title));
const rest = projectsData.filter(project => !projects.includes(project));
const groups = [
  ['Languages', skills.languages],
  ['Test engineering', skills.testing],
  ['CI/CD & tooling', skills.ciCd],
  ['AI evaluation', ['LLM-as-judge', 'Calibration', 'Regression evaluation', 'Evidence reporting']],
];

function ProjectVisual({ index }) {
  const label = ['RELEASE / CHECKOUT', 'WORKSPACE / LOCAL', 'ASSEMBLY / SIMULATION'][index];
  return <div className={`project-visual visual-${index}`} aria-hidden="true">
    <div className="visual-bar"><span><i/><i/><i/></span><span>{label}</span><span>0{index + 1}</span></div>
    <svg viewBox="0 0 432 218" className="visual-figure" fill="none">
      {index === 0 ? <>
        <circle cx="133" cy="109" r="73"/><circle cx="133" cy="109" r="53"/><circle cx="133" cy="109" r="32"/><path d="M60 109h146M133 36v146"/>
        <path className="figure-fill" d="M133 109 185 58a73 73 0 0 1 20 51z"/><circle className="dot-a" cx="166" cy="80" r="4"/><circle className="dot-b" cx="108" cy="133" r="4"/>
        <rect x="232" y="52" width="148" height="114" rx="6"/><path d="M253 81h101m-101 26h101m-101 26h101"/><path className="strong" d="m261 80 4 4 8-8m-12 30 4 4 8-8m-12 30 4 4 8-8"/>
      </> : index === 1 ? <>
        <rect x="55" y="38" width="322" height="142" rx="8"/><path d="M55 67h322M141 67v113M70 87h53m-53 19h38m-38 19h44m-44 19h32"/>
        <rect x="160" y="83" width="194" height="25" rx="4"/><path className="strong" d="M175 95h112"/><rect x="160" y="121" width="92" height="42" rx="4"/><rect x="262" y="121" width="92" height="42" rx="4"/><path d="M170 135h57m-57 11h36m102-11h26m-62 11h49"/>
      </> : <>
        <path d="m59 154 156-77 158 77-157 48zm0 0 157 48m-116-68 154 56m-113-76 154 63m-108-85 154 70m-50-70-152 84m109-105-153 91" opacity=".65"/>
        <path className="figure-fill" d="m216 23 81 42v65l-81 42-81-42V65z"/><path className="strong" d="m216 23 81 42v65l-81 42-81-42V65zm-81 42 81 43 81-43m-81 43v64"/><circle className="dot-a" cx="216" cy="108" r="5"/>
      </>}
    </svg>
    <div className="visual-footer">PROJECT DIAGRAM<span>AK / PORTFOLIO</span></div>
  </div>;
}

function ProjectLinks({ project }) {
  return <div className="project-links"><a href={project.repo}>GitHub ↗</a>{project.demo && <a href={project.demo}>{project.demoLabel} ↗</a>}{project.evidence && <a href={project.evidence}>{project.evidenceLabel} ↗</a>}</div>;
}

function FlightReadout() {
  const [flight, setFlight] = useState({ phase: 0, pct: 0 });
  useEffect(() => {
    let frame;
    const paint = () => {
      frame = undefined;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      const pct = Math.round(p * 100);
      const phase = p < .13 ? 0 : p < .36 ? 1 : p < .66 ? 2 : 3;
      setFlight(prev => prev.pct === pct && prev.phase === phase ? prev : { pct, phase });
    };
    const update = () => { if (frame === undefined) frame = requestAnimationFrame(paint); };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <aside className="flight-readout" aria-hidden="true"><span className="flight-signal"/><div><span>FLIGHT SEQUENCE</span><strong>{['On the pad', 'Lift-off', 'Upper atmosphere', 'In orbit'][flight.phase]}</strong></div><span className="flight-pct">{String(flight.pct).padStart(2, '0')}%</span><div className="flight-track"><i style={{ width: `${flight.pct}%` }}/></div></aside>;
}

function Header() {
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.body.dataset.motion = paused ? 'paused' : 'playing';
  }, [paused]);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = (event) => setPaused(event.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenu(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);
  return <header className="site-header"><div className="header-inner">
    <a className="wordmark" href="#top" aria-label="Ankit Kalluraya, home" onClick={() => setMenu(false)}><b>AK</b><span>Ankit Kalluraya</span></a>
    <nav className={menu ? 'nav is-open' : 'nav'} id="navigation" aria-label="Main navigation">{navigation.map(([id, title]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{title}</a>)}</nav>
    <button className="motion-toggle" id="motion-toggle" aria-pressed={paused} type="button" onClick={() => setPaused(p => !p)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> Motion {paused ? 'off' : 'on'}</button>
    <button className="menu-toggle" id="menu-toggle" type="button" aria-controls="navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
  </div></header>;
}

export default function App() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <Header/>
    <FlightReadout/>
    <main className="page" id="main">
      <section className="hero" id="top" aria-labelledby="hero-name">
        <div className="hero-content">
          <p className="eyebrow"><span className="live-dot"/> MELBOURNE, AUSTRALIA</p>
          <p className="hero-hello">Hello, I’m</p>
          <h1 id="hero-name">Ankit Kalluraya<span>.</span></h1>
          <p className="hero-role">AI QA Engineer, AI SDET<br className="hero-break"/> &amp; Applied AI Builder</p>
          <p className="lede">I build and test software with one question in mind: what happens when it leaves the happy path?</p>
          <div className="actions"><a className="button primary" href="#projects">Explore my work <span>↘</span></a><a className="button secondary" href="/resume.pdf">Résumé <span>↗</span></a><a className="quiet-link" href={socialLinks.github}>GitHub ↗</a></div>
        </div>
        <a className="scroll-cue" href="#about"><span>↓</span> Scroll to launch</a>
      </section>

      <section className="section" id="about">
        <div className="section-panel intro-grid">
          <div><p className="eyebrow">01 / ABOUT</p><h2>Good software should hold up when things go wrong.</h2></div>
          <div className="section-copy"><p>My background is in software testing and quality engineering, including regulated gaming at iTech Labs and Gaming Laboratories International in Australia. I now build independent projects around test automation and AI evaluation.</p><p>I’m especially interested in the gap between a green test suite and a release you can actually trust. That’s what led me to build ReleaseRadar, and it shapes how I approach the rest of my work.</p></div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-panel"><p className="eyebrow">02 / SKILLS</p><h2>My toolkit</h2>
          <div className="skill-grid">{groups.map(([heading, values]) => <article className="skill-card" key={heading}><h3>{heading}</h3><ul className="chips">{values.map(value => <li key={value}>{value}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-panel">
          <p className="eyebrow">03 / SELECTED WORK</p><h2>Projects</h2>
          <p className="section-lede">Software you can try, inspect, and test for yourself.</p>
          <div className="featured-list">{projects.map((project, index) => <article className="featured" key={project.repo}>
            <ProjectVisual index={index}/>
            <div className="project-body"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><ul className="chips">{project.tech.map(item => <li key={item}>{item}</li>)}</ul><ProjectLinks project={project}/><details><summary>Scope and limitations</summary><p>{project.note}</p></details></div>
          </article>)}</div>
          <h3 className="more-heading">More projects</h3>
          <div className="project-grid">{rest.map(project => <article className="project-card" key={project.repo}><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p>{project.note && <details><summary>Scope and limitations</summary><p>{project.note}</p></details>}<ul className="chips">{project.tech.map(item => <li key={item}>{item}</li>)}</ul><ProjectLinks project={project}/></article>)}</div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-panel">
          <p className="eyebrow">04 / EXPERIENCE</p><h2>Where I’ve worked</h2>
          <div className="timeline">{experienceData.map(job => <article key={job.company}><p className="timeline-date">{job.period}</p><div><h3>{job.role}</h3><p className="timeline-company">{job.company}</p><ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section-panel"><p className="eyebrow">05 / CONTACT</p><h2>Let’s talk.</h2><p className="section-lede">I’m happy to talk about test engineering, AI quality, and what you’re building.</p>
          <div className="actions"><a className="button primary" href={`mailto:${socialLinks.email}`}>Email me <span>↗</span></a><a className="button secondary" href={socialLinks.linkedin}>LinkedIn <span>↗</span></a><a className="button secondary" href="https://x.com/uhnkitcalorieya">X</a><a className="button secondary" href="https://www.youtube.com/@kitcalorieyeah">YouTube</a></div>
          <div className="contact-links"><a href={socialLinks.github}>GitHub ↗</a><a href={socialLinks.huggingface}>Hugging Face ↗</a><a href="/resume.pdf">Résumé ↗</a></div>
        </div>
      </section>
      <footer className="footer"><span>© {new Date().getFullYear()} {heroData.name}</span><a href="#top">Back to top ↑</a></footer>
    </main>
  </>;
}
