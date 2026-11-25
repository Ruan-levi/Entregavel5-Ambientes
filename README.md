# CONQUEST — Entregável 6 | Aplicação Full Stack independente

**Disciplina: Ambientes de Desenvolvimento de Software — UNIFOR**

Esta é a **sexta entrega**, preparada como projeto próprio, que **reutiliza o CONQUEST da Entregável 5** (motor 3D Babylon.js, interface React, autenticação Nhost, API REST de duelo e PostgreSQL). Ela não deve substituir os arquivos da Entregável 5 e não modifica o CONQUEST Nuvem.

## Separação dos projetos

| Entrega | Repositório | Site |
|---|---|---|
| Entregável 5 (original preservado) | [Entregavel5-Ambientes](https://github.com/Ruan-levi/Entregavel5-Ambientes) | [Jogo E5](https://ruan-levi.github.io/Entregavel5-Ambientes/) |
| Entregável 6 (projeto próprio) | **Entregavel6-Ambientes — a criar** | **https://ruan-levi.github.io/Entregavel6-Ambientes/** — previsto, ainda não publicado |

O código da Entregável 6 está temporariamente **preparado para transferência** na branch `entregavel6/fullstack-independente` do repositório E5; quando for criado o repositório novo, será publicado separadamente. Não apresente o link novo como ativo antes de completar a transferência.

## Seis ambientes da atividade

| Categoria | Ambiente demonstrado | Evidência |
|---|---|---|
| 1. Gestão de tarefas | GitHub Issues | [Plano da equipe](docs/GESTAO_E6.md) e quadro a criar no repositório E6 |
| 2. UI/UX | Figma | [Protótipo E6](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO) |
| 3. Desenvolvimento / IDE | Visual Studio Code | Configurações `.vscode/`, scripts npm |
| 4. Banco de dados | Nhost / Hasura / PostgreSQL | `nhost/migrations/`, `src/services/nhost.js` |
| 5. Testes | Selenium / Chrome, Vitest, Node | `entregavel6/tests/`, `tests/`, `.github/workflows/selenium.yml` |
| 6. Execução e servidor | GitHub Pages + Nhost Functions | `.github/workflows/pages.yml`, `functions/duel.js` |

## Arquitetura full stack

```text
Entregável 6 — GitHub Pages (jogo Babylon.js + React)
                   |
                  HTTPS
                   |
            Nhost Auth / JWT
            Function REST Node.js
            Hasura / GraphQL
                   |
                PostgreSQL
```

A integração Nhost é compartilhada intencionalmente com a Entregável 5. **Duas aplicações independentes podem acessar o mesmo serviço de backend**, sem estarem hospedadas na mesma máquina virtual. O GitHub Pages entrega somente o frontend compilado; as Functions e o banco executam no Nhost.

## Organização do código

```text
├── index.html                      # Portal e jogo 3D (base E5 reutilizada)
├── src/main.js                     # Interações, teclado e progressão
├── src/game/                      # Babylon.js e perguntas matemáticas
├── src/ui/entregavel5.js           # Painel React reaproveitado do E5
├── src/services/nhost.js           # Auth, GraphQL e Function REST
├── functions/duel.js               # Backend Node.js da API de duelos
├── nhost/migrations/               # Estrutura PostgreSQL
├── public/entregavel6/index.html   # Página demonstrativa própria do E6
├── entregavel6/tests/              # Testes Selenium da sexta entrega
├── tests/                          # Testes unitários e backend
├── .vscode/                        # Workspace do ambiente de desenvolvimento
├── docs/                           # Requisitos, arquitetura, roteiro e evidências
├── .github/workflows/pages.yml     # Publicação independente do E6
└── .github/workflows/selenium.yml  # Testes de navegador do E6
```

## Rodar e testar

Node.js 22.12+, npm, Python e Chrome:

```bash
npm ci
cp .env.example .env
npm test
npm run dev
```

Acesse `http://localhost:5173/` para jogar e `http://localhost:5173/entregavel6/index.html` para apresentar os seis ambientes.

Para os testes em navegador:

```bash
python -m pip install -r entregavel6/requirements.txt
python -m unittest discover -s entregavel6/tests -p 'test_*.py' -v
```

## Criar o repositório e publicar separadamente

1. Crie o repositório público **`Entregavel6-Ambientes`** no GitHub, vazio, **sem gerar README**.
2. No terminal, execute:

```bash
git clone --branch entregavel6/fullstack-independente --single-branch https://github.com/Ruan-levi/Entregavel5-Ambientes.git Entregavel6-Ambientes
cd Entregavel6-Ambientes
git remote set-url origin https://github.com/Ruan-levi/Entregavel6-Ambientes.git
git push -u origin HEAD:main
```

3. No **novo** repositório, abra **Settings → Pages → Build and deployment → Source: GitHub Actions**. A pipeline exclusiva do E6 compila com `/Entregavel6-Ambientes/`, executa testes e publica o jogo na raiz e o portal de seis ambientes em `/entregavel6/`.
4. Confira as GitHub Actions e crie as Issues próprias da E6 conforme [GESTAO_E6.md](docs/GESTAO_E6.md).

A versão na branch de preparação é para **transferência**, não para mesclar à `main` da Entregável 5. O Git guarda o histórico de reaproveitamento.

## Material de apresentação

- [Matriz dos seis ambientes](docs/ENTREGAVEL6.md)
- [Roteiro de apresentação](docs/ROTEIRO_APRESENTACAO_E6.md)
- [Arquitetura](docs/ARQUITETURA_E6.md)
- [Plano de testes](docs/PLANO_TESTES_E6.md)
- [Protótipo e UI/UX](docs/DESIGN_E6.md)
- [Gestão e planejamento](docs/GESTAO_E6.md)

**Limites:** a integração Nhost usa o mesmo backend e dados do E5. Demonstrar acesso privado ao banco requer entrar no painel Nhost, e realizar cadastro com e-mail ou duelo entre duas pessoas ainda precisa de validação manual.
