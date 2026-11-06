/** Verifica erros sintáticos em arquivos TypeScript/TSX, sem resolver dependências. */
const ts = require('typescript'); const fs = require('fs'); const path = require('path');
const base = path.resolve(__dirname, '..'); let files = 0; let errors = 0;
function inspect(dir) {
 for(const e of fs.readdirSync(dir,{withFileTypes:true})) {
  const f=path.join(dir,e.name);
  if(e.isDirectory()) inspect(f);
  else if(/\.(ts|tsx)$/.test(e.name)) {
   const source=fs.readFileSync(f,'utf8'); files++;
   const result=ts.transpileModule(source,{fileName:f,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}});
   for(const d of result.diagnostics||[]) if(d.category===ts.DiagnosticCategory.Error) {errors++;console.error(`${f}: ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`)}
  }
 }
}
inspect(path.join(base,'src')); inspect(path.join(base,'app'));
console.log(`${files} arquivos TypeScript/TSX inspecionados; ${errors} erros de sintaxe.`);
if(errors) process.exit(1);
