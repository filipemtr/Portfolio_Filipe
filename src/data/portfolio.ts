/**
 * Conteúdo profissional editável.
 * Fonte: briefing fornecido pelo titular e histórico de projetos.
 * Algumas capturas foram fornecidas diretamente pelo titular e são usadas como imagens verificadas dos projetos.
 * Nunca transforme itens "em validação" em funcionalidades de produção sem evidência.
 */
export type Domain = 'dados' | 'software' | 'cloud' | 'seguranca';
export type Project = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  domain: Domain;
  subtitle: string;
  description: string;
  goal: string;
  approach: string[];
  decisions: string[];
  challenges: string[];
  learnings: string[];
  result: string;
  disclaimer?: string;
  visualSrc?: string; // Caminho da imagem principal do projeto no portfólio.
  visualVerified?: boolean; // true: imagem enviada pelo autor; false: ilustração conceitual.
  stack: string[];
  github: string;
  accent: 'lime' | 'cyan' | 'orange' | 'violet';
  status: string;
};

export const identity = {
  fullName: 'João Filipe Monteiro Rocha',
  professionalName: 'Filipe Monteiro',
  location: 'Caruaru, Pernambuco · Brasil',
  education: 'Análise e Desenvolvimento de Sistemas',
  university: 'Wyden UNIFAVIP',
  period: '2º período · nov/2026',
  email: 'filipemtr11@gmail.com',
  phone: '+55 81 99325-0701',
  github: 'https://github.com/filipemtr',
  linkedin: 'https://www.linkedin.com/in/filipemonteiro11',
};

