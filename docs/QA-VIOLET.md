# QA — Violet Glass (2026-11-05)

## Escopo implementado

- Fotografia original do autor inserida no hero (WebP otimizado; não houve retoque facial).
- Identidade visual em preto, roxo ametista e branco; superfícies translúcidas e cartões flutuantes.
- Diagrama interativo de tecnologias preservado na seção Sobre.
- Capturas reais preservadas para LastFM, Realeza e CoFree; ilustração fictícia preservada para Databricks × S3.
- Links GitHub e estudos de caso preservados para os quatro projetos.
- Previews HTML e código Next.js incluídos.

## Testes efetivamente executados

- Verificação de sintaxe TypeScript/TSX: 14 arquivos, zero erros de sintaxe (`scripts/check-syntax.cjs`).
- Verificação estática de imagens e links: quatro projetos, quatro estudos de caso e quatro links GitHub (`scripts/check-assets.py`).
- Inspeção com Chromium usando HTML e imagens embutidos: larguras de 320, 375, 390, 768, 980, 1280 e 1440 px, zero overflow horizontal, nenhuma exceção JS reportada.
- Interação de nó do diagrama: ao clicar, a leitura muda para REACT.
- Filtro de Software: Realeza Barbers aparece corretamente.
- Terminal opcional: abre, recebe `help` e exibe comandos.
- Imagem do retrato carregada em desktop e mobile.

## Limitações

- O navegador deste ambiente bloqueia a navegação direta em `file://`; a inspeção foi executada embutindo localmente HTML, CSS e imagens na página. Isso não substitui um teste de hospedagem completo.
- O build de produção Next.js e os testes de tipo completos ficaram pendentes porque `node_modules` não está instalado. Rode `npm install`, `npm run typecheck`, `npm run lint` e `npm run build` antes de publicar.
- A estética foi inspirada em princípios gráficos de https://thainanprado.com.br/, sem copiar assets ou código de terceiros.
