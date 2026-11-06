'use client';

import { useState } from 'react';

const points = [
  { x: 130, y: 86, n: 'PYTHON', s: 'DATA SOURCE', m: '01' },
  { x: 342, y: 76, n: 'AIRFLOW', s: 'ORCHESTRATE', m: '02' },
  { x: 484, y: 198, n: 'AWS S3', s: 'STORE', m: '03' },
  { x: 350, y: 336, n: 'PYSPARK', s: 'PROCESS', m: '04' },
  { x: 140, y: 335, n: 'SQL', s: 'ANALYZE', m: '05' },
  { x: 86, y: 210, n: 'REACT', s: 'DELIVER', m: '06' },
];
export function HeroVisual() {
  const [selected, setSelected] = useState(3);
  return (
    <div className="hero-visual" aria-label="Visualização interativa de tecnologias conectadas">
      <div className="hero-canvas-top"><span>F/M — SYSTEMS LAB</span><span><i/> INTERACTIVE VIEW / 01</span></div>
      <svg className="hero-map-svg" viewBox="0 0 580 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><radialGradient id="coreGlow"><stop offset="0%" stopColor="#b68aff" stopOpacity="0.2"/><stop offset="100%" stopColor="#b68aff" stopOpacity="0"/></radialGradient></defs>
        <circle cx="287" cy="207" r="174" fill="none" stroke="#886da2" strokeOpacity=".15" strokeDasharray="2 11"/>
        <circle cx="287" cy="207" r="116" fill="none" stroke="#886da2" strokeOpacity=".23" strokeDasharray="5 8"/>
        <circle cx="287" cy="207" r="76" fill="url(#coreGlow)"/>
        <path className="radar-arc" d="M 116 157 A 190 190 0 0 1 441 101" fill="none" stroke="#b68aff" strokeWidth="1" opacity=".48"/>
        <path className="radar-arc arc-two" d="M 466 244 A 190 190 0 0 1 145 326" fill="none" stroke="#c69aff" strokeWidth="1" opacity=".48"/>
        {points.map((p, i) => <g key={p.n}><line className="network-line" x1="287" y1="207" x2={p.x} y2={p.y} stroke={selected === i ? '#b68aff' : '#73548b'} strokeWidth={selected === i ? '1.7' : '1'} strokeOpacity={selected === i ? '.85' : '.32'} strokeDasharray={selected === i ? '0' : '3 6'}/><circle cx={p.x} cy={p.y} r={selected === i ? 6 : 4} fill={selected === i ? '#b68aff' : '#c8bbdc'} /></g>)}
        <circle className="center-pulse" cx="287" cy="207" r="37" stroke="#b68aff" strokeWidth="1" fill="#171021"/>
        <circle cx="287" cy="207" r="29" stroke="#b68aff" strokeOpacity=".25" fill="none" strokeDasharray="2 6"/>
        <text x="287" y="207" textAnchor="middle" dominantBaseline="central" fill="#f7f1ff" fontSize="18" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing="-.025em">F/M</text>
      </svg>
      {points.map((p, i) => <button type="button" key={p.n} className={`map-node node-${i} ${selected === i ? 'selected' : ''}`} onMouseEnter={() => setSelected(i)} onFocus={() => setSelected(i)} onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={`${p.n}: ${p.s}`}><span className="node-symbol">{p.m}</span><strong>{p.n}</strong></button>)}
      <div className="map-readout"><span>ACTIVE NODE / {points[selected].m}</span><b>{points[selected].n}</b><small>{points[selected].s}</small></div>
      <div className="hero-canvas-bottom"><span>FIG 001 — CONECTANDO CAMADAS</span><span>● ALL SYSTEMS THINKING</span></div>
    </div>
  );
}
