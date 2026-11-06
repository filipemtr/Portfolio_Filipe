import type { Project } from '@/data/portfolio';

/** Exibe capturas fornecidas pelo autor ou ilustrações conceituais, sem confundir suas origens. */
export function ProjectArtwork({ project, compact = false }: { project: Project; compact?: boolean }) {
  const verified = project.visualVerified === true;
  const imageSrc = project.visualSrc ?? `/projects/${project.slug}/concept.svg`;
  return <div className={`project-artwork ${compact ? 'artwork-compact' : ''} artwork-${project.slug}`}>
    <img className="project-cover" src={imageSrc} alt={verified ? `Captura verificada do projeto ${project.title}` : `Arte conceitual criada para apresentar ${project.title}; não é uma captura real do projeto.`} loading={compact ? 'lazy' : 'eager'} width={1200} height={760}/>
    <div className="artwork-sheen" aria-hidden="true"/>
    <div className="artwork-corner-top"><span>F/M — SELECTED WORK</span><span>/{project.number}</span></div>
    <div className="artwork-corner-bottom"><span>{verified ? 'CAPTURA DO PROJETO' : 'ILUSTRAÇÃO FICTÍCIA'}</span><span>● {project.domain.toUpperCase()}</span></div>
  </div>;
}