export const projects: Project[] = [
  {
    slug: 'lastfm-tracker', number: '01', title: 'LastFM Tracker', eyebrow: 'DATA ENGINEERING / FEATURED',
    domain: 'dados', accent: 'lime', status: 'Projeto prático',
    subtitle: 'Dados musicais, da API ao insight.',
    description: 'Pipeline de dados para acompanhar tendências musicais globais e por país, da extração e orquestração à camada analítica.',
    goal: 'Transformar dados obtidos da API Last.fm em conjuntos organizados para análise, com execução recorrente e separação de responsabilidades.',
    approach: [
      'Extração de rankings e métricas a partir da API Last.fm em Python.',
      'Orquestração diária com Apache Airflow e serviços containerizados.',
      'Organização das informações em camadas Bronze, Silver e Gold no AWS S3.',
      'Transformações com PySpark e Databricks; modelagem dimensional em fatos e dimensões.',
      'Consulta dos dados processados com AWS Athena e visualizações com Apache Superset.'
    ],
    decisions: [
      'Arquitetura Medallion para separar ingestão, padronização e consumo.',
      'Star Schema na camada Gold para facilitar análises por música, artista e país.',
      'Parquet nos conjuntos analíticos para interoperabilidade com Athena.'
    ],
    challenges: [
      'Integração entre orquestração, containers, processamento e serviços de nuvem.',
      'Compatibilidade de formatos e localização dos arquivos para consulta no Athena.',
      'Construção de dimensões consistentes a partir de fontes musicais distintas.'
    ],
    learnings: ['Visão de ponta a ponta de um fluxo de dados.', 'Modelagem dimensional e contratos entre camadas.', 'Diagnóstico de integrações de infraestrutura.'],
    result: 'Fluxo de extração, transformação, modelagem e exploração analítica desenvolvido em projeto pessoal. Sem alegações de volume, SLA ou usuários em produção.',
    stack: ['Python', 'Airflow', 'PySpark', 'Databricks', 'AWS S3', 'Glue', 'Athena', 'Superset', 'Docker', 'Parquet', 'Star Schema'],
    visualSrc: '/projects/lastfm-tracker/verified.png',
    visualVerified: true,
    github: 'https://github.com/filipemtr/LastFM-Tracker'
  },
  {
    slug: 'pipeline-databricks-s3', number: '02', title: 'Databricks × S3', eyebrow: 'DATA PIPELINE / CLOUD',
    domain: 'dados', accent: 'cyan', status: 'Projeto prático',
    subtitle: 'Uma arquitetura que organiza o dado em camadas.',
    description: 'Pipeline ETL com processamento distribuído e armazenamento em nuvem, estruturado com arquitetura Medallion.',
    goal: 'Organizar a transformação de dados em etapas claras, separando material bruto, informação tratada e dados prontos para consumo.',
    approach: ['Ingestão em ambiente AWS S3.', 'Processamento e transformações com PySpark no Databricks.', 'Organização em camadas Bronze, Silver e Gold.', 'Uso de Delta Lake e execução por Jobs conforme configuração do projeto.'],
    decisions: ['Separação de qualidade e finalidade dos dados por camadas.', 'Adoção de ferramentas de processamento distribuído.', 'Centralização de armazenamento para interoperabilidade.'],
    challenges: ['Integração entre jobs, armazenamento e formato das tabelas.', 'Definição de limites entre ingestão e transformação.'],
    learnings: ['Organização do pipeline para manutenção.', 'Transformações com PySpark.', 'Integração entre Databricks e AWS.'],
    result: 'Projeto de prática em ETL e armazenamento orientado à arquitetura Medallion. Métricas de execução não verificadas.',
    stack: ['Python', 'PySpark', 'Databricks', 'AWS S3', 'Delta Lake', 'Medallion'],
    visualSrc: '/projects/pipeline-databricks-s3/fictional.svg',
    visualVerified: false,
    github: 'https://github.com/filipemtr/pipeline-databricks-s3'
  },
  {
    slug: 'realeza-barbers', number: '03', title: 'Realeza Barbers', eyebrow: 'FULL STACK / PRODUCT',
    domain: 'software', accent: 'orange', status: 'Projeto de aplicação',
    subtitle: 'Gestão e experiência em um único produto.',
    description: 'Aplicação para gerenciamento de barbearia, reunindo agendamentos, clientes, serviços e controle de acesso.',
    goal: 'Tornar operações comuns de uma barbearia mais organizadas em uma interface de fácil utilização.',
    approach: ['Experiência web orientada a organização de agendamentos e serviços.', 'Componentização de interface com React, TypeScript e Tailwind CSS, segundo o briefing.', 'Integração com APIs e persistência em SQLite mencionadas no material do projeto.'],
    decisions: ['Centralizar operações de negócio em uma experiência web.', 'Organizar interface em componentes reutilizáveis.', 'Dar atenção a estados e fluxos de interação.'],
    challenges: ['Articular telas e regras de gerenciamento.', 'Conectar a interface a dados persistidos.'],
    learnings: ['Design de fluxo de aplicações web.', 'Tipagem e desenvolvimento de interfaces.', 'Integração entre frontend e persistência.'],
    result: 'Sistema de gerenciamento apresentado no briefing, com capturas de tela fornecidas pelo autor do projeto. O repositório pode ser consultado para detalhes técnicos adicionais.',
    visualSrc: '/projects/realeza-barbers/verified.png',
    visualVerified: true,
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'APIs', 'SQLite'],
    github: 'https://github.com/filipemtr/Realeza_Barbers'
  },
  {
    slug: 'cofree', number: '04', title: 'CoFree', eyebrow: 'SECURITY / FULL STACK',
    domain: 'seguranca', accent: 'violet', status: 'Projeto acadêmico em evolução',
    subtitle: 'Segurança digital sem complicar o essencial.',
    description: 'Plataforma acadêmica de conscientização e monitoramento de exposição de credenciais, com foco em proteção de contas e privacidade.',
    goal: 'Ajudar pessoas a identificar e compreender vazamentos conhecidos e aplicar medidas preventivas de segurança.',
    approach: ['Interface web em React e TypeScript.', 'Serviços backend com FastAPI e armazenamento com PostgreSQL.', 'Tarefas assíncronas e monitoramento com Celery e Redis.', 'Verificação de senhas comprometidas via Pwned Passwords com k-anonymity.', 'Implementações de autenticação e Vault criptografado no projeto em desenvolvimento.'],
    decisions: ['Separar monitoramento assíncrono do ciclo de requisições web.', 'Não transmitir senhas em claro para o verificador de senhas vazadas.', 'Pensar em controle de acesso, criptografia e proteção de sessões como requisitos do produto.'],
    challenges: ['Integração entre segurança, experiência do usuário e arquitetura full stack.', 'Validação contínua do comportamento e dos fluxos de segurança.'],
    learnings: ['Design de aplicações com privacidade em foco.', 'Trabalho com serviços assíncronos.', 'Importância de testes de integração e segurança.'],
    result: 'Implementação acadêmica em evolução; testes e ambiente de produção não são apresentados como validados nesta página.',
    visualSrc: '/projects/cofree/verified.png',
    visualVerified: true,
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'JWT', 'Pwned Passwords'],
    github: 'https://github.com/filipemtr/CoFree'
  }
];

