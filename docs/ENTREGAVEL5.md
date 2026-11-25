# Matriz de requisitos — Entregável 5 com GitHub Pages + Nhost

| Item | Evidência |
|---|---|
| Reutilização de jogo 3D | `src/game/`, `src/main.js` |
| HTML, CSS, JavaScript | `index.html`, `src/style.css`, `src/main.js` |
| React | `src/ui/entregavel5.js` |
| Banco de dados | PostgreSQL Nhost; scripts em `nhost/migrations/` |
| Cadastro, login, logout | Nhost Auth em `src/services/nhost.js` |
| Backend Node.js / REST | Nhost Function em `functions/duel.js` |
| Autorização | JWT validado no backend, políticas de acesso Hasura |
| Hospedagem em nuvem | GitHub Pages + Nhost |
| Testes/controle de versões | GitHub Actions, Vitest, `node:test` |

**Validação de transações:** a Function `duel` usa GET de ranking e POST com as ações criar, entrar, status, responder e cancelar partidas. Não equivale necessariamente a quatro rotas REST distintas. O histórico da campanha usa GraphQL. Se a rubrica pedir CRUD REST por integrante, é necessária adaptação adicional.

**Projetos:** o código deste repositório é independente do CONQUEST Nuvem, mas os dois frontends compartilham a mesma conexão pública Nhost. A configuração do Nhost Dashboard e suas Functions permanece sob controle do projeto conectado ao Nhost, sem exclusão de dados.
