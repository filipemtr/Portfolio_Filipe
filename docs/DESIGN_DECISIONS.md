# Design direction — F/M Systems Studio

## Conceito

**"Construo sistemas que conectam."** Um portfólio sobre relações entre as coisas: APIs, fluxos, infraestrutura, decisões e pessoas. O tema da conexão aparece no logo F✳M, na rede tecnológica, nos diagramas de dados e na tipografia intencionalmente editorial.

## Referências, não cópias

- Awwwards / SiteInspire: narrativa visual, ritmo, assimetria e microinterações.
- Brittany Chiang: leitura rápida, informações de carreira em primeiro lugar, projetos selecionados.
- Josh W. Comeau: elementos interativos com valor pedagógico.
- Bruno Simon: o próprio portfólio como demonstração técnica — sem sacrificar navegabilidade.

Nenhum layout, componente ou design foi copiado de um terceiro. As artes são construídas localmente usando HTML/SVG/CSS.

## Tokens e hierarquia — tema preto, grafite, branco e azul

- Background: `#07090e` — preto profundo neutro.
- Superfícies: `#131c29`, `#1b2838` — grafite frio com subtom azul.
- Texto: `#f5f7fb` — branco suave, contraste elevado.
- Texto secundário: `#b1bccb` — cinza frio claro.
- Azul Marinho de referência: `#010082` — utilizado em nuances de profundidade.
- Azul Oxford de referência: `#022346` — capítulo interativo de arquitetura.
- Azul de ação: `#659fff` — estado ativo, CTAs, links e foco acessível.
- Azul claro: `#9cc6ff` — realces sobre fundos escuros.
- Fontes: Inter (fallback de sistema) e monospace para metadados.
- Mantidos: composição editorial, grade, espaçamentos, tipografia, estrutura, movimento e conteúdo.

## Ideias incorporadas

1. **Hero**: manchete verbal clara à esquerda; mapa interativo de tecnologias à direita. A mensagem deve funcionar mesmo sem a visualização.
2. **Sobre**: afirmação de posicionamento acompanhada de contexto e fatos de formação.
3. **Projetos**: um case em destaque com arte de arquitetura; os demais em um grid de portfólio. Filtros servem exploração de conteúdo, não ornamentação.
4. **Arquitetura**: seção em azul Oxford como um capítulo editorial e um blueprint de verdade, com etapas exploráveis.
5. **Competências**: interação orientada a domínios, explicando onde as tecnologias são aplicadas.
6. **Contato**: final marcante, caminho de conversão real (e-mail), sem formulário sem backend.

## Motion / Acessibilidade

- Entradas graduais usando Motion React; hover sutil e foco visível.
- Radar, pulso e camadas são CSS/SVG, sem animação pesada via canvas.
- Modo `prefers-reduced-motion` desativa animações e scroll suave.
- A informação principal permanece legível sem animação e sem JavaScript, exceto interações opcionais.

## Critérios visuais para evolução

Antes de adicionar algo, pergunte: reforça clareza? demonstra competência? ajuda o recrutador a entender um projeto? Se não, não adicione. Use screenshots reais quando estiverem disponíveis, em vez de simular resultados que não existiram.
