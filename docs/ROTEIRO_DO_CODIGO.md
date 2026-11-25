# Roteiro de demonstração dos códigos — CONQUEST Entregável 5

Este guia segue a ordem das funcionalidades que você apresenta no navegador. Todos os links apontam **para arquivos deste repositório**, não para a versão Nhost de outra disciplina.

## 1. Demonstre o jogo antes de abrir códigos

Abra **[CONQUEST na AWS](http://3.149.254.9/)**. Mostre o portal, a jornada 3D e o botão **Progresso AWS**. Explique: "A aventura usa JavaScript/Babylon.js, e o módulo acadêmico utiliza React e um backend Node.js para salvar resultados no SQLite da AWS."

## 2. Arquivos de frontend (ordem para abrir)

1. [`conquest/index.html`](../conquest/index.html): canvas 3D, botões, telas e scripts React.
2. [`conquest/src/style.css`](../conquest/src/style.css): estilos, HUD, layout e controles móveis.
3. [`conquest/src/main.js`](../conquest/src/main.js): entrada do jogo, eventos de teclado e `conquest:finished` enviado ao React.
4. [`conquest/src/game/scene.js`](../conquest/src/game/scene.js): `B.Engine`, `B.Scene`, câmera, luzes e mundo 3D.
5. [`conquest/src/game/logic.js`](../conquest/src/game/logic.js): `createGameState`, `interact`, `answerQuestion` e cálculo dos pontos.
6. [`conquest/src/game/questions.js`](../conquest/src/game/questions.js): perguntas de união, interseção e outros conceitos de conjuntos.
7. [`conquest/src/ui/entregavel5.js`](../conquest/src/ui/entregavel5.js): componente React; `useState`, `useEffect`, `fetch('/api/...')`, formulário, ranking e histórico.

## 3. Arquivos do backend e banco

8. [`conquest/server/index.mjs`](../conquest/server/index.mjs): `http.createServer`, rotas REST, tratamento de JSON e arquivos compilados.
9. [`conquest/server/service.mjs`](../conquest/server/service.mjs): `DatabaseSync`, tabelas `players`, `access_tokens`, `scores`, autenticação, regras e permissões.
10. [`conquest/tests/entregavel5.node.mjs`](../conquest/tests/entregavel5.node.mjs): provas de cadastro, login, histórico, ranking e bloqueio de acesso administrativo.
11. [`conquest/package.json`](../conquest/package.json): dependências e comandos `npm test` e `npm run build`.
12. [`conquest/docs/CONFIGURACAO_E_EXECUCAO.md`](../conquest/docs/CONFIGURACAO_E_EXECUCAO.md): execução e publicação AWS.

## 4. Explique o caminho de uma transação

```text
Clique em "Criar conta" no React
    → POST /api/register
    → Node.js em server/index.mjs
    → service.dispatch() em server/service.mjs
    → INSERT em players (SQLite no EBS)
    → resposta JSON para o navegador

Ao terminar a aventura e estar autenticado:
    conquista → CustomEvent('conquest:finished')
    → React → POST /api/scores com token Bearer
    → validação no Node.js → INSERT em scores
    → GET /api/scores e GET /api/ranking
```

## 5. Faça a demonstração prática

No navegador: cadastro fictício → login → perfil → completar partida → histórico → ranking → logout. Para mostrar a infraestrutura, abra [`/api/health`](http://3.149.254.9/api/health) e [`/api/ranking`](http://3.149.254.9/api/ranking). Para os testes, mostre [GitHub Actions](../../actions). O servidor AWS recebe novas versões **apenas quando o código é implantado na EC2**; CI aprovado não significa deploy automático.

**Atenção:** URL HTTP, use apenas contas de teste. Não exponha tokens ou hashes. O projeto Nhost não faz parte desta apresentação.
