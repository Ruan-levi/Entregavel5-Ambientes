# Roteiro de leitura e apresentação dos códigos — CONQUEST

Este documento explica **em que ordem abrir os arquivos da pasta [`conquest/`](../conquest/)** e o que cada parte demonstra na Entregável 5.

## 1. O que mostrar primeiro

Abra a [aplicação na AWS](http://3.149.254.9/) e identifique o portal do jogo, a opção de iniciar sem login e o botão **Progresso AWS**. O projeto original foi escrito em JavaScript/Babylon.js; o painel de progresso é React e conversa com uma API Node.js/SQLite.

## 2. Ordem dos arquivos (frontend)

1. [`conquest/index.html`](../conquest/index.html) — estrutura HTML, o `canvas`, a HUD e a área do painel React.
2. [`conquest/src/style.css`](../conquest/src/style.css) — organização visual, responsividade e controles da aventura.
3. [`conquest/src/main.js`](../conquest/src/main.js) — eventos de teclado, telas, mensagens e integração do resultado da partida.
4. [`conquest/src/game/scene.js`](../conquest/src/game/scene.js) — `B.Engine`, `B.Scene`, câmera, luzes, cenário e objetos com Babylon.js.
5. [`conquest/src/game/logic.js`](../conquest/src/game/logic.js) — `createGameState`, `movementVector`, `interact`, `answerQuestion` e `makeResult`.
6. [`conquest/src/game/questions.js`](../conquest/src/game/questions.js) — conjunto de questões e respostas.
7. [`conquest/src/ui/entregavel5.js`](../conquest/src/ui/entregavel5.js) — `useState`, `useEffect`, `fetch`, cadastro, login, histórico e ranking.

## 3. Ordem dos arquivos (backend e banco)

8. [`conquest/server/index.mjs`](../conquest/server/index.mjs) — `http.createServer`, recebimento de JSON, token Bearer, roteamento e arquivos compilados.
9. [`conquest/server/service.mjs`](../conquest/server/service.mjs) — `DatabaseSync` e as tabelas `players`, `access_tokens` e `scores`; `scryptSync`, `randomBytes`, validações e `dispatch`.
10. [`conquest/tests/entregavel5.node.mjs`](../conquest/tests/entregavel5.node.mjs) — testes de cadastro, login, logout, persistência, permissões e ranking.
11. [`conquest/package.json`](../conquest/package.json) — comandos `npm run dev`, `npm test`, `npm run build`.
12. [`conquest/docs/CONFIGURACAO_E_EXECUCAO.md`](../conquest/docs/CONFIGURACAO_E_EXECUCAO.md) — como rodar localmente e como funciona a instância AWS.

## 4. Fluxo completo para explicar

```text
Navegador
  ├─ Jogo 3D — HTML + CSS + JavaScript + Babylon.js
  │  └─ Fim da partida → evento conquest:finished
  └─ Painel Progresso AWS — React
       └─ fetch('/api/...') → Nginx HTTP 80
                              ↓
                       Node.js REST (4000)
                              ↓
                       service.dispatch()
                              ↓
                           SQLite (EBS)
```

No cadastro a API cria um jogador; no login gera token; em uma rota privada valida a sessão; na conclusão do jogo o painel envia o resultado; no histórico a API consulta o SQLite.

## 5. O que diferenciar na explicação

- **Babylon.js não é Unity:** o jogo web está em JavaScript; os arquivos C# em `conquest/unity-remake/` são protótipos separados.
- **React não é o motor do jogo:** é empregado no painel adicional da Entregável 5.
- **Node.js não usa Express nesta versão:** a API é feita diretamente com `node:http`.
- **SQLite não é Nhost:** o SQLite pertence ao módulo AWS, enquanto Nhost usa um backend externo independente.
- **GitHub Pages não é AWS EC2:** o Pages hospeda frontend estático; a EC2 executa frontend, Node.js e SQLite.
- **Dockerfile original não contém o backend acadêmico:** ele cria uma imagem Nginx com os arquivos estáticos.
- **A cópia neste repositório é um snapshot:** mudanças posteriores no repositório de origem não aparecem automaticamente aqui.

## 6. Demonstração dos requisitos

Mostre `npm test`, `npm run build` no GitHub Actions desta entrega, a URL AWS, o endpoint `/api/health` e uma sessão fictícia em **Progresso AWS**. Se for criar contas, utilize credenciais de teste porque a URL atualmente é HTTP.

Para mais detalhes, consulte a [documentação técnica copiada](../conquest/docs/ENTREGAVEL5.md) e o [README principal](../README.md).
