# ⚔️ CONQUEST — Entregável 5 de Ambientes de Desenvolvimento de Software

**UNIFOR · Jogo 3D educacional · Código completo, documentação e publicação na AWS**

O **CONQUEST — Vale dos Conjuntos** é um jogo educativo de exploração e batalhas matemáticas sobre *Teoria dos Conjuntos*. O jogador conversa com Liora, coleta três cristais e enfrenta os guardiões e Cael. Nesta atividade, o projeto original foi reaproveitado e complementado com **React, uma API REST Node.js, autenticação, autorização e banco SQLite**.

### 🎮 Acessos rápidos

| O que abrir | Link |
|---|---|
| **Jogar na AWS (Entregável 5)** | **[http://3.149.254.9/](http://3.149.254.9/)** |
| **Código completo copiado neste repositório** | **[📂 `conquest/`](conquest/)** |
| Arquivo inicial do jogo | [`conquest/index.html`](conquest/index.html) |
| Código-fonte original e histórico de desenvolvimento | [`Ruan-levi/Conquest-nuvem`](https://github.com/Ruan-levi/Conquest-nuvem) |
| Verificar API REST/SQLite | [`/api/health`](http://3.149.254.9/api/health) |
| Testes e build deste repositório | [GitHub Actions](../../actions) |
| Matriz de requisitos da atividade | [`conquest/docs/ENTREGAVEL5.md`](conquest/docs/ENTREGAVEL5.md) |

> **Organização:** os **68 arquivos** do projeto original foram colocados **sem alteração de conteúdo** dentro de `conquest/`, mantendo suas pastas e nomes. Isso evita misturar a página acadêmica (`README.md` e `index.html` na raiz) com os arquivos executáveis. O projeto dentro de `conquest/` é completo e pode ser instalado independentemente. Inclui também a documentação antiga e o protótipo Unity, em pastas separadas.
>
> **Versão copiada do repositório original:** commit [`d9db276f`](https://github.com/Ruan-levi/Conquest-nuvem/commit/d9db276fbea6fdf44761171285d2da6b284997f1), em 23/11/2026. Essa é uma **cópia versionada**, não uma sincronização automática: futuras alterações no `Conquest-nuvem` precisarão ser reproduzidas aqui.

---

## 1. Objetivo e funcionalidades implementadas

- **Campanha 3D:** exploração livre, câmera móvel, corridas, missões, cristais, perguntas de união, interseção, complemento e diferença; vida, pontuação e tela de conclusão.
- **Área acadêmica React — “Progresso AWS”:** cadastro e login de jogadores, alteração de nome público, registro de resultados, histórico e classificação.
- **Backend Node.js:** rotas REST para autenticar, consultar, cadastrar e atualizar informações, com respostas JSON e códigos HTTP.
- **SQLite:** persistência de contas, hashes de sessão e pontuações.
- **Autorização:** perfis `jogador` e `admin`; uma conta comum não pode consultar a lista administrativa de jogadores.
- **Testes formais:** Vitest para o jogo, `node:test` para serviços e teste de ponta a ponta da API.
- **Recursos originais adicionais:** autenticação e duelos online Nhost, além de protótipo Unity **separado da aplicação web**.

A campanha 3D pode ser jogada **sem login**. Para salvar resultados no SQLite é necessário entrar na opção **Progresso AWS**.

## 2. Linguagens e tecnologias utilizadas

| Linguagem / ferramenta | Frontend ou backend? | Utilização real | Arquivos no repositório |
|---|---|---|---|
| **HTML5** | Frontend | Portal, botões, formulários, canvas de renderização 3D e HUD | [`index.html`](conquest/index.html) |
| **CSS3** | Frontend | Layout, animações de interface, cores, responsividade e painel de conta | [`style.css`](conquest/src/style.css), [`entregavel5.css`](conquest/src/ui/entregavel5.css) |
| **JavaScript (ES Modules)** | Frontend e backend | Regras, lógica, eventos, manipulação da interface, API e testes | [`src/main.js`](conquest/src/main.js), [`src/game/`](conquest/src/game/), [`server/`](conquest/server/) |
| **Babylon.js + WebGL** | Frontend | Cena 3D, terreno, câmera, iluminação, personagem, materiais e efeitos | [`scene.js`](conquest/src/game/scene.js), [`environment/`](conquest/src/game/environment/) |
| **React 18** | Frontend | Painel de contas e progresso, componentes, estado, eventos e solicitações REST | [`src/ui/entregavel5.js`](conquest/src/ui/entregavel5.js) |
| **Node.js 22** | Backend | Servidor HTTP, processamento de requisições, autenticação e rotas REST | [`server/index.mjs`](conquest/server/index.mjs) |
| **SQL + SQLite** | Backend / banco | Criação de tabelas, inserção e consulta de jogadores, tokens e resultados | [`server/service.mjs`](conquest/server/service.mjs) |
| **Vite / npm** | Ferramentas | Ambiente local, dependências e geração do frontend de produção | [`package.json`](conquest/package.json), [`vite.config.js`](conquest/vite.config.js) |
| **Vitest e node:test** | Testes | Testes de lógica de jogo, duelos e serviços REST/SQLite | [`tests/`](conquest/tests/) |
| **YAML / GitHub Actions** | Integração contínua | Executar testes e build, conferir a versão pública | [Workflow desta entrega](.github/workflows/ci.yml) |
| **Nhost / GraphQL / PostgreSQL** | Integração original adicional | Duelos entre contas e armazenamento externo, **independentes do SQLite AWS** | [`nhost.js`](conquest/src/services/nhost.js), [`functions/`](conquest/functions/) |
| **C# / Unity** | Protótipo separado | Protótipo de ambiente 3D não usado pelo site publicado | [`unity-remake/`](conquest/unity-remake/) |

**Esclarecimentos técnicos:** o backend é Node.js com **módulo `node:http` nativo**, não Express; o frontend 3D é **Babylon.js**, não Unity; o painel React carrega React 18 via CDN. O `Dockerfile` antigo gera uma versão **estática** do frontend, e não inclui automaticamente a API com SQLite.

## 3. Métodos e técnicas utilizados no frontend

### 3.1. Estrutura HTML + canvas

O arquivo [`conquest/index.html`](conquest/index.html) define o elemento `<canvas id="renderCanvas">`, onde a cena 3D aparece. O mesmo HTML fornece telas de missão, diálogos, indicadores de vida, menus, controles móveis e o botão para abrir o painel de progresso.

### 3.2. Renderização 3D com Babylon.js

O arquivo [`src/game/scene.js`](conquest/src/game/scene.js) usa os métodos `new B.Engine(...)`, `new B.Scene(...)`, `new B.FreeCamera(...)`, `new B.HemisphericLight(...)`, `new B.DirectionalLight(...)` e `B.MeshBuilder` para construir o mundo procedural. **Engine** desenha no canvas; **Scene** reúne os objetos; **Camera** define a visão; luzes e materiais dão aparência ao cenário.

```js
const engine = new B.Engine(canvas, true, {
  preserveDrawingBuffer: false, stencil: false, antialias: true
}, true);
const scene = new B.Scene(engine);
const camera = new B.FreeCamera("Câmera de exploração", v(0, 9, -17), scene);
```

### 3.3. Movimento, interações e batalhas

Em [`src/game/logic.js`](conquest/src/game/logic.js):

- `createGameState()` cria os dados iniciais da partida.
- `movementVector(keys, yaw)` converte teclas e direção da câmera em deslocamento; usa `Math.hypot` para não aumentar a velocidade na diagonal.
- `canInteract(state)` e `interact(state)` verificam proximidade e disparam conversas, cristais ou combates.
- `getBattleQuestion(state)` e `answerQuestion(state, index)` consultam as perguntas, conferem a resposta e atualizam vida, acertos e pontos.
- `makeResult(state)` prepara o resultado da partida.

As perguntas e alternativas estão em [`questions.js`](conquest/src/game/questions.js), e as coordenadas das missões em [`world-map.js`](conquest/src/game/world-map.js).

### 3.4. React, estado e integração com a API

Em [`src/ui/entregavel5.js`](conquest/src/ui/entregavel5.js), o painel usa `React.createElement`, `useState`, `useEffect` e `createRoot`:

- `useState` armazena dados da interface, como usuário autenticado, histórico e ranking.
- `useEffect` carrega informações e registra o ouvinte de eventos ao abrir o painel.
- `fetch('/api/...')` envia pedidos HTTP ao backend.
- `CustomEvent('conquest:finished')`, emitido pelo jogo, comunica ao painel que uma partida terminou e pode ter pontuação registrada.

```js
const React = window.React;
const { useEffect, useState } = React;
const { createRoot } = window.ReactDOM;
```

**Importante:** este é um painel React complementar; o motor do jogo e as telas principais continuam em JavaScript e Babylon.js.

## 4. Métodos e técnicas utilizados no backend

Os arquivos mais importantes são [`server/index.mjs`](conquest/server/index.mjs) e [`server/service.mjs`](conquest/server/service.mjs).

### 4.1. Servidor HTTP e REST

O Node.js usa `http.createServer(async (req, res) => {...})`. Para cada requisição, identifica a rota e o método (`GET`, `POST`, `PATCH`), lê o JSON recebido, identifica o token Bearer e executa `service.dispatch(method, path, body, token)`.

```js
const path = new URL(req.url, 'http://localhost').pathname;
const token = (req.headers.authorization || '').replace(/^Bearer /i, '');
const result = service.dispatch(req.method, path, body, token);
send(200, result);
```

Os métodos REST utilizados são **GET** (consulta), **POST** (cadastro, login, pontuação e logout) e **PATCH** (alteração do nome público). O servidor também entrega o frontend compilado em `dist/`.

### 4.2. SQLite e operações SQL

O serviço usa `new DatabaseSync(file)` do módulo nativo `node:sqlite`, `db.exec(...)` para criar tabelas e `db.prepare(sql).get/all/run(...)` para consultas e gravações com parâmetros.

```js
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(file);
db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');
```

| Tabela | Dados armazenados |
|---|---|
| `players` | ID, usuário, nome público, hash da senha, perfil e data |
| `access_tokens` | Hash do token, jogador vinculado e expiração |
| `scores` | Jogador, pontuação, acertos, resultado e data |

### 4.3. Autenticação, autorização e segurança

- **`scryptSync`** gera hashes de senhas com salt individual; o sistema não guarda a senha em texto puro.
- **`randomBytes(32)`** gera um token de sessão aleatório; somente o hash SHA-256 é guardado no banco.
- **`timingSafeEqual`** compara hashes de senha sem comparação ingênua de strings.
- A rota privada verifica `Authorization: Bearer <token>` e sessão válida.
- A rota `GET /api/admin/players` exige papel `admin`.
- A API valida entradas e usa códigos como **400**, **401**, **403**, **404** e **409**.

### 4.4. Rotas REST disponíveis

| Método | Rota | Finalidade | Autenticação |
|---|---|---|---|
| GET | `/api/health` | Verificar servidor e banco | Pública |
| POST | `/api/register` | Cadastrar jogador | Pública |
| POST | `/api/login` | Autenticar e criar sessão | Pública |
| GET | `/api/me` | Consultar perfil | Jogador |
| PATCH | `/api/me` | Atualizar nome público | Jogador |
| POST | `/api/scores` | Salvar resultado | Jogador |
| GET | `/api/scores` | Consultar histórico | Jogador |
| GET | `/api/ranking` | Consultar ranking | Pública |
| POST | `/api/logout` | Encerrar sessão | Jogador |
| GET | `/api/admin/players` | Listar jogadores | Administrador |

Documentação mais completa: [`conquest/docs/API_E_BANCO.md`](conquest/docs/API_E_BANCO.md).

## 5. Organização dos códigos (ordem de estudo)

```text
Entregavel5-Ambientes/
├── README.md                       ← explicação desta entrega
├── index.html                      ← página da entrega/link para AWS
├── .github/workflows/ci.yml        ← testes e build do código copiado
└── conquest/                       ← CÓDIGO COMPLETO DO JOGO
    ├── index.html                  ← portal e canvas
    ├── package.json                ← scripts npm e dependências
    ├── package-lock.json           ← versões utilizadas
    ├── vite.config.js              ← configuração do Vite
    ├── src/
    │   ├── main.js                 ← integração, eventos e tela da aventura
    │   ├── style.css               ← visual principal
    │   ├── game/
    │   │   ├── logic.js            ← regras, combate e movimentação
    │   │   ├── scene.js            ← construção do mundo 3D
    │   │   ├── questions.js        ← banco de perguntas
    │   │   ├── world-map.js        ← posição das missões
    │   │   ├── interactions.js     ← ações de exploração
    │   │   └── environment/        ← texturas e elementos do cenário
    │   ├── ui/
    │   │   ├── entregavel5.js      ← painel React
    │   │   ├── entregavel5.css     ← CSS do painel
    │   │   └── duel.js             ← duelo Nhost original
    │   └── services/nhost.js       ← integração externa original
    ├── server/
    │   ├── index.mjs               ← servidor HTTP e rotas REST
    │   └── service.mjs             ← SQLite, login e permissões
    ├── tests/                      ← testes de jogo, Nhost e REST
    ├── scripts/                    ← verificações técnicas
    ├── docs/                       ← documentação detalhada
    ├── functions/                  ← backend original Nhost
    ├── nhost/migrations/           ← SQL original Nhost/PostgreSQL
    ├── .github/workflows/          ← workflows originais (referência)
    ├── infra/oci/                 ← implantação Oracle (opcional/antiga)
    ├── Dockerfile                  ← build do frontend estático original
    ├── docker-compose.yml          ← stack OCI/Portainer original
    └── unity-remake/               ← protótipo C# SEPARADO
```

**Dica para explicar o projeto:** siga a ordem **`index.html` → `src/main.js` → `src/game/logic.js` → `src/game/scene.js` → `src/ui/entregavel5.js` → `server/index.mjs` → `server/service.mjs` → `tests/`**.

## 6. Criar, instalar e executar a aplicação

**Pré-requisitos:** Git, Node.js **22.12+**, npm e navegador com WebGL.

No terminal do VS Code:

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes/conquest
npm ci
npm test
npm run build
```

### Executar apenas o frontend (desenvolvimento)

```bash
npm run dev
```

Acesse a URL do Vite (normalmente `http://localhost:5173`). **Esse modo não inicializa a API SQLite**; para utilizar o painel de progresso com persistência, execute o servidor completo.

### Executar frontend + API + SQLite (Linux/macOS)

```bash
mkdir -p data
CONQUEST_DB="$PWD/data/conquest.sqlite" CONQUEST_DIST="$PWD/dist" PORT=4000 node server/index.mjs
```

Abra `http://127.0.0.1:4000/`.

### Executar frontend + API + SQLite (Windows PowerShell)

```powershell
New-Item -ItemType Directory -Force data
$env:CONQUEST_DB = (Join-Path (Get-Location) "data/conquest.sqlite")
$env:CONQUEST_DIST = (Join-Path (Get-Location) "dist")
$env:PORT = "4000"
node server/index.mjs
```

**Configurações da aplicação:** `CONQUEST_DB` define o arquivo SQLite; `CONQUEST_DIST` define onde estão os arquivos compilados; `PORT` é a porta interna do Node.js; `CONQUEST_ADMIN_USER` e `CONQUEST_ADMIN_PASSWORD` são opcionais para criar um administrador inicial. **Não publique senhas, tokens ou arquivos `.env` reais.** O exemplo de Nhost fica em [`conquest/.env.example`](conquest/.env.example).

## 7. Configuração e publicação na AWS

A Entregável 5 está publicada na **Amazon EC2**, região **`us-east-2` (Ohio)**, instância **`t3.micro`**:

1. O frontend é compilado pelo **Vite**, gerando `dist/`.
2. O **Node.js** executa a aplicação na porta interna `127.0.0.1:4000`.
3. O **Nginx** recebe os acessos públicos na porta 80 e faz proxy para o Node.js.
4. O **SQLite** guarda dados persistentes em volume **EBS** (`/var/lib/conquest/conquest.sqlite`).
5. O **GitHub Actions** roda testes e build; o deploy da versão AWS existente **não é automático**. A atualização do código da EC2 precisa ser executada separadamente.
6. A administração do servidor utiliza **AWS Systems Manager / Session Manager**.

**[Guia de configuração e atualização da AWS](conquest/docs/CONFIGURACAO_E_EXECUCAO.md)**.

> ⚠️ A aplicação AWS ainda usa **HTTP**, não HTTPS. Use exclusivamente dados fictícios; não entre com senhas pessoais. O IP público pode mudar se a instância for parada/iniciada. EC2, IPv4, EBS e tráfego podem consumir créditos ou gerar cobranças.

## 8. Requisitos da Entregável 5 e testes formais

| Requisito | Evidência no código copiado |
|---|---|
| Jogo/Aplicação | `conquest/src/game/` |
| HTML, CSS, JavaScript, React | `conquest/index.html`, `src/style.css`, `src/ui/entregavel5.js` |
| Backend Node.js e serviços REST | `conquest/server/index.mjs` e `server/service.mjs` |
| Autenticação e autorização | `conquest/server/service.mjs` |
| SGBD SQLite | `conquest/server/service.mjs` |
| Mínimo 4 transações para equipe de 2 pessoas | cadastro, login, atualização de perfil, salvar resultado, consultar histórico, logout |
| Testes formais dos serviços | `conquest/tests/entregavel5.node.mjs` |
| Controle de versão | GitHub e workflow CI na raiz |
| Publicação AWS | [URL do jogo](http://3.149.254.9/) e [API de saúde](http://3.149.254.9/api/health) |

O teste `scripts/live-check.mjs` efetua operações reais na API e **cria registros fictícios**, portanto utilize apenas em ambiente de demonstração. O ranking da jornada recebe pontos calculados no navegador e é **acadêmico**, não antifraude.

Para uma explicação guiada, consulte **[Roteiro para explorar os arquivos e explicar o funcionamento](docs/ROTEIRO_DO_CODIGO.md)**.

## 9. Diferenças entre o repositório de entrega e o original

- **`Conquest-nuvem`**: repositório original usado no servidor AWS, com histórico de desenvolvimento e pipeline original.
- **`Entregavel5-Ambientes/conquest/`**: cópia **completa e fiel** dos arquivos do CONQUEST na revisão indicada acima para avaliação, demonstração e estudo.
- **CI desta entrega**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa os testes e o build da pasta `conquest/`; **não publica na AWS** nem modifica a aplicação hospedada.
- **Código Unity**: copiado para preservar o acervo original, mas não é usado no site 3D Babylon.js.

---

**CONQUEST · Entregável 5 · Código, documentação, testes e URL AWS disponíveis para apresentação acadêmica.**
