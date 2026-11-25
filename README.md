# CONQUEST — Entregável 5 | AWS

**Ambientes de Desenvolvimento de Software · UNIFOR**

Este é o repositório da **Entregável 5**, separado do CONQUEST Nuvem (Nhost). Reutilizamos a campanha 3D e acrescentamos **painel React, API REST em Node.js e banco SQLite persistente na AWS EC2**.

**[JOGAR CONQUEST NA AWS](http://3.149.254.9/)** · [API e banco](http://3.149.254.9/api/health) · [Ranking](http://3.149.254.9/api/ranking) · [Testes no GitHub Actions](../../actions)

> A URL da demonstração utiliza HTTP, sem TLS. Use somente contas e senhas fictícias. O IP público não é reservado e pode mudar se a instância for interrompida.

## Estrutura objetiva para a apresentação

```text
Entregavel5-Ambientes/
├── README.md                     ← Apresentação, links e arquitetura
├── index.html                    ← Página simples com acesso ao jogo
├── docs/ROTEIRO_DO_CODIGO.md     ← Ordem dos arquivos para mostrar em aula
├── .github/workflows/ci.yml     ← Testes e compilação
└── conquest/                     ← Aplicação completa da Entregável 5
    ├── index.html                ← Portal, interface e canvas 3D
    ├── src/
    │   ├── main.js               ← Controle do jogo, missões e evento de conclusão
    │   ├── style.css             ← Visual da aventura
    │   ├── game/
    │   │   ├── logic.js          ← Vida, movimento, combate e pontuação
    │   │   ├── scene.js          ← Cenário 3D com Babylon.js
    │   │   ├── questions.js      ← Perguntas de conjuntos
    │   │   ├── world-map.js      ← Mapa e progressão
    │   │   ├── interactions.js   ← Objetos interativos
    │   │   └── environment/      ← Texturas e cenário
    │   └── ui/
    │       ├── entregavel5.js    ← React: cadastro, login, perfil e ranking
    │       └── entregavel5.css   ← Estilo do painel React
    ├── server/
    │   ├── index.mjs             ← API REST Node.js e entrega do frontend
    │   └── service.mjs           ← SQLite, sessões, senhas e regras
    ├── tests/                    ← Testes do jogo e da API
    ├── scripts/live-check.mjs    ← Teste completo da API (grava registros fictícios)
    ├── docs/                     ← Requisitos, arquitetura, banco e AWS
    ├── package.json              ← Dependências e comandos
    └── vite.config.js            ← Configuração Vite
```

**Foram retirados desta entrega** os protótipos Unity, o backend Nhost, scripts Oracle/Portainer, pipelines duplicadas e documentos antigos de outras disciplinas. O CONQUEST Nuvem original não foi alterado.

## Tecnologias

| Camada | Tecnologias | Demonstração |
|---|---|---|
| Frontend 3D | HTML, CSS, JavaScript e Babylon.js | Jogo, controles, cristais e batalhas |
| Painel web | React 18 | Cadastro, login, perfil, histórico e ranking |
| Backend | Node.js 22, HTTP e API REST | GET, POST e PATCH em `server/index.mjs` |
| Banco | SQLite no volume EBS da AWS | Tabelas `players`, `access_tokens`, `scores` |
| Hospedagem | Amazon EC2, Amazon Linux, Nginx | Jogo na URL pública |
| CI | GitHub Actions, Vitest e `node:test` | `npm test` e `npm run build` |

**Não usamos Express nesta versão:** as rotas são implementadas com `node:http`. O React é utilizado no painel; o cenário 3D permanece em Babylon.js.

## Fluxo de dados

```text
Navegador
  ├─ Babylon.js: jogo, missões e batalhas
  └─ React: Progresso AWS
           ↓ fetch('/api/...')
      Nginx (EC2, porta 80)
           ↓
      Node.js (porta interna 4000)
           ↓
      API REST e validação de sessão
           ↓
      SQLite em EBS (dados persistentes)
```

A autenticação própria da Entregável 5 usa usuário e senha; o backend armazena hashes de senha e de tokens, não credenciais em texto puro. O ranking reflete resultados de partidas salvas. O cálculo de pontos do jogo é feito no navegador: esta é uma demonstração acadêmica, não um sistema antifraude.

## Como demonstrar em aula

1. Abra [o jogo AWS](http://3.149.254.9/) e apresente a campanha 3D.
2. Clique em **Progresso AWS** para mostrar o painel React.
3. Entre com uma conta fictícia ou cadastre uma de teste.
4. Mostre perfil, histórico e ranking.
5. Abra [a API de saúde](http://3.149.254.9/api/health) e [o ranking público](http://3.149.254.9/api/ranking).
6. Percorra os arquivos na ordem indicada em [ROTEIRO_DO_CODIGO.md](docs/ROTEIRO_DO_CODIGO.md).
7. Mostre os [testes automáticos](../../actions) da Entregável 5.

## Testar e executar localmente

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes/conquest
npm ci
npm test
npm run build
```

Para executar **frontend e API juntos**, após compilar, use um banco SQLite persistente:

```bash
mkdir -p data
CONQUEST_DB="$PWD/data/conquest.sqlite" CONQUEST_DIST="$PWD/dist" PORT=4000 node server/index.mjs
```

Acesse `http://127.0.0.1:4000/`. A inicialização somente com `npm run dev` abre o frontend, mas não executa a API REST.

## Publicação AWS e atualizações

A EC2 da demonstração usa **us-east-2 (Ohio)**, Nginx na porta 80, Node.js em loopback e banco SQLite salvo no EBS. **A atualização do servidor AWS ainda é manual:** um push no GitHub dispara os testes, mas não implanta automaticamente o novo código na instância. As alterações de organização feitas aqui **não mudam a versão AWS publicada** até que uma implantação seja realizada.

Documentação: [requisitos](conquest/docs/ENTREGAVEL5.md) · [API e banco](conquest/docs/API_E_BANCO.md) · [arquitetura](conquest/docs/ARQUITETURA_E_CODIGO.md) · [execução AWS](conquest/docs/CONFIGURACAO_E_EXECUCAO.md).

**Observação de segurança:** esta aplicação está em HTTP; não use senhas pessoais nem dados sensíveis na apresentação.
