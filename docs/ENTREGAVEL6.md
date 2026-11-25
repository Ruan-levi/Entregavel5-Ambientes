# Entregável 6 — Aplicação Full Stack e Ambientes de Desenvolvimento

**Disciplina:** Ambientes de Desenvolvimento de Software — UNIFOR  
**Aplicação:** CONQUEST, jogo educativo 3D de Teoria dos Conjuntos  
**Base reutilizada:** [Entregável 5](../README.md)  
**Portal da Entregável 6:** https://ruan-levi.github.io/Entregavel5-Ambientes/entregavel6/  
**Jogo executável:** https://ruan-levi.github.io/Entregavel5-Ambientes/  
**Protótipo Figma:** https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO  
**Quadro de trabalho:** https://github.com/Ruan-levi/Entregavel5-Ambientes/issues  

## 1. Objetivo e limites

A atividade solicita conhecer e demonstrar a maior quantidade possível de **ambientes de desenvolvimento**, citando seis categorias: gestão de tarefas, design UI/UX, IDE, banco de dados, testes e servidores/execução. Esta entrega demonstra **seis ambientes distintos, em um único projeto full stack**, com evidências reproduzíveis. Não é um novo jogo: a aplicação funcional da Entregável 5 foi preservada e ampliada por uma apresentação navegável, protótipo, tarefas, configuração de IDE e automação de navegador.

