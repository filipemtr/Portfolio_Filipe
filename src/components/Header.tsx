'use client';

import { useEffect, useState } from 'react';

/** Intencionalmente sem barra de navegação. A assinatura central é o link de início. */
export function Header({ subpage = false }: { subpage?: boolean }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <>
    <header className="signature-header">
      <a href={subpage ? '/' : '#inicio'} className="signature-name" aria-label="Filipe Monteiro — voltar ao início">FILIPE <span>MONTEIRO</span></a>
    </header>
    <div className="scroll-progress" role="progressbar" aria-label="Progresso de leitura" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} style={{ transform: `scaleX(${progress / 100})` }} />
  </>;
}
