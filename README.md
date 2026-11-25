# ⚔️ CONQUEST — Entregáveis 5 e 6 | GitHub Pages + Nhost

**Ambientes de Desenvolvimento de Software · UNIFOR · Jogo 3D educacional**

## Entregável 6 — Full Stack (nova etapa)

**[📚 ABRIR A APRESENTAÇÃO DO ENTREGÁVEL 6](https://ruan-levi.github.io/Entregavel5-Ambientes/entregavel6/)** · [Matriz dos seis ambientes](docs/ENTREGAVEL6.md) · [Roteiro de apresentação](docs/ROTEIRO_APRESENTACAO_E6.md) · [Protótipo no Figma](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) · [Quadro de atividades](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues) · [Testes Selenium](.github/workflows/selenium.yml)

A **Entregável 6 reaproveita a aplicação full stack da Entregável 5**, sem remover seu jogo ou mudar o domínio principal: o ambiente de entrega, o protótipo Figma, o workspace do VS Code, as tarefas GitHub Issues e os testes Selenium são adicionados como arquivos próprios. A nova apresentação é servida pelo **caminho `/entregavel6/`** do mesmo GitHub Pages. Consulte os documentos específicos para as seis ferramentas e as evidências de execução.

---

[**🎮 Jogar a Entregável 5**](https://ruan-levi.github.io/Entregavel5-Ambientes/) · [**GitHub Actions**](https://github.com/Ruan-levi/Entregavel5-Ambientes/actions) · [**Painel Nhost**](https://app.nhost.io/) · [**Conquest Nuvem original**](https://github.com/Ruan-levi/Conquest-nuvem)

Esta é uma **cópia independente do jogo CONQUEST Nuvem**, reutilizada e adaptada à Entregável 5. O código 3D original, o frontend, as interações, a autenticação, os duelos, o ranking e as integrações Nhost foram copiados do commit [ea69ceec](https://github.com/Ruan-levi/Conquest-nuvem/commit/ea69ceec1a95b2d5f768bbcd3cef2e81c8339674). **Nenhum arquivo do CONQUEST Nuvem foi alterado.** Foi acrescentado um painel acadêmico React, testes de teclado e um workflow de GitHub Pages próprio.

A versão AWS/SQLite anterior desta disciplina foi substituída na branch `main`, mas permanece recuperável no histórico, até o commit [35d2a34f](https://github.com/Ruan-levi/Entregavel5-Ambientes/commit/35d2a34fcaae24324ec0b802d3b5b21a8aec0bd5). A instância EC2 antiga não é a hospedagem deste novo site.

## Tecnologias reais

| Camada | Tecnologia | Arquivos |
|---|---|---|
| Mundo e interações 3D | JavaScript, Babylon.js / WebGL | `src/main.js`, `src/game/` |
| Página e interface | HTML5 e CSS3 | `index.html`, `src/style.css` |
| Painel da atividade | React 18 | `src/ui/entregavel5.js`, `src/ui/entregavel5.css` |
| Cadastro e login | Nhost Auth | `src/services/nhost.js` |
| Banco e histórico | PostgreSQL + GraphQL (Nhost) | `nhost/migrations/001_conquest_scores.sql` |
| API REST/Node.js | Nhost Functions, JWT e lógica de duelo | `functions/duel.js` |
| Ranking / realtime | Function REST, Hasura, WebSocket | `functions/duel.js`, `nhost/migrations/002_conquest_duels.sql` |
| Storage privado | Nhost Storage | `src/services/nhost.js` |
| Integração e deploy | Vite, npm, GitHub Actions, GitHub Pages | `.github/workflows/pages.yml` |

**O React é um painel complementar; o jogo em si usa Babylon.js.** O GitHub Pages publica somente arquivos estáticos, e o backend da aplicação executa no Nhost, não no GitHub. A Function de duelo utiliza métodos `GET` (ranking) e `POST` (criação, entrada, status, resposta, cancelamento). O histórico pessoal da jornada utiliza GraphQL.

## Estrutura do projeto para a apresentação

```text
Entregavel5-Ambientes/
├── index.html                 # Portal, HUD e canvas 3D
├── src/
│   ├── main.js                # Entrada do jogo e controles
│   ├── style.css              # Visual do jogo
│   ├── game/                  # Cenas, questões, movimento e batalhas
│   ├── ui/
│   │   ├── duel.js            # Duelo de dois jogadores
│   │   ├── entregavel5.js     # React: login, cadastro, ranking e histórico
│   │   └── entregavel5.css
│   └── services/nhost.js      # Auth, GraphQL, REST, Storage e Realtime
├── functions/
│   ├── duel.js                # Backend REST que valida duelo e pontuações
│   └── _shared/               # Questões validadas pelo backend
├── nhost/migrations/          # SQL PostgreSQL da atividade
├── tests/                     # Testes do jogo, Nhost e teclado
├── scripts/                   # Verificação de build e site publicado
├── docs/                      # Requisitos, Nhost, arquitetura e apresentação
├── package.json
├── vite.config.js
└── .github/workflows/pages.yml  # CI/CD do novo Pages
```

## Integração Nhost compartilhada pelos dois repositórios

A Entregável 5 utiliza o **mesmo projeto Nhost** da aplicação original:

| Valor público | Configuração |
|---|---|
| `VITE_NHOST_SUBDOMAIN` | `xbnokoslfakjqteiyvbu` |
| `VITE_NHOST_REGION` | `sa-east-1` |
| Nhost Dashboard | https://app.nhost.io/ |
| Projeto original | https://ruan-levi.github.io/Conquest-nuvem/ |
| Entregável 5 | https://ruan-levi.github.io/Entregavel5-Ambientes/ |

O pipeline já contém esses valores **públicos** como padrão e permite substituí-los pelas GitHub Actions Variables `NHOST_SUBDOMAIN` e `NHOST_REGION`. Não versionar `NHOST_ADMIN_SECRET` ou outros segredos em `VITE_*`, JavaScript ou HTML.

**Conexão à mesma base de dados não é o mesmo que vincular os dois repositórios ao deploy do Nhost.** As Functions e migrações continuam dependentes do projeto Nhost já existente, possivelmente conectado apenas ao repositório original. Para alterar os vínculos de implantação, use o dashboard Nhost e confirme a função `duel` ativa. Não execute de novo migrações já aplicadas.

O código da Function permite os dois sites, pois ambos têm a origem `https://ruan-levi.github.io`; no Auth do Nhost, confirme os URLs de redirecionamento necessários para as duas aplicações.

## Como demonstrar

1. Abra [CONQUEST Entregável 5](https://ruan-levi.github.io/Entregavel5-Ambientes/), inicie a jornada e mostre os recursos 3D.
2. Clique em **Painel React · Nhost** e mostre o formulário de cadastro/login e as consultas de histórico e ranking do Nhost.
3. Clique em **Minha conta** para mostrar integração original Auth/GraphQL/Storage.
4. Abra **Duelo online** para demonstrar o serviço REST e a correção no backend, se a Function estiver ativa.
5. Abra [GitHub Actions](https://github.com/Ruan-levi/Entregavel5-Ambientes/actions) para demonstrar o ciclo automático de teste, compilação e publicação.
6. Percorra o [roteiro dos códigos](docs/ROTEIRO_DO_CODIGO.md).

## Executar localmente

Node.js **22.12+** e npm:

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes
npm ci
npm test
cp .env.example .env
npm run dev
```

Acesse a URL local mostrada pelo Vite. Os dados Nhost públicos estão no `.env.example`; copiar para `.env` ativa a configuração em desenvolvimento. O domínio `localhost:5173` já é aceito na Function de duelo.

## Publicar pelo GitHub Pages

O pipeline `.github/workflows/pages.yml` compila com o caminho `/Entregavel5-Ambientes/`, roda testes e valida o site publicado. Para eliminar a concorrência do Jekyll, abra [Settings → Pages](https://github.com/Ruan-levi/Entregavel5-Ambientes/settings/pages) e selecione **Build and deployment → Source: GitHub Actions**.

Confira as instruções do [Nhost Auth, banco, Storage e realtime](docs/NHOST.md) e do [duelo + REST](docs/NHOST_DUELOS.md).

**Limite acadêmico:** o backend REST atual da Function possui um endpoint `GET` e um endpoint `POST` com diferentes operações de duelo. Caso o professor exija **quatro rotas REST independentes** ou CRUD específico por integrante, ainda será necessário implementar essas rotas. O jogo original completo foi priorizado na cópia e não se deve declarar atendimento a um requisito não demonstrado. O ranking competitivo é calculado no backend; a pontuação da campanha local continua demonstrativa.
