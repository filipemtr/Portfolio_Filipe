'use client';

import { Activity, ArrowUpRight, BarChart3, CalendarDays, Check, Database, Fingerprint, LockKeyhole, Music2, ShieldCheck, Users } from 'lucide-react';

/** Diagramas originais / UI conceitual. Nunca são anunciados como screenshots. */
export function ProjectVisual({ variant, compact = false }: { variant: string; compact?: boolean }) {
  if (variant === 'lastfm-tracker') return (
    <div className={`project-visual visual-lastfm ${compact ? 'visual-compact' : ''}`} aria-label="Diagrama conceitual da arquitetura do LastFM Tracker">
      <div className="visual-topline"><span><span className="small-green-dot"/>PIPELINE / LIVE SCHEMA</span><span>DATAFLOW_001 <Activity size={13}/></span></div>
      <div className="lastfm-graphic">
        <div className="music-source"><Music2 size={25}/><span>LAST.FM</span><small>API SOURCE</small></div>
        <div className="flow-trace"><i/><i/><i/></div>
        <div className="pipeline-layers"><div className="layer bronze"><b>01</b><span>BRONZE</span><small>raw data</small></div><div className="layer silver"><b>02</b><span>SILVER</span><small>curated</small></div><div className="layer gold"><b>03</b><span>GOLD</span><small>modeled</small></div></div>
        <div className="flow-trace"><i/><i/><i/></div>
        <div className="analytics-node"><BarChart3 size={26}/><span>ANALYTICS</span><div className="mini-bars"><em/><em/><em/><em/><em/><em/><em/></div></div>
      </div>
      <div className="pipeline-footer"><span>ORCHESTRATED BY <b>AIRFLOW</b></span><span>PROCESSED WITH <b>PYSPARK</b></span><span><b>AWS / DATABRICKS</b></span></div>
      <span className="corner-marker marker-tl"/><span className="corner-marker marker-br"/>
    </div>
  );
  if (variant === 'pipeline-databricks-s3') return (
    <div className={`project-visual visual-databricks ${compact ? 'visual-compact' : ''}`} aria-label="Representação visual de camadas de dados Bronze, Silver e Gold">
      <div className="visual-topline"><span>MEDALLION / DATA LAYERS</span><span>DBX—S3 <Database size={14}/></span></div>
      <div className="stack-scene"><div className="stack-plane stack-plane-gold"><div className="stack-line"/><span>GOLD <small>03</small></span></div><div className="stack-plane stack-plane-silver"><div className="stack-line"/><span>SILVER <small>02</small></span></div><div className="stack-plane stack-plane-bronze"><div className="stack-line"/><span>BRONZE <small>01</small></span></div><div className="stack-axis axis-one"/><div className="stack-axis axis-two"/></div>
      <div className="visual-bottom-note">TRANSFORM → CURATE → SERVE <span className="mono">/ PYSPARK</span></div>
    </div>
  );
  if (variant === 'realeza-barbers') return (
    <div className={`project-visual visual-realeza ${compact ? 'visual-compact' : ''}`} aria-label="Ilustração conceitual de uma interface de agendamentos para barbearia">
      <div className="concept-watermark">UI CONCEITUAL</div>
      <div className="realeza-window"><div className="realeza-side"><div className="realeza-logo">R<span>.</span></div><div className="side-small active"><CalendarDays size={15}/></div><div className="side-small"><Users size={15}/></div><div className="side-small"><BarChart3 size={15}/></div></div><div className="realeza-content"><div className="realeza-header"><span>Visão geral <small>/ Agenda</small></span><div className="realeza-avatar">FM</div></div><div className="realeza-title">Agendamentos <span>↗</span></div><div className="realeza-stats"><div><small>PRÓXIMOS</small><b>Agenda</b><span>Organizada</span></div><div><small>SERVIÇOS</small><b>Gestão</b><span>Centralizada</span></div></div><div className="realeza-row"><div className="avatar a1"/>Corte tradicional <span>09:30</span><Check size={14}/></div><div className="realeza-row"><div className="avatar a2"/>Barba completa <span>11:00</span><Check size={14}/></div><div className="realeza-row"><div className="avatar a3"/>Corte + barba <span>14:30</span><Check size={14}/></div></div></div>
    </div>
  );
  return (
    <div className={`project-visual visual-cofree ${compact ? 'visual-compact' : ''}`} aria-label="Ilustração conceitual da interface de segurança e credenciais do CoFree">
      <div className="concept-watermark">UI CONCEITUAL</div>
      <div className="cofree-orb"><div className="orb-halo halo-one"/><div className="orb-halo halo-two"/><div className="orb-inner"><Fingerprint size={60} strokeWidth={1}/></div></div>
      <div className="cofree-panel"><div><ShieldCheck size={16}/><span>COFREE / SECURITY CENTER</span><span className="secure-indicator">● MONITOR</span></div><strong>Segurança em primeiro lugar.</strong><p>Monitore sua exposição. Proteja suas credenciais.</p><div className="cofree-cells"><span><LockKeyhole size={14}/> Vault</span><span><ShieldCheck size={14}/> Credenciais</span></div></div>
    </div>
  );
}
