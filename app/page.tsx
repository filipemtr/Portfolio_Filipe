'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clipboard, Code2, Database, Github, Linkedin, Mail, MapPin, MoveUpRight, Network, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { HeroVisual } from '@/components/HeroVisual';
import { PortraitStage } from '@/components/PortraitStage';
import { ProjectArtwork } from '@/components/ProjectArtwork';
import { AmbientTech } from '@/components/AmbientTech';
import { Terminal } from '@/components/Terminal';
import { identity, pipelineStages, projects, skillGroups, type Domain } from '@/data/portfolio';

const chips = ['ALL SYSTEMS', 'DATA ENGINEERING', 'SOFTWARE DEVELOPMENT'];
const categoryFilters = [
  { key: 'todos', name: 'Todos os projetos' },
  { key: 'dados', name: 'Data Engineering' },
  { key: 'software', name: 'Software' },
  { key: 'seguranca', name: 'Security' },
] as const;

function SectionHeader({ id, number, eyebrow, title, description }: { id?: string; number: string; eyebrow: string; title: string; description?: string }) {
  return <motion.div className="section-heading" id={id} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.65,ease:[.22,1,.36,1]}}><div className="section-heading-left"><span className="index-label">/{number}</span><span className="mono section-eyebrow">{eyebrow}</span></div><div className="section-heading-center"><h2>{title}</h2>{description && <p>{description}</p>}</div><span className="section-plus" aria-hidden="true">✳</span></motion.div>;
}
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`${className} scroll-reveal`} initial={reduced ? false : { opacity: 0, y: 38, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero section-container with-ambient" id="inicio" aria-labelledby="hero-title"><AmbientTech variant="hero"/><div className="hero-topline"><span className="mono"><span className="tiny-square"/> DISPONÍVEL PARA ESTÁGIO & OPORTUNIDADES</span><span className="mono hero-local"><MapPin size={13}/> CARUARU, PE — BRASIL</span></div>
    <div className="hero-grid"><div className="hero-copy"><motion.p className="hero-identity" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>OLÁ, SOU FILIPE MONTEIRO <span aria-hidden="true">↘</span></motion.p>
      <motion.h1 id="hero-title" initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [0.16, 1, 0.3, 1] }}><span>CONSTRUO</span><span>SISTEMAS QUE</span><span className="hero-third">CONECTAM<span className="hero-star" aria-hidden="true">✳</span></span></motion.h1>
      <motion.div className="hero-subrow" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .7 }}><p>Entre o dado bruto e a experiência final, existe engenharia. Desenvolvo <strong>pipelines de dados</strong>, <strong>APIs</strong> e <strong>aplicações web</strong> pensando no sistema inteiro.</p><div className="hero-arrows"><a href="#projetos" className="button-primary">EXPLORAR PROJETOS <ArrowUpRight size={18}/></a><a href="#sobre" className="button-text">CONHEÇA MINHA TRAJETÓRIA <ArrowDown size={16}/></a></div></motion.div>
    </div><motion.div className="hero-art" initial={reduced ? false : { opacity: 0, x: 22, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: .25 }}><PortraitStage/></motion.div></div>
    <div className="hero-bottom"><div className="hero-credentials"><span>DATA ENGINEERING</span><b>✳</b><span>SOFTWARE DEVELOPMENT</span><b>✳</b><span>CLOUD & AUTOMATION</span></div><a href="#projetos" className="hero-scroll" aria-label="Rolar para os projetos"><span>SCROLL TO EXPLORE</span><ArrowDown size={17}/></a></div>
  </section>;
}