O código original do [CONQUEST Nuvem](https://github.com/Ruan-levi/Conquest-nuvem) não foi modificado. O frontend e os recursos Nhost da Entregável 5 continuam disponíveis na mesma URL.

## 2. O que caracteriza a aplicação como full stack?

| Camada | Tecnologia | Evidência direta |
|---|---|---|
| Interface | HTML, CSS, JavaScript, React 18 | `index.html`, `src/ui/entregavel5.js`, `src/style.css` |
| Motor de jogo | Babylon.js e WebGL | `src/game/scene.js`, `src/game/logic.js`, `src/main.js` |
| Backend | Nhost Auth; Nhost Functions em JavaScript/Node.js | `src/services/nhost.js`, `functions/duel.js` |
| Comunicação | API REST GET/POST, GraphQL HTTPS, WebSocket de subscriptions | `functions/duel.js`, `src/services/nhost.js` |
| Persistência | PostgreSQL gerenciado pelo Nhost | `nhost/migrations/001_conquest_scores.sql` e `002_conquest_duels.sql` |
| Execução | GitHub Pages + backend gerenciado Nhost | `.github/workflows/pages.yml`, URL pública |

**Fluxo de autenticação:** o usuário informa e-mail e senha no painel React; o cliente Nhost consulta o Nhost Auth; uma sessão autenticada autoriza consultas de histórico e transações previstas pelo backend.

**Fluxo de duelo:** jogador autenticado usa código de convite; a interface envia operações à Function REST `duel`; o serviço verifica sessão, partida e respostas; o PostgreSQL guarda os resultados; a classificação pública inclui somente duelos concluídos.

**Limite importante:** o GitHub Pages **não executa processos Node.js**. Ele entrega HTML/CSS/JavaScript estáticos. A Function JavaScript/Node.js, o Auth e o PostgreSQL executam no Nhost.

## 3. Matriz das seis categorias solicitadas

| Nº | Categoria do enunciado | Ambiente selecionado | Aplicação/evidência | Status de implementação |
|---:|---|---|---|---|
| 1 | Gestão de tarefas | **GitHub Issues** | [Issues #4 a #9](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues) | Quadro criado; atribuição aos integrantes precisa ser feita pela equipe |
| 2 | Design de interface | **Figma** | [Pranchas editáveis](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) | Portal, login e arquitetura desenhados |
| 3 | Desenvolvimento / IDE | **Visual Studio Code** | [`.vscode/`](../.vscode) com tarefas e extensões | Workspace versionado; edição efetiva no PC deve ser demonstrada |
| 4 | Gerenciamento de banco | **Nhost Dashboard + Hasura** | [Nhost](https://app.nhost.io/), [migrações](../nhost/migrations/) | PostgreSQL e SQL existentes; visualização interna requer conta Nhost |
| 5 | Testes de interface | **Selenium + Chrome WebDriver** | [Testes Python](../entregavel6/tests/test_browser.py), [workflow](../.github/workflows/selenium.yml) | CI executa casos de navegação e formulário; ver relatório atual |
| 6 | Execução e servidores web | **GitHub Pages + Nhost Functions** | [Jogo](https://ruan-levi.github.io/Entregavel5-Ambientes/), [apresentação](https://ruan-levi.github.io/Entregavel5-Ambientes/entregavel6/) | Publicação HTTPS por GitHub Actions; verificar execução do workflow |

O GitHub Issues foi escolhido como **ambiente real de gestão de trabalho**, em vez de afirmar uso de Trello, Jira ou ClickUp sem ter um quadro criado. A aplicação também utiliza Git/GitHub para versionamento, Vite para desenvolvimento e Vitest/`node:test` para testes de unidade.

## 4. Ambiente de gestão: GitHub Issues

Tarefas planejadas:
- [#4 · Gestão](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/4)
- [#5 · Design](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/5)
- [#6 · Desenvolvimento](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/6)
- [#7 · Banco](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/7)
- [#8 · Testes](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/8)
- [#9 · Hospedagem](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues/9)

Cada issue descreve objetivo, tarefas, evidências e pendências. Para uma demonstração completa, os integrantes devem **atribuir responsáveis** e marcar o que foi de fato concluído; não declarar etapas manuais como finalizadas antes da checagem.

## 5. Ambiente de design: Figma

Arquivo editável: https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO

O protótipo documenta três vistas:
1. **Portal**: marca, ação para iniciar jogo, navegação, ranking e modo duelo.
2. **Login**: modal do painel React, email, senha, abas de cadastro e login.
3. **Arquitetura**: frontend → backend → banco com os seis ambientes.

O Figma demonstra o planejamento de estrutura, hierarquia visual, componentes e fluxo de interface. Não confundir **protótipo editável** com teste do site em produção. Mais informações em [DESIGN_E6.md](DESIGN_E6.md).

## 6. Ambiente de desenvolvimento: Visual Studio Code

Workspace versionado em `.vscode/`:
- `extensions.json`: recomendações de ferramentas para código JS e Python;
- `settings.json`: formatação e arquivos gerados ignorados pelo editor;
- `tasks.json`: tarefas **instalar**, **dev**, **testar**, **compilar** e **Selenium**.

Para executar no VS Code:

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes
npm ci
cp .env.example .env
npm run dev
```

Com Node.js 22.12+ e npm, o Vite serve a página local. Pressione Ctrl+Shift+P → **Tasks: Run Task** para executar as tarefas configuradas. A configuração do workspace **não comprova** que alguém já abriu o VS Code no computador do integrante; essa etapa deve ser demonstrada em sala.

## 7. Ambiente de banco: Nhost + PostgreSQL

Projeto existente na região `sa-east-1`, subdomínio público `xbnokoslfakjqteiyvbu`. A Entregável 6 e a Entregável 5 usam **o mesmo serviço de Nhost** da aplicação original, não bancos separados. Os recursos atuais são:

- `auth.users`: contas, gerenciadas pelo Nhost Auth;
- `public.conquest_scores`: pontuações da jornada;
- `public.conquest_duels`: estado de sala e duelistas;
- `public.conquest_duel_leaderboard`: view de ranking calculado.

**Demonstração no Nhost:** entre em [app.nhost.io](https://app.nhost.io/), abra o projeto correto, acesse **Database** (tabelas e view), **Auth** (usuários) e **Functions** (duel). Mostre as colunas, chaves e índices, sem mostrar e-mails de pessoas reais, admin secrets ou tokens. Não reexecute as migrações sem verificar o estado atual. Consulte [NHOST.md](NHOST.md) e [NHOST_DUELOS.md](NHOST_DUELOS.md).

## 8. Ambiente de testes: Selenium e testes complementares

**Automação de navegador:** `entregavel6/tests/test_browser.py` executa via Selenium WebDriver e Chrome headless:
1. Verifica os seis cartões e os links;
2. Confere que o jogo 3D/portal permanece acessível;
3. Abre o React e digita letras `WASDERQ` no campo de e-mail;
4. Executa GET na Function REST de ranking e verifica retorno da API no navegador.

**Regressão:** `npm test` executa Vitest para as regras do jogo e `node:test` para operações de duelo e validação de requisições. O workflow `.github/workflows/selenium.yml` publica capturas de tela como **artefatos da execução** no GitHub Actions. **Uma falha no CI deve ser relatada como pendência, não escondida.**

Execute localmente (em dois terminais):

```bash
npm ci
npm run dev
```

```bash
python -m pip install -r entregavel6/requirements.txt
python -m unittest discover -s entregavel6/tests -p "test_*.py" -v
```

Requer Chrome/Chromedriver instalados ou resolvidos pelo Selenium Manager. Os testes que dependem da Function pública precisam de conexão com a internet.

## 9. Ambiente de execução e servidores

GitHub Actions executa `npm ci`, `npm test`, Vite build e publica `dist/` no GitHub Pages. A URL principal é `/Entregavel5-Ambientes/`; a página acadêmica fica em `/Entregavel5-Ambientes/entregavel6/`. O workflow faz uma consulta pública final à publicação.

O usuário pode acessar a API no painel de demonstração da Entregável 6, clicar em **Consultar API agora** e ver o resultado retornado pela Function Nhost. Esse botão **não escreve no banco**, apenas lê o ranking público validado pela API.

## 10. Status, limites e transparência

- **Concluído no código:** reutilização da aplicação, documentação, protótipo Figma, issues de gestão, configuração VS Code, tela da Entregável 6 e testes Selenium.
- **Verificar no pipeline:** execução Chrome real, teste de comunicação e publicação no Pages.
- **Ações que dependem do integrante:** abrir VS Code em seu computador, mostrar o dashboard privado do Nhost, atribuir tarefas da equipe e narrar os fluxos.
- **Não confundir:** o endpoint `GET /v1/duel` lê ranking, enquanto operações como criar, responder e cancelar são feitas com `POST /v1/duel`; são múltiplas operações sob uma rota, não CRUD REST genérico.
- **Privacidade:** usar credenciais fictícias para demonstrações e não expor senhas ou dados pessoais em capturas.

## 11. Materiais para a apresentação

- [Roteiro de 6 a 8 minutos](ROTEIRO_APRESENTACAO_E6.md)
- [Arquitetura detalhada](ARQUITETURA_E6.md)
- [Plano de testes e evidências](PLANO_TESTES_E6.md)
- [Figma e critérios de interface](DESIGN_E6.md)
- [Entregável 5 (base preservada)](ENTREGAVEL5.md)

**Página E6 em desenvolvimento:** com Vite, abra `http://127.0.0.1:5173/entregavel6/index.html`. A URL publicada mantém o endereço limpo `https://ruan-levi.github.io/Entregavel5-Ambientes/entregavel6/`.
