import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Header } from '@/components/Header';
import { ProjectArtwork } from '@/components/ProjectArtwork';
import { AmbientTech } from '@/components/AmbientTech';
import { projects } from '@/data/portfolio';

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(item => item.slug === slug);
  return p ? { title: `${p.title} — Estudo de caso`, description: p.description, openGraph: { title: `${p.title} | Filipe Monteiro`, description: p.description, images: ['/og-image.png'] } } : { title: 'Projeto não encontrado' };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex(p => p.slug === slug) + 1) % projects.length];
  const sections = [
    { number: '01', heading: 'O desafio', intro: project.goal, lines: [] },
    { number: '02', heading: 'Como foi construído', intro: 'Etapas e tecnologias descritas no material disponível sobre o projeto.', lines: project.approach },
    { number: '03', heading: 'Decisões de engenharia', intro: 'Escolhas de arquitetura relevantes para o tipo de solução.', lines: project.decisions },
    { number: '04', heading: 'Desafios técnicos', intro: 'Pontos de complexidade enfrentados ou contemplados no desenvolvimento.', lines: project.challenges },
    { number: '05', heading: 'Aprendizados', intro: 'O valor do projeto está nas decisões e na evolução técnica.', lines: project.learnings },
  ];
  return <><a className="skip-link" href="#case-content">Pular para o conteúdo</a><Header subpage/><main className="case-main" id="case-content"><AmbientTech variant="case"/><div className="case-hero section-container"><Link href="/#projetos" className="case-back"><ArrowLeft size={16}/> VOLTAR AOS PROJETOS</Link><div className="case-hero-meta"><span>PROJECT {project.number} / {project.eyebrow}</span><span>{project.status.toUpperCase()}</span></div><h1>{project.title}<span className="case-title-dot">.</span></h1><p className="case-description">{project.subtitle} {project.description}</p><div className="case-hero-tags">{project.stack.map(t => <span key={t}>{t}</span>)}</div><div className="case-hero-art"><ProjectArtwork project={project}/></div><p className="case-visual-note">{project.visualVerified ? 'IMAGEM REAL DO PROJETO, FORNECIDA PELO AUTOR.' : 'ILUSTRAÇÃO FICTÍCIA DO FLUXO DE DADOS (NÃO É UMA CAPTURA DE TELA).'}</p>{project.disclaimer && <p className="case-visual-note">NOTA — {project.disclaimer}</p>}</div>
    <div className="case-body section-container"><aside className="case-sidebar"><span className="mono">PROJECT INDEX / {project.number}</span>{sections.map(s => <a href={`#case-${s.number}`} key={s.number}><span>{s.number}</span>{s.heading}</a>)}<a className="case-github" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17}/> VER REPOSITÓRIO <ArrowUpRight size={16}/></a></aside><div className="case-article">{sections.map(s => <section id={`case-${s.number}`} className="case-chapter" key={s.number}><div className="case-chapter-index">/{s.number} — CASE STUDY</div><h2>{s.heading}</h2><p>{s.intro}</p>{s.lines.length > 0 && <ul>{s.lines.map(line => <li key={line}>{line}</li>)}</ul>}</section>)}<section className="case-result"><span className="mono">06 / RESULTADO E EVIDÊNCIAS</span><h2>O resultado</h2><p>{project.result}</p><a href={project.github} target="_blank" rel="noopener noreferrer">EXPLORAR O CÓDIGO-FONTE <ArrowUpRight size={19}/></a></section></div></div><Link href={`/projetos/${next.slug}`} className="case-next section-container"><span>PRÓXIMO PROJETO <ArrowUpRight size={17}/></span><strong>{next.title}</strong></Link></main><footer className="case-footer section-container"><a href="/">F✳M</a><span>FILIPE MONTEIRO / PORTFÓLIO 2026</span></footer></>;
}