function About() {
  return <section className="section about-section section-container" id="sobre"><AmbientTech variant="about"/><SectionHeader number="01" eyebrow="THE HUMAN BEHIND THE CODE" title="Muito além da sintaxe." description="Curiosidade técnica, visão de sistema e vontade de construir algo que funcione de verdade."/>
    <div className="about-grid"><Reveal className="about-statement"><span className="mono overline">01 — MINHA FORMA DE PENSAR</span><p>Não gosto de enxergar uma tecnologia isolada. Quero entender <em>como as peças se conectam</em> — da origem do dado à decisão que ele ajuda a tomar, da API à interface que alguém utiliza.</p><div className="about-statement-footer"><span>LEARNING BY <b>BUILDING.</b></span><span className="about-star">✳</span></div></Reveal>
      <Reveal className="about-details" delay={.09}><div className="about-info-top"><p>Sou estudante do <strong>2º período de Análise e Desenvolvimento de Sistemas na Wyden UNIFAVIP</strong>, em Caruaru. Minha atuação prática acontece em projetos que cruzam engenharia de dados, backend e desenvolvimento web.</p><p>Já trabalhei com orquestração de pipelines, processamento com PySpark, modelagem de dados, integração de serviços em nuvem e construção de aplicações. O que mais me move é sair da ideia e chegar a uma solução estruturada, explicável e útil.</p></div><div className="about-facts"><div><span className="mono">FORMAÇÃO</span><strong>Análise e Desenvolvimento de Sistemas</strong><small>Wyden UNIFAVIP · 2º período</small></div><div><span className="mono">FOCO ATUAL</span><strong>Data Engineering × Software</strong><small>Python · Cloud · Full Stack</small></div><div><span className="mono">LOCALIZAÇÃO</span><strong>Caruaru, Pernambuco</strong><small>Brasil · Aberto a oportunidades</small></div></div></Reveal></div>
    <Reveal className="systems-lab-intro"><div><span className="mono">F/M — SYSTEMS LAB</span><h3>Como as tecnologias se conectam<span>.</span></h3><p>Explore os nós do meu ecossistema técnico e descubra onde cada ferramenta entra no desenvolvimento de sistemas.</p></div><div className="systems-lab-map"><HeroVisual/></div></Reveal>
    <Reveal className="principles"><div><span>01</span><strong>PENSAMENTO ANALÍTICO</strong><p>Investigar falhas e compreender o caminho completo de uma integração.</p></div><div><span>02</span><strong>APRENDIZADO NA PRÁTICA</strong><p>Aprender ferramentas colocando sistemas reais de projeto para funcionar.</p></div><div><span>03</span><strong>VISÃO DE ARQUITETURA</strong><p>Organizar fluxos, dados e interfaces com responsabilidade de ponta a ponta.</p></div></Reveal>
  </section>;
}

