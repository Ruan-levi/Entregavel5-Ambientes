# Requisitos da Entregável 5 — CONQUEST na AWS

Esta entrega reutiliza o CONQUEST como jogo educacional 3D e demonstra uma aplicação com frontend HTML/CSS/JavaScript/React, API REST Node.js, SQLite persistente e hospedagem AWS EC2.

| Requisito | Onde demonstrar |
|---|---|
| Jogo funcional | `src/game/`, `src/main.js`, link AWS |
| HTML + CSS + JavaScript | `index.html`, `src/style.css`, `src/main.js` |
| React | `src/ui/entregavel5.js`: painel de contas e ranking |
| Backend Web Service REST | `server/index.mjs`: rotas GET, POST, PATCH |
| Banco de dados | `server/service.mjs`: SQLite e tabelas |
| Autenticação e autorização | Login, Bearer token, perfis `jogador` e `admin` |
| Quatro ou mais transações | Cadastro, login, alteração do perfil, registro e consulta de pontuação, logout |
| Hospedagem em nuvem | AWS EC2 em Ohio, endereço público |
| Testes | `tests/`, GitHub Actions `.github/workflows/ci.yml` |

## Divisão das transações — dois integrantes

**Integrante 1:** cadastro (`POST /api/register`), login (`POST /api/login`) e alteração do nome público (`PATCH /api/me`).

**Integrante 2:** registrar pontuação (`POST /api/scores`), consultar histórico (`GET /api/scores`) e sair (`POST /api/logout`).

Ambos podem demonstrar `GET /api/ranking`, a aventura 3D e as verificações GitHub Actions.

## Estrutura do banco

- `players`: jogadores e perfis.
- `access_tokens`: sessões e expiração.
- `scores`: pontuação, acertos e conclusão da partida.

Os resultados são enviados ao backend apenas quando um jogador está autenticado no painel React e uma partida termina. A pontuação vem do navegador, para fins didáticos.

**Atenção para a apresentação:** a aplicação publicada utiliza HTTP; use somente dados de teste. Os commits deste repositório não têm deploy automático na EC2.
