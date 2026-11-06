import Link from 'next/link';
export default function NotFound() { return <main className="not-found"><span className="mono">ERROR / 404</span><h1>Essa rota não<br/>está no <em>mapa.</em></h1><p>A página que você tentou acessar não foi encontrada.</p><Link href="/">VOLTAR AO INÍCIO ↗</Link></main>; }
