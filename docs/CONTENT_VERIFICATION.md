# Checklist de verificação de conteúdo antes de publicar

**Estado em 05/11/2026:** verificação direta de repositórios impedida por falha de acesso. As descrições provêm do briefing do titular e de contexto de desenvolvimento informado na conversa.

| Projeto | URL recebida | Informações apresentadas | Pontos a confirmar |
|---|---|---|---|
| LastFM Tracker | `github.com/filipemtr/LastFM-Tracker` | Python, Airflow, PySpark, Databricks, S3, Athena, Glue, Superset, Medallion, modelagem dimensional | Estrutura e DAG atuais, nomes de tabelas, links reais para dashboard/screenshot |
| Databricks × S3 | `github.com/filipemtr/pipeline-databricks-s3` | PySpark, Jobs, S3, Delta Lake, Medallion | Jobs em execução, documentação e tipos de fontes |
| Realeza Barbers | `github.com/filipemtr/Realeza_Barbers` | React, TypeScript, Vite, Tailwind, SQLite informados no briefing | Backend real, autenticação, flows, screenshots verdadeiros |
| CoFree | `github.com/filipemtr/CoFree` | React, FastAPI, PostgreSQL, Redis, Celery e segurança | Deploy, recursos efetivamente testados, validação de integração e E2E |

## Antes de colocar no ar

- [ ] Testar os links e checar que os repositórios estão públicos.
- [ ] Comparar toda stack de cada card/case com o README e arquivos de código.
- [ ] Substituir representações conceituais por screenshots reais se possível.
- [ ] Validar e registrar os testes CoFree que tenham sido efetivamente executados.
- [ ] Definir URL verdadeira `NEXT_PUBLIC_SITE_URL`.
- [ ] Executar `npm install`, `npm run typecheck`, `npm run lint` e `npm run build`.
- [ ] Conferir mobile, links, teclado e `prefers-reduced-motion` no deploy real.
- [ ] Testar metadados/OG do domínio final.
- [ ] Evitar métricas não medidas e termos que insinuem experiência empregatícia inexistente.

## Conceitual vs. screenshot

`ProjectVisual.tsx` usa uma visualização original de arquitetura para LastFM e Databricks. Realeza Barbers e CoFree usam interfaces **conceituais** marcadas visualmente com selo `UI CONCEITUAL`. A intenção é demonstrar design, não criar evidência fictícia do software real.