export type SkillGroup = { key: Domain; title: string; index: string; summary: string; primary: string[]; secondary: string[]; projectSlugs: string[]; };
export const skillGroups: SkillGroup[] = [
  { key: 'dados', title: 'Engenharia de dados', index: '01 / DATA', summary: 'Da ingestão à modelagem e ao consumo analítico.', primary: ['Python', 'SQL', 'PySpark', 'Databricks', 'Apache Airflow', 'Pandas', 'AWS S3'], secondary: ['NumPy', 'ETL / ELT', 'Delta Lake', 'Medallion', 'Star Schema', 'Modelagem dimensional', 'Athena', 'Glue', 'Superset'], projectSlugs: ['lastfm-tracker', 'pipeline-databricks-s3'] },
  { key: 'software', title: 'Software & Backend', index: '02 / BUILD', summary: 'APIs, interfaces e bancos de dados conectados.', primary: ['FastAPI', 'React', 'TypeScript', 'JavaScript', 'PostgreSQL', 'SQLAlchemy'], secondary: ['Next.js', 'Tailwind CSS', 'REST APIs', 'Pydantic', 'JWT', 'MySQL', 'SQLite', 'Supabase'], projectSlugs: ['realeza-barbers', 'cofree'] },
  { key: 'cloud', title: 'Cloud & DevOps', index: '03 / INFRA', summary: 'Ambientes reproduzíveis e serviços integrados.', primary: ['AWS S3', 'Docker', 'Docker Compose', 'Linux', 'Git', 'GitHub'], secondary: ['AWS Glue', 'AWS Athena', 'Bash', 'Redis', 'Celery', 'EC2 (contato)'], projectSlugs: ['lastfm-tracker', 'pipeline-databricks-s3', 'cofree'] },
  { key: 'seguranca', title: 'Security & Learning', index: '04 / EXPLORE', summary: 'Segurança aplicada e estudos em evolução.', primary: ['JWT', 'Autenticação', 'Autorização', 'RBAC', 'Hashing'], secondary: ['Criptografia', 'Proteção de sessões', 'Validação de entradas', 'Go (em estudo)', 'LLMs (em estudo)', 'Agentes de IA (em estudo)'], projectSlugs: ['cofree'] }
];

export const pipelineStages = [
  { id: 'api', title: 'API', sub: 'SOURCE', detail: 'A extração em Python consulta rankings musicais da Last.fm e prepara os dados para a ingestão.', tool: 'Python · Requests' },
  { id: 'airflow', title: 'Airflow', sub: 'ORCHESTRATE', detail: 'A DAG organiza tarefas, dependências e a frequência da execução do pipeline.', tool: 'Apache Airflow' },
  { id: 'bronze', title: 'Bronze', sub: 'LAND', detail: 'Os dados coletados são armazenados como matéria-prima, preservando a separação da transformação.', tool: 'AWS S3' },
  { id: 'spark', title: 'Databricks', sub: 'PROCESS', detail: 'O PySpark padroniza informações e produz conjuntos preparados para a modelagem.', tool: 'Databricks · PySpark' },
  { id: 'gold', title: 'Silver / Gold', sub: 'MODEL', detail: 'As camadas tratada e analítica estruturam fatos e dimensões para consultas.', tool: 'Parquet · Star Schema' },
  { id: 'athena', title: 'Athena', sub: 'QUERY', detail: 'As tabelas analíticas do data lake são disponibilizadas para consultas SQL.', tool: 'AWS Glue · Athena' },
  { id: 'superset', title: 'Superset', sub: 'VISUALIZE', detail: 'Dashboards traduzem os dados em visualizações exploráveis.', tool: 'Apache Superset' },
];
