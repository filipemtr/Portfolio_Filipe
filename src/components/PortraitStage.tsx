import { ArrowUpRight, Braces, Database, Layers3, Sparkles } from 'lucide-react';

/** Portrait photo provided by the portfolio owner, unretouched. */
export function PortraitStage() {
  return <div className="portrait-stage" aria-label="Retrato de Filipe Monteiro com elementos visuais de engenharia de dados">
    <span className="portrait-orbit portrait-orbit-one" aria-hidden="true"/>
    <span className="portrait-orbit portrait-orbit-two" aria-hidden="true"/>
    <div className="portrait-halo" aria-hidden="true" />
    <div className="portrait-frame">
      <picture>
        <source media="(max-width: 600px)" srcSet="/images/filipe-portrait-mobile.webp"/>
        <img src="/images/filipe-portrait.webp" width="900" height="900" alt="Retrato de Filipe Monteiro, usando boné preto, jaqueta preta e camisa branca" className="portrait-photo" fetchPriority="high"/>
      </picture>
      <div className="portrait-frame-caption"><span>F / M</span><span>DEVELOPER PROFILE / 2026</span></div>
    </div>
    <div className="portrait-floating portrait-floating-top"><span className="glass-icon"><Database size={18}/></span><div><small>FOCUS / 01</small><strong>Data Engineering</strong><em>Python · PySpark · AWS</em></div><ArrowUpRight size={14} className="glass-arrow"/></div>
    <div className="portrait-floating portrait-floating-right"><span className="glass-icon"><Braces size={18}/></span><div><small>FOCUS / 02</small><strong>Software Development</strong><em>React · TypeScript · FastAPI</em></div></div>
    <div className="portrait-floating portrait-floating-bottom"><span className="glass-pulse"><Sparkles size={16}/></span><div><strong>BUILDING IN PUBLIC</strong><span>Projetos reais · Evolução contínua</span></div><Layers3 size={17}/></div>
    <div className="portrait-side-type" aria-hidden="true">SYSTEMS · DATA · SOFTWARE</div>
  </div>;
}
