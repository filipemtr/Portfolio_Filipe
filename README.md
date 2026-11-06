# Filipe Monteiro — Portfólio profissional

Portfólio pessoal para apresentar Engenharia de Dados, Software, Backend e projetos full stack. Implementado em **Next.js + React + TypeScript**, com CSS próprio, Motion e Lucide. O conteúdo é em português do Brasil.

## Identidade — Violet Glass / Retrato e profundidade

- **Preto profundo** como base, **branco** na tipografia e nas ações principais, **roxo ametista** nos pontos de atenção.
- Foto pessoal original do autor no hero, sem retoque facial, acompanhada de cartões translúcidos com efeito *glassmorphism*, halos e órbitas discretas.
- O diagrama interativo de tecnologias foi preservado e agora aparece na seção “Sobre”.
- Assinatura **FILIPE MONTEIRO** centralizada, sem navbar tradicional nem linhas decorativas ao redor.
- Animações de entrada ao rolar a página, filtros de projetos, diagrama tecnológico e terminal opcional, respeitando `prefers-reduced-motion`.

## Projetos e imagens

| Projeto | Visual no portfólio | Link externo |
| --- | --- | --- |
| LastFM Tracker | Captura real do dashboard fornecida pelo autor | `github.com/filipemtr/LastFM-Tracker` |
| Databricks × S3 | **Ilustração fictícia** da arquitetura Medallion (Bronze, Silver, Gold) | `github.com/filipemtr/pipeline-databricks-s3` |
| Realeza Barbers | **Somente a captura da página inicial**. A imagem do cadastro não faz parte do portfólio. | `github.com/filipemtr/Realeza_Barbers` |
| CoFree | Composição de duas capturas fornecidas pelo autor | `github.com/filipemtr/CoFree` |

Todos os cards têm **ESTUDAR CASO** e um **ícone GitHub** independente, assim como o projeto destacado. As páginas de estudo de caso têm seus próprios links para o repositório.

A origem de cada imagem está em [`docs/IMAGE_PROVENANCE.md`](docs/IMAGE_PROVENANCE.md). As capturas fornecidas pelo autor não demonstram, por si, que o projeto esteja em produção. Não foram inventadas métricas, resultados ou usuários.

## Executar o projeto Next.js

Requer Node.js 22+ e npm.

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

Para produção:

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

O arquivo `.env.example` apresenta o domínio configurável para metadados. Antes do deploy, configure `NEXT_PUBLIC_SITE_URL` com a URL real publicada, se necessário. O deploy pode ser feito pela Vercel conectando um repositório Git.

**Validação nesta revisão:** 14 arquivos TS/TSX passaram na verificação sintática; quatro projetos e links de GitHub verificados; prévia HTML testada com Chromium em sete larguras (320 a 1440 px), sem overflow horizontal nem erros JavaScript. O teste foi realizado com HTML/CSS/imagens embutidos no navegador porque a navegação direta a arquivos locais é bloqueada neste ambiente. O build Next.js com dependências reais não foi executado. Rode os comandos de produção antes de publicar.

## Abrir a prévia offline

Extraia o ZIP de prévia separadamente e abra `index.html`. Ela contém HTML, CSS, JavaScript e imagens locais, sem exigir instalação do Next.js. As páginas em `projetos/` permitem consultar os quatro estudos de caso.

## Atualizar conteúdo, projetos e imagens

- Informações profissionais, stack e dados dos projetos: `src/data/portfolio.ts`.
- Página principal e ações dos cards: `app/page.tsx`.
- Componentes visuais: `src/components/`.
- Paleta e aparência: `app/globals.css` (seção final `F/M — VIOLET GLASS / 2026`).
- Arquivos visuais: `public/projects/<slug>/` e foto pessoal em `public/images/`.
- Cartões do retrato: `src/components/PortraitStage.tsx`.
- Páginas completas: `app/projetos/[slug]/page.tsx`.

Depois de modificar o projeto, para regenerar a prévia (com TypeScript disponível):

```bash
node scripts/build-preview.cjs
node scripts/check-syntax.cjs
```

Links de contato e GitHub funcionam sem backend. O terminal interativo é uma simulação limitada a comandos documentados, e não executa comandos de sistema.

## Direção criativa e transparência

A referência de composição foi o site [thainanprado.com.br](https://thainanprado.com.br/): uso de retrato, informações em primeiro plano e hierarquia de conteúdo. O design aqui foi redesenhado especificamente para Filipe, com formas, texto, conteúdo e implementação originais; **nenhum arquivo de imagem, código, marca ou conteúdo daquele site foi copiado**.

A foto em `public/images/filipe-portrait.webp` foi fornecida diretamente pelo autor. O processo apenas redimensionou/comprimiu a foto para otimização, sem modificar traços do rosto. `public/og-image.png` inclui a foto para compartilhamento social.

O arquivo `scripts/build-preview.cjs` gera novamente a prévia offline e copia automaticamente as imagens. O arquivo `scripts/qa_violet.py` documenta a inspeção via Chromium, executada com recursos locais embutidos porque a navegação por `file://` foi bloqueada aqui.


## Refinamento de interface — 05/11/2026

- Links sociais no rodapé ampliados com ícones do LinkedIn, GitHub e e-mail, preservando destinos clicáveis.
- Monograma F/M do diagrama passou a ser desenhado dentro do SVG na posição exata do núcleo (x=287, y=207), evitando desvios de alinhamento.
- Tipografia de «CONSTRUIR» revisada: espaçamento entre letras mais natural e tamanho responsivo, sem sobreposição visual.
- Versão de visualização offline regenerada a partir do código.


### Ajuste pontual da foto em pé
Foi ampliado apenas o retrato recortado da seção de contato (`.contact-photo-wrap`) em desktop, tablet e mobile, sem mexer na foto principal, no conteúdo ou no restante do design.
