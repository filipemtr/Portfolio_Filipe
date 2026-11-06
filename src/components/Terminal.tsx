'use client';
import { useEffect, useRef, useState } from 'react';
import { Command, X } from 'lucide-react';
import { identity } from '@/data/portfolio';

const response = (cmd: string) => {
  const input = cmd.trim().toLowerCase();
  if (input === 'help') return 'Comandos: help · about · projects · skills · contact · clear';
  if (input === 'about') return 'Filipe Monteiro — ADS na Wyden UNIFAVIP. Engenharia de Dados × Software Development.';
  if (input === 'projects') return 'LastFM Tracker / Databricks × S3 / Realeza Barbers / CoFree';
  if (input === 'skills') return 'Python, SQL, PySpark, Databricks, Airflow, AWS, React, TypeScript, FastAPI, Docker.';
  if (input === 'contact') return `${identity.email}  |  github.com/filipemtr`;
  if (input === 'clear') return '__CLEAR__';
  return `Comando não reconhecido: "${cmd}". Digite help.`;
};
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<{ input: string; output: string }[]>([{ input: 'help', output: response('help') }]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { const id = requestAnimationFrame(() => inputRef.current?.focus()); return () => cancelAnimationFrame(id); } }, [open]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(v => !v); } if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  const execute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!command.trim()) return;
    const out = response(command);
    setHistory(h => out === '__CLEAR__' ? [] : [...h, { input: command, output: out }]); setCommand('');
  };
  return <>
    <button className="terminal-trigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir terminal interativo"><Command size={17}/><span>TERMINAL</span><kbd>⌘ K</kbd></button>
    {open && <div className="terminal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}><section className="terminal-window" role="dialog" aria-modal="true" aria-label="Terminal interativo"><header><span><i/> FM — TERMINAL / INTERACTIVE</span><button onClick={() => setOpen(false)} aria-label="Fechar terminal"><X size={18}/></button></header><div className="terminal-body"><div className="terminal-welcome">FILIPE MONTEIRO — PORTFOLIO SHELL [v1.0]<br/>Digite <b>help</b> para explorar.</div>{history.map((h, i) => <div className="terminal-output" key={`${h.input}-${i}`}><div><span>➜</span> ~ {h.input}</div><p>{h.output}</p></div>)}<form onSubmit={execute}><span>➜</span><label className="sr-only" htmlFor="terminal-command">Comando do terminal</label><input id="terminal-command" ref={inputRef} value={command} onChange={e => setCommand(e.target.value)} autoComplete="off" spellCheck={false} placeholder="digite um comando..."/></form></div><footer>ESC TO CLOSE <span>CTRL / ⌘ + K TO TOGGLE</span></footer></section></div>}
  </>;
}
