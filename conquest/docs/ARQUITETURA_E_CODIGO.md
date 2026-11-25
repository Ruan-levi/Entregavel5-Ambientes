# Arquitetura e tecnologias — Entregável 5 AWS

## Qual aplicação está sendo apresentada?

O repositório contém apenas a **Entregável 5 — CONQUEST**, baseada no jogo 3D em Vite/Babylon.js e um painel React. O backend da atividade é **Node.js com REST e SQLite**, hospedado em instância **AWS EC2**.

## Frontend

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Canvas 3D, portal, botões, overlays e carregamento do React |
| `src/style.css` | HUD, aparência, telas, controles e responsividade |
| `src/main.js` | Eventos de jogo, teclado, início e conclusão da jornada |
| `src/game/scene.js` | `B.Engine`, `B.Scene`, câmera, iluminação e renderização do mundo |
| `src/game/logic.js` | Mecânica de conjuntos, batalhas, vidas e pontuação |
| `src/game/questions.js` | Banco de perguntas em JavaScript |
| `src/ui/entregavel5.js` | Painel React, `useState`, `useEffect`, cadastro, login e ranking |

O React é um **painel complementar**, e não o motor 3D. A campanha emite um evento `conquest:finished`, e o painel, quando autenticado, solicita ao backend o registro da pontuação.

## Backend e banco

- `server/index.mjs`: utiliza o módulo `node:http`, recebe requisições, extrai JSON e o token Bearer, e delega operações ao serviço. Também serve os arquivos do build Vite.
- `server/service.mjs`: usa `node:sqlite`, `DatabaseSync`, SQL parametrizado, hash `scryptSync` de senhas, hash dos tokens de sessão e autorização por perfis `admin` e `jogador`.
- Tabelas: `players`, `access_tokens` e `scores`.

```text
Browser: Babylon.js (jogo) + React (painel)
                 ↓ fetch('/api/...')
         AWS EC2: Nginx (80)
                 ↓
         Node.js (127.0.0.1:4000)
                 ↓
         SQLite (EBS persistente)
```

## Testes e implantação

- `tests/logic.test.js`, `tests/interactions.test.js`: regras de jogo em Vitest.
- `tests/entregavel5.node.mjs`: testes Node de autenticação, pontuação e permissões.
- `.github/workflows/ci.yml` (raiz): instala dependências, executa testes e gera build.
- **Não há deploy automático na EC2**; é necessário implantar novas alterações no servidor após a CI.

O ranking acadêmico recebe pontos enviados pelo navegador e não fornece proteção competitiva antifraude. A URL de demonstração é HTTP, por isso use somente dados de teste.
