/** Elementos gráficos próprios, decorativos e sem dependência de imagem externa. */
type Variant = 'hero' | 'about' | 'projects' | 'architecture' | 'skills' | 'contact' | 'case';
const symbols: Record<Variant, string[]> = {
  hero: ['{ PY }', 'SQL', '</>', 'AWS', 'ETL'],
  about: ['{ THINK }', '01 / 03', '</>', '∞', 'API'],
  projects: ['PIPELINE', 'DATA', '01 / 04', '{ CODE }', 'CLOUD'],
  architecture: ['BRONZE', 'SILVER', 'GOLD', 'PYSPARK', 'S3'],
  skills: ['STACK', 'SQL', 'TS', 'DOCKER', 'LINUX'],
  contact: ['{ CONNECT }', 'HELLO', '→', '01', 'BUILD'],
  case: ['{ SYSTEM }', 'SOURCE', 'RENDER', '→', '01'],
};
export function AmbientTech({ variant }: { variant: Variant }) {
  return <div className={`ambient-tech ambient-${variant}`} aria-hidden="true">
    <svg className="ambient-wire" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id={`wire-${variant}`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#b68aff" stopOpacity="0.04"/><stop offset=".56" stopColor="#b68aff" stopOpacity=".38"/><stop offset="1" stopColor="#dec6ff" stopOpacity=".03"/></linearGradient>
      </defs>
      <g fill="none" stroke={`url(#wire-${variant})`} strokeWidth="1">
        <path d="M-80 260h305l105 108h217l116-102h315l92 140h450"/>
        <path d="M-50 610h240l105-70h360l135 115h330l100-140h300"/>
        <path d="M180-50v240l130 115v200l120 90v360"/>
        <path d="M1225-50v180l-200 144v197l-100 108v390"/>
        <circle cx="330" cy="368" r="7"/><circle cx="978" cy="266" r="7"/><circle cx="655" cy="540" r="5"/><circle cx="1132" cy="655" r="5"/>
        <path d="M1020 125h220M1130 15v220M240 690h185M332 598v184" strokeDasharray="3 12"/>
      </g>
      <g fill="#cba8ff" opacity=".35"><circle cx="330" cy="368" r="3"/><circle cx="978" cy="266" r="3"/><circle cx="655" cy="540" r="3"/><circle cx="1132" cy="655" r="3"/></g>
    </svg>
    {symbols[variant].map((symbol,i) => <span className={`ambient-symbol ambient-symbol-${i+1}`} key={`${variant}-${i}`}>{symbol}</span>)}
    <i className="ambient-orbit ambient-orbit-one"/><i className="ambient-orbit ambient-orbit-two"/>
  </div>;
}