function ProjectSection() {
  const [active, setActive] = useState<(typeof categoryFilters)[number]['key']>('todos');
  const shown = projects.filter(p => active === 'todos' || p.domain === active);
  const focus = shown[0];
  return <section className="section projects-section section-container" id="projetos"><AmbientTech variant="projects"/><SectionHeader number="02" eyebrow="SELECTED WORK / 2026" title="Projetos, não promessas." description="Arquiteturas, produtos e decisões documentadas. Cada projeto conta uma parte diferente do que sei construir."/>
    <div className="project-filters" role="group" aria-label="Filtrar projetos">{categoryFilters.map(filter => <button key={filter.key} type="button" aria-pressed={active === filter.key} className={active === filter.key ? 'active' : ''} onClick={() => setActive(filter.key)}>{filter.name}<span>{filter.key === 'todos' ? projects.length : projects.filter(p => p.domain === filter.key).length.toString().padStart(2, '0')}</span></button>)}</div>
    {shown.length > 0 ? <div className="projects-canvas" key={active}>
      <Reveal className={`featured-project project-${focus.accent}`}><div className="featured-visual"><ProjectArtwork project={focus}/></div><div className="featured-copy"><div className="project-top-meta"><span>PROJECT {focus.number} / {focus.eyebrow}</span><span className="project-asterisk">✳</span></div><div><span className="featured-kicker">{focus.status.toUpperCase()}</span><h3>{focus.title}</h3><p className="project-subtitle">{focus.subtitle}</p><p className="project-description">{focus.description}</p></div><div><div className="project-tags">{focus.stack.slice(0, 6).map(s => <span key={s}>{s}</span>)}</div><div className="featured-links"><Link className="round-link-label" href={`/projetos/${focus.slug}`}>ESTUDAR CASO <ArrowUpRight size={18}/></Link><a href={focus.github} target="_blank" rel="noopener noreferrer" className="round-icon-link" aria-label={`Código de ${focus.title} no GitHub`}><Github size={18}/></a></div></div></div></Reveal>
      <div className="project-card-grid">{shown.slice(1).map((project, i) => <Reveal key={project.slug} delay={i * .06} className={`project-card project-${project.accent}`}><div className="project-card-art"><ProjectArtwork project={project} compact/></div><div className="project-card-main"><div className="project-card-kicker"><span>{project.number} — {project.eyebrow}</span><ArrowUpRight size={17}/></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-card-tags">{project.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}</div><div className="card-actions"><Link href={`/projetos/${project.slug}`} className="card-go" aria-label={`Ver estudo de caso ${project.title}`}><span>ESTUDAR CASO</span><span className="card-go-arrow"><ArrowUpRight size={19}/></span></Link><a className="card-github" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Abrir o repositório de ${project.title} no GitHub`} title={`GitHub · ${project.title}`}><Github size={21}/></a></div></div></Reveal>)}</div>
    </div> : <p className="empty-state">Nenhum projeto nesta categoria.</p>}
    <div className="projects-bottom"><p>UM PROJETO É UMA HISTÓRIA DE DECISÕES.<br/><strong>O CÓDIGO É A EVIDÊNCIA.</strong></p><a href={identity.github} target="_blank" rel="noopener noreferrer">VER TODOS OS REPOSITÓRIOS <ArrowUpRight size={17}/></a></div>
  </section>;
}

function Architecture() {
  const [active, setActive] = useState(3);
  const stage = pipelineStages[active];
  return <section className="architecture-section section-container" id="arquitetura"><AmbientTech variant="architecture"/><div className="architecture-top"><span className="mono">INTERACTIVE BLUEPRINT — 001</span><span className="mono">LASTFM TRACKER / SYSTEM VIEW</span></div><div className="architecture-intro"><div><span className="eyebrow-light">DESENHAR · CONECTAR · EXPLICAR</span><h2>Não é só uma stack.<br/><em>É como tudo conversa.</em></h2></div><p>Explore o caminho de um dado: da API à visualização. Cada etapa tem um propósito dentro da arquitetura.</p></div>
    <div className="architecture-flow" aria-label="Etapas do pipeline de dados LastFM Tracker">{pipelineStages.map((s, i) => <div className="architecture-step" key={s.id}><button type="button" className={`step-button ${active === i ? 'step-active' : ''}`} aria-pressed={active === i} aria-label={`Etapa ${i + 1}: ${s.title}`} onClick={() => setActive(i)}><span className="step-number">0{i + 1}</span><span className="step-icon">{i === 0 ? <Code2 size={23}/> : i === 1 ? <Network size={23}/> : i === 2 ? <Database size={23}/> : i === 3 ? <Sparkles size={23}/> : i === 4 ? <Database size={23}/> : i === 5 ? <Code2 size={23}/> : <BarChartIcon/>}</span><strong>{s.title}</strong><small>{s.sub}</small></button>{i !== pipelineStages.length - 1 && <div className="step-connector" aria-hidden="true"><i/></div>}</div>)}</div>
    <div className="architecture-readout" aria-live="polite"><div><span className="mono">SELECTED LAYER / 0{active + 1}</span><h3>{stage.title}</h3><span className="layer-tool">{stage.tool}</span></div><p>{stage.detail}</p><div className="layer-flourish">↗</div></div><div className="architecture-bottom"><span>FLOW DIRECTION: SOURCE → INSIGHT</span><span>CLIQUE EM CADA NÓ PARA EXPLORAR</span></div>
  </section>;
}
function BarChartIcon() { return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 3v18h18M7 17v-5m5 5V7m5 10V4"/></svg>; }
function Skills() {
  const [active, setActive] = useState<Domain>('dados');
  const group = skillGroups.find(s => s.key === active)!;
  const related = projects.filter(p => group.projectSlugs.includes(p.slug));
  return <section className="section skills-section section-container" id="stack"><AmbientTech variant="skills"/><SectionHeader number="03" eyebrow="TOOLKIT & CAPABILITIES" title="Tecnologia com propósito." description="Prefiro mostrar como as ferramentas trabalham juntas em projetos a transformá-las em porcentagens arbitrárias."/>
    <div className="skill-explorer"><div className="skill-tabs" role="tablist" aria-label="Áreas de competência">{skillGroups.map(item => <button key={item.key} id={`tab-${item.key}`} role="tab" aria-controls="skill-panel" aria-selected={active === item.key} className={active === item.key ? 'active' : ''} onClick={() => setActive(item.key)}><span className="mono">{item.index}</span><strong>{item.title}</strong><ArrowUpRight size={19}/></button>)}</div><div className="skill-content" id="skill-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active}><div className="skill-content-top"><span className="mono">ACTIVE DOMAIN / {group.index}</span><span className="skill-content-icon"><Network size={25}/></span></div><h3>{group.title}<span>.</span></h3><p>{group.summary}</p><div className="skill-list"><span className="mono">TECNOLOGIAS PRINCIPAIS</span><div className="skill-pill-list">{group.primary.map(t => <span className="primary-pill" key={t}>{t}</span>)}</div></div><div className="skill-list secondary"><span className="mono">OUTRAS FERRAMENTAS E CONCEITOS</span><div className="skill-pill-list">{group.secondary.map(t => <span key={t}>{t}</span>)}</div></div><div className="skill-projects"><span className="mono">EM CONTEXTO / PROJETOS RELACIONADOS</span>{related.map(p => <Link href={`/projetos/${p.slug}`} key={p.slug}>{p.title}<ArrowUpRight size={15}/></Link>)}</div></div></div>
    <div className="skills-footer"><span>MEU NORTE</span><p>Construir software legível, fluxos de dados confiáveis e experiências que façam sentido para quem usa.</p><span className="skill-squiggle" aria-hidden="true">↗</span></div>
  </section>;
}
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(identity.email); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { window.location.href = `mailto:${identity.email}`; } };
  return <section className="contact-section" id="contato"><AmbientTech variant="contact"/><div className="section-container contact-inner"><div className="contact-topline"><span>04 / NEXT CONNECTION</span><span className="mono">CONVERSAS QUE VIRAM POSSIBILIDADES</span></div><div className="contact-title-wrap"><span className="contact-tiny">TEM UMA IDEIA, OPORTUNIDADE OU DESAFIO?</span><h2>VAMOS<br/><em>CONSTRUIR</em><br/>ALGO<span className="contact-dot">.</span></h2><div className="contact-photo-wrap" aria-hidden="true"><img src="/images/filipe-contact-cutout.png" alt="" className="contact-photo"/></div><div className="contact-mark" aria-hidden="true">✳</div></div><div className="contact-bottom"><div><p>Estou em busca de oportunidades de estágio e colaboração em <strong>engenharia de dados, desenvolvimento backend e software.</strong> Se meu trabalho faz sentido para sua equipe, vamos conversar.</p><div className="contact-actions"><a href={`mailto:${identity.email}`} className="contact-main-button">ME CHAMA NO E-MAIL <ArrowUpRight size={21}/></a><button onClick={copy} className="contact-copy-button" aria-label="Copiar endereço de e-mail">{copied ? <Check size={18}/> : <Clipboard size={18}/>} {copied ? 'COPIADO!' : 'COPIAR E-MAIL'}</button></div></div><div className="contact-address"><span>ENCONTRE-ME</span><a href={identity.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Acessar LinkedIn de Filipe Monteiro"><span className="contact-link-label"><span className="contact-brand-icon"><Linkedin size={20} strokeWidth={1.9}/></span><span>LINKEDIN</span></span><ArrowUpRight size={16}/></a><a href={identity.github} target="_blank" rel="noopener noreferrer" aria-label="Acessar GitHub de Filipe Monteiro"><span className="contact-link-label"><span className="contact-brand-icon"><Github size={21} strokeWidth={1.9}/></span><span>GITHUB</span></span><ArrowUpRight size={16}/></a><a href={`mailto:${identity.email}`} aria-label={`Enviar e-mail para ${identity.email}`}><span className="contact-link-label"><span className="contact-brand-icon"><Mail size={20} strokeWidth={1.9}/></span><span>GMAIL</span></span><ArrowUpRight size={16}/></a><span className="contact-location"><MapPin size={14}/> CARUARU / BRASIL</span></div></div></div>
  </section>;
}
function Footer() {
  return <footer className="site-footer section-container"><a className="footer-logo" href="#inicio">F<span>✳</span>M</a><div>FEITO COM INTENÇÃO, CURIOSIDADE E CÓDIGO.<small>© {new Date().getFullYear()} FILIPE MONTEIRO · PORTFÓLIO PESSOAL</small></div><div className="footer-right"><a href="#inicio">VOLTAR AO TOPO ↑</a><span>DESIGNED TO CONNECT.</span></div></footer>;
}
export default function Home() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo"><Hero/><About/><ProjectSection/><Architecture/><Skills/><Contact/></main><Footer/><Terminal/></>;
}
