/**
 * Exporta uma visualização estática fiel ao JSX da home para inspeção offline.
 * Não substitui o build de produção Next.js, que requer npm install.
 * As interações sem estado de React recebem progressive enhancement abaixo.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = {};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const Fragment = Symbol('Fragment');
const React = {
  Fragment,
  createElement(type, props, ...children) {
    const p = { ...(props||{}), children: children.length === 1 ? children[0] : children };
    if (typeof type === 'function') return type(p);
    return { type, props:p };
  },
  useState: state => [typeof state === 'function' ? state() : state, () => {}],
  useEffect() {}, useRef: value => ({ current: value }),
};
function Icon(name) {
  return function IconComp(p) {
    const size = p.size || 20;
    const paths = {
      'ArrowUpRight':'<path d="M7 17 17 7M7 7h10v10"/>', 'ArrowRight':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
      'ArrowDown':'<path d="M12 5v14m-7-7 7 7 7-7"/>', 'ArrowLeft':'<path d="M19 12H5m7-7-7 7 7 7"/>',
      'Github':'<path d="M9 19c-5 1-5-3-7-3m14 6v-3.9a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.4a5.7 5.7 0 0 0-1.6-4 5.2 5.2 0 0 0-.1-4s-1.3-.4-4.1 1.6a14 14 0 0 0-7.4 0C5.8-.4 4.5 0 4.5 0a5.2 5.2 0 0 0-.1 4 5.7 5.7 0 0 0-1.6 4c0 5.8 3.5 7 6.8 7.4a3.5 3.5 0 0 0-1 2.7V22"/>',
      'Mail':'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 7 9-7"/>',
      'Linkedin':'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
      'Braces':'<path d="M8 3H6a2 2 0 0 0-2 2v5l-2 2 2 2v5a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v5l2 2-2 2v5a2 2 0 0 1-2 2h-2"/>',
      'Layers3':'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
      'Network':'<rect x="9" y="2" width="6" height="6"/><rect x="2" y="16" width="6" height="6"/><rect x="16" y="16" width="6" height="6"/><path d="M12 8v4H5v4m7-4h7v4"/>',
      'Code2':'<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-9-2 18"/>',
      'Database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 2 18 2 18 0V5M3 12c0 3 18 3 18 0"/>',
      'Sparkles':'<path d="m12 2 2 7 7 3-7 2-2 7-2-7-7-2 7-3z"/>',
      'BarChart3':'<path d="M4 4v16h16M8 16v-4m5 4V7m5 9V3"/>',
      'Check':'<path d="m4 12 5 5L20 6"/>',
      'Clipboard':'<rect x="5" y="5" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="5"/>',
      'MapPin':'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      'Music2':'<path d="M9 18V5l12-3v13M9 9l12-3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="15" r="3"/>',
      'LockKeyhole':'<rect x="5" y="10" width="14" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v3"/>',
      'ShieldCheck':'<path d="M12 2 4 5v7c0 6 8 10 8 10s8-4 8-10V5z"/><path d="m8 12 3 3 5-6"/>',
      'Fingerprint':'<path d="M7 9a5 5 0 0 1 10 0v5M5 14V9a7 7 0 0 1 14 0v5M9 13v-4a3 3 0 0 1 6 0v7M12 12v8M7 17v-4"/>',
      'Menu':'<path d="M4 7h16M4 12h16M4 17h16"/>','X':'<path d="m5 5 14 14M19 5 5 19"/>','Command':'<path d="M9 7V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V5"/>',
      'CalendarDays':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
      'Users':'<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m2-15a3 3 0 0 1 0 6m4 9v-3a7 7 0 0 0-4-6"/>',
      'Activity':'<path d="M2 12h5l3-8 4 16 3-8h5"/>',
    };
    return {type:'__raw', html:`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||'<circle cx="12" cy="12" r="7"/>'}</svg>`};
  };
}
function requireFor(mod) {
  if (mod === 'react') return { useState: React.useState, useEffect: React.useEffect, useRef: React.useRef };
  if (mod === 'next/link') return { __esModule:true, default: props => React.createElement('a', {href:props.href, className:props.className,'aria-label':props['aria-label']}, props.children) };
  if (mod === 'motion/react') return { motion: new Proxy({}, { get:(_,k)=> k }), useReducedMotion:()=>true };
  if (mod === 'lucide-react') return new Proxy({}, { get:(_,k) => Icon(k) });
  if (mod.startsWith('@/')) return load(path.join(root, 'src', mod.slice(2)));
  throw Error(`Cannot require ${mod}`);
}
function load(file) {
  const location = ['.tsx','.ts','.js'].map(ext => file.endsWith(ext) ? file : file + ext).find(fs.existsSync);
  if (!location) throw Error(`Missing ${file}`);
  if (cache[location]) return cache[location].exports;
  const module = {exports:{}}; cache[location] = module;
  const transpiled = ts.transpileModule(fs.readFileSync(location,'utf8'), { fileName:location, compilerOptions: {target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}});
  const context = {React, module, exports:module.exports, require:requireFor, console, process:{ env:{NEXT_PUBLIC_SITE_URL:''}}, setTimeout, clearTimeout};
  vm.runInNewContext(transpiled.outputText, context, {filename:location});
  return module.exports;
}
function attributes(props={}) {
  return Object.entries(props).filter(([k,v]) => k !== 'children' && !k.startsWith('on') && !['initial','whileInView','viewport','transition','animate','exit','key','ref','aria-valuenow'].includes(k) && v !== null && v !== undefined && v !== false).map(([key,value]) => {
    const k = key === 'className' ? 'class' : key === 'htmlFor' ? 'for' : key;
    if (key==='style' && typeof value==='object') return ` style="${esc(Object.entries(value).map(([p,v]) => `${p.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}:${v}`).join(';'))}"`;
    if (value===true) return ` ${k}`;
    if (typeof value==='object') return '';
    return ` ${k}="${esc(value)}"`;
  }).join('');
}
function render(node) {
  if (node === undefined || node === null || node === false || node === true) return '';
  if (Array.isArray(node)) return node.map(render).join('');
  if (typeof node === 'string' || typeof node === 'number') return esc(node);
  if (node.type === '__raw') return node.html;
  if (node.type === Fragment) return render(node.props.children);
  if (typeof node.type==='function') return render(node.type(node.props));
  const tag = node.type;
  const voids = new Set(['img','input','hr','br','meta','link','source']);
  return `<${tag}${attributes(node.props)}>${voids.has(tag) ? '' : render(node.props.children)+`</${tag}>`}`;
}
const { default: Home } = load(path.join(root,'app/page'));
const { projects, identity, skillGroups, pipelineStages } = load(path.join(root,'src/data/portfolio'));
const html = render(Home()).replaceAll('src="/images/','src="assets/images/').replaceAll('srcSet="/images/','srcset="assets/images/');
const interactive = `
(() => {
 const projectData = ${JSON.stringify(projects.map(p=>({slug:p.slug,title:p.title,domain:p.domain})))};
 const stageData = ${JSON.stringify(pipelineStages)};
 const skillData = ${JSON.stringify(skillGroups)};
 // Progressive enhancement: elements are fully readable without JavaScript.
 const reveal = Array.from(document.querySelectorAll('.scroll-reveal,.section-heading,.architecture-flow,.architecture-readout,.contact-title-wrap'));
 if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
   reveal.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.95)el.classList.add('in-view');observer.observe(el)});
   document.documentElement.classList.add('preview-motion');
 }
 const menu = document.querySelector('.mobile-menu-button');
 const nav = document.querySelector('.main-nav');
 menu?.addEventListener('click',()=>{const open=nav.classList.toggle('nav-open');document.body.classList.toggle('mobile-nav-open',open);menu.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('nav-open');document.body.classList.remove('mobile-nav-open');}));
 window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight; document.querySelector('.scroll-progress').style.transform='scaleX('+(max>0?scrollY/max:0)+')';},{passive:true});
 document.querySelectorAll('.project-filters button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.project-filters button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');
  let index=[...btn.parentNode.children].indexOf(btn);let domain=['todos','dados','software','seguranca'][index];
  let all=projectData.filter(p=>domain==='todos'||p.domain===domain);
  document.querySelector('.projects-canvas').querySelectorAll('.featured-project, .project-card').forEach(el=>{const p=el.querySelector('a[href*="projetos/"]');if(p){let slug=p.getAttribute('href').split('/').pop().replace('.html','');el.style.display=all.some(x=>x.slug===slug)?'':'none';}});
 }));
 const arch=document.querySelectorAll('.step-button');
 arch.forEach((btn,i)=>btn.addEventListener('click',()=>{arch.forEach(b=>{b.classList.remove('step-active');b.setAttribute('aria-pressed','false')});btn.classList.add('step-active');btn.setAttribute('aria-pressed','true');const d=stageData[i], readout=document.querySelector('.architecture-readout');readout.querySelector('.mono').textContent='SELECTED LAYER / 0'+(i+1);readout.querySelector('h3').textContent=d.title;readout.querySelector('.layer-tool').textContent=d.tool;readout.querySelector('p').textContent=d.detail;}));
 const skills=document.querySelectorAll('.skill-tabs button');
 const links=${JSON.stringify(projects.map(p=>({slug:p.slug,title:p.title})))};
 skills.forEach((btn,i)=>btn.addEventListener('click',()=>{skills.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});btn.classList.add('active');btn.setAttribute('aria-selected','true');const d=skillData[i], panel=document.querySelector('.skill-content');panel.setAttribute('aria-labelledby','tab-'+d.key);panel.querySelector('.skill-content-top .mono').textContent='ACTIVE DOMAIN / '+d.index; panel.querySelector('h3').innerHTML=d.title+'<span>.</span>';panel.querySelector('p').textContent=d.summary;const lists=panel.querySelectorAll('.skill-pill-list');lists[0].innerHTML=d.primary.map(s=>'<span class="primary-pill">'+s+'</span>').join('');lists[1].innerHTML=d.secondary.map(s=>'<span>'+s+'</span>').join('');panel.querySelector('.skill-projects').innerHTML='<span class="mono">EM CONTEXTO / PROJETOS RELACIONADOS</span>'+d.projectSlugs.map(s=>{const p=links.find(x=>x.slug===s);return '<a href="/projetos/'+s+'.html">'+p.title+' ↗</a>'}).join('');}));
 const email=${JSON.stringify(identity.email)};document.querySelector('.contact-copy-button')?.addEventListener('click',async(e)=>{try{await navigator.clipboard.writeText(email);e.currentTarget.textContent='✓ COPIADO!';setTimeout(()=>e.currentTarget.textContent='▢ COPIAR E-MAIL',1800)}catch{location.href='mailto:'+email}});
 document.querySelectorAll('.map-node').forEach((btn,i)=>{const data=[{n:'PYTHON',s:'DATA SOURCE'},{n:'AIRFLOW',s:'ORCHESTRATE'},{n:'AWS S3',s:'STORE'},{n:'PYSPARK',s:'PROCESS'},{n:'SQL',s:'ANALYZE'},{n:'REACT',s:'DELIVER'}][i];const update=()=>{document.querySelectorAll('.map-node').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});btn.classList.add('selected');btn.setAttribute('aria-pressed','true');const r=document.querySelector('.map-readout');r.querySelector('span').textContent='ACTIVE NODE / 0'+(i+1);r.querySelector('b').textContent=data.n;r.querySelector('small').textContent=data.s};btn.addEventListener('click',update);btn.addEventListener('mouseenter',update);btn.addEventListener('focus',update)});
 const trigger=document.querySelector('.terminal-trigger');
 const modal=document.createElement('div');modal.className='terminal-backdrop';modal.style.display='none';modal.innerHTML='<section class="terminal-window" role="dialog" aria-modal="true" aria-label="Terminal interativo"><header><span><i></i> FM — TERMINAL / INTERACTIVE</span><button class="term-close" aria-label="Fechar terminal">✕</button></header><div class="terminal-body"><div class="terminal-welcome">FILIPE MONTEIRO — PORTFOLIO SHELL [v1.0]<br>Digite <b>help</b> para explorar.</div><div class="term-results"></div><form><span>➜</span><input aria-label="Comando" placeholder="digite um comando..." autocomplete="off"></form></div><footer>ESC TO CLOSE <span>CTRL / ⌘ + K TO TOGGLE</span></footer></section>';
 document.body.appendChild(modal);const commands={help:'Comandos: help · about · projects · skills · contact · clear',about:'Filipe Monteiro — ADS na Wyden UNIFAVIP. Engenharia de Dados × Software Development.',projects:'LastFM Tracker / Databricks × S3 / Realeza Barbers / CoFree',skills:'Python, SQL, PySpark, Databricks, Airflow, AWS, React, TypeScript, FastAPI, Docker.',contact:email};
 function toggle(force){modal.style.display=(force===undefined?modal.style.display==='none':force)?'grid':'none';if(modal.style.display==='grid')modal.querySelector('input').focus()};trigger?.addEventListener('click',()=>toggle(true));modal.querySelector('.term-close').addEventListener('click',()=>toggle(false));modal.addEventListener('mousedown',e=>{if(e.target===modal)toggle(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false);if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();toggle()}});
 modal.querySelector('form').addEventListener('submit',e=>{e.preventDefault();let input=modal.querySelector('input'),raw=input.value.trim().toLowerCase();if(!raw)return; if(raw==='clear')modal.querySelector('.term-results').innerHTML='';else{const block=document.createElement('div');block.className='terminal-output';block.innerHTML='<div><span>➜</span> ~ '+raw.replace(/</g,'&lt;')+'</div><p></p>';block.querySelector('p').textContent=commands[raw]||'Comando não reconhecido. Digite help.';modal.querySelector('.term-results').appendChild(block);}input.value=''});
 document.querySelectorAll('a[href*="projetos/"]').forEach(a=>{const slug=a.getAttribute('href').split('/').filter(Boolean).pop().replace('.html','');a.setAttribute('href','projetos/'+slug+'.html')});
})();`;
function shell(content, title, script='', depth='') {return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#08070b"><title>${esc(title)}</title><meta name="description" content="Portfólio de Filipe Monteiro. Engenharia de Dados e desenvolvimento de software."><link rel="icon" href="${depth}assets/favicon.svg"><link rel="stylesheet" href="${depth}styles.css"></head><body>${content}<script>${script.replaceAll('</script','<\\/script')}</script></body></html>`;}
fs.mkdirSync(path.join(root,'preview/assets'),{recursive:true});
fs.copyFileSync(path.join(root,'app/globals.css'),path.join(root,'preview/styles.css'));
fs.copyFileSync(path.join(root,'public/favicon.svg'),path.join(root,'preview/assets/favicon.svg'));
// The owner's portrait and OG image are local assets, not remote dependencies.
fs.mkdirSync(path.join(root,'preview/assets/images'),{recursive:true});
for(const asset of fs.readdirSync(path.join(root,'public/images'))) {
 if(/\.(png|jpe?g|webp)$/i.test(asset)) fs.copyFileSync(path.join(root,'public/images',asset),path.join(root,'preview/assets/images',asset));
}
fs.copyFileSync(path.join(root,'public/og-image.png'),path.join(root,'preview/assets/og-image.png'));
fs.writeFileSync(path.join(root,'preview/index.html'),shell(html.replaceAll('src="/projects/','src="assets/projects/'),'Filipe Monteiro — Portfólio',interactive));
// The same illustration assets power both Next.js and the offline preview.
const projectDir = path.join(root, 'public/projects');
for (const slug of fs.readdirSync(projectDir)) {
 const source=path.join(projectDir,slug,'concept.svg');const dest=path.join(root,'preview/assets/projects',slug);
 fs.mkdirSync(dest,{recursive:true});for (const asset of fs.readdirSync(path.join(projectDir,slug))) {
   if (/\.(png|jpe?g|svg|webp)$/i.test(asset)) fs.copyFileSync(path.join(projectDir,slug,asset),path.join(dest,asset));
 }
}
const sections = project => [
  ['01','O desafio',project.goal,[]],['02','Como foi construído','Etapas e tecnologias descritas no material disponível sobre o projeto.',project.approach],['03','Decisões de engenharia','Escolhas de arquitetura relevantes para a solução.',project.decisions],['04','Desafios técnicos','Pontos de complexidade do desenvolvimento.',project.challenges],['05','Aprendizados','O valor do projeto está nas decisões e na evolução técnica.',project.learnings]
];
for(const p of projects){
 const next=projects[(projects.findIndex(x=>x.slug===p.slug)+1)%projects.length];
 const {ProjectArtwork}=load(path.join(root,'src/components/ProjectArtwork'));
 const caseContent=`<div class="scroll-progress" style="transform:scaleX(0)"></div><header class="signature-header"><a class="signature-name" href="../index.html" aria-label="Voltar ao início">FILIPE <span>MONTEIRO</span></a></header><main class="case-main"><div class="case-hero section-container"><a href="../index.html#projetos" class="case-back">← VOLTAR AOS PROJETOS</a><div class="case-hero-meta"><span>PROJECT ${p.number} / ${esc(p.eyebrow)}</span><span>${esc(p.status.toUpperCase())}</span></div><h1>${esc(p.title)}<span class="case-title-dot">.</span></h1><p class="case-description">${esc(p.subtitle+' '+p.description)}</p><div class="case-hero-tags">${p.stack.map(x=>'<span>'+esc(x)+'</span>').join('')}</div><div class="case-hero-art">${render(ProjectArtwork({project:p})).replaceAll('src="/projects/','src="../assets/projects/')}</div><p class="case-visual-note">${p.visualVerified ? 'CAPTURA REAL VERIFICADA.' : 'ILUSTRAÇÃO CONCEITUAL — não é uma captura do repositório.'}</p>${p.disclaimer?'<p class="case-visual-note">NOTA — '+esc(p.disclaimer)+'</p>':''}</div><div class="case-body section-container"><aside class="case-sidebar"><span class="mono">PROJECT INDEX / ${p.number}</span>${sections(p).map(s=>'<a href="#case-'+s[0]+'"><span>'+s[0]+'</span>'+esc(s[1])+'</a>').join('')}<a class="case-github" href="${p.github}" target="_blank" rel="noopener noreferrer">VER REPOSITÓRIO ↗</a></aside><article class="case-article">${sections(p).map(s=>`<section id="case-${s[0]}" class="case-chapter"><div class="case-chapter-index">/${s[0]} — CASE STUDY</div><h2>${esc(s[1])}</h2><p>${esc(s[2])}</p>${s[3].length?'<ul>'+s[3].map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':''}</section>`).join('')}<section class="case-result"><span class="mono">06 / RESULTADO E EVIDÊNCIAS</span><h2>O resultado</h2><p>${esc(p.result)}</p><a href="${p.github}" target="_blank" rel="noopener noreferrer">EXPLORAR O CÓDIGO-FONTE ↗</a></section></article></div><a href="${next.slug}.html" class="case-next section-container"><span>PRÓXIMO PROJETO ↗</span><strong>${esc(next.title)}</strong></a></main><footer class="case-footer section-container"><a href="../index.html">F✳M</a><span>FILIPE MONTEIRO / PORTFÓLIO 2026</span></footer>`;
 const caseJS=`window.addEventListener('scroll',()=>{let max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform='scaleX('+(max>0?scrollY/max:0)+')'},{passive:true});`;
 fs.mkdirSync(path.join(root,'preview/projetos'),{recursive:true});
 fs.writeFileSync(path.join(root,'preview/projetos',p.slug+'.html'),shell(caseContent,p.title+' — Estudo de caso',caseJS,'../'));
}
console.log('Preview generated: index + '+projects.length+' case studies.');

// Make the standalone preview portable (file:// as well as HTTP hosting).
const indexPath=path.join(root,'preview/index.html');
let index=fs.readFileSync(indexPath,'utf8');
index=index.replaceAll('href="${depth}styles.css"','href="styles.css"').replaceAll('href="/assets/','href="assets/');
index=index.replace(/href="\/projetos\/([a-z0-9-]+)"/g,'href="projetos/$1.html"');
fs.writeFileSync(indexPath,index);
for(const p of projects){
 const file=path.join(root,'preview/projetos',p.slug+'.html');
 let content=fs.readFileSync(file,'utf8');
 content=content.replaceAll('href="${depth}styles.css"','href="../styles.css"').replaceAll('href="/assets/','href="../assets/');
 content=content.replaceAll('href="/#','href="../index.html#').replaceAll('href="/"','href="../index.html"');
 content=content.replace(/href="\/projetos\/([a-z0-9-]+)\.html"/g,'href="$1.html"');
 fs.writeFileSync(file,content);
}
