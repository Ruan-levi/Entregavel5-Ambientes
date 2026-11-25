# Roteiro de apresentação — CONQUEST Entregável 5

1. [index.html](../index.html) — portal, componentes HTML e canvas.
2. [src/style.css](../src/style.css) — estilos e layout.
3. [src/main.js](../src/main.js) — controle, missões e teclas; campos de login não são bloqueados.
4. [src/game/scene.js](../src/game/scene.js) — cenário em Babylon.js/WebGL.
5. [src/game/logic.js](../src/game/logic.js) — regras, movimentação e combate.
6. [src/game/questions.js](../src/game/questions.js) — questões de teoria dos conjuntos.
7. [src/ui/entregavel5.js](../src/ui/entregavel5.js) — painel React: hooks, formulário, Nhost Auth e consultas.
8. [src/services/nhost.js](../src/services/nhost.js) — login, PostgreSQL/GraphQL, Storage, Realtime e chamadas REST.
9. [functions/duel.js](../functions/duel.js) — backend em JavaScript, JWT, endpoints GET/POST, validação de resultados.
10. [nhost/migrations/](../nhost/migrations/) — tabelas PostgreSQL e ranking.
11. [tests/](../tests/) — testes automáticos da lógica, teclado e backend.
12. [.github/workflows/pages.yml](../.github/workflows/pages.yml) — deploy automático para o GitHub Pages.

**Fluxo:** GitHub → Vite/GitHub Pages (frontend) → Nhost Auth/GraphQL + Functions REST → PostgreSQL. O domínio do Pages é compartilhado entre os dois repositórios, mas os caminhos de publicação são diferentes.
