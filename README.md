# ⚔️ CONQUEST — Entregável 5
**Ambientes de Desenvolvimento de Software · UNIFOR**

Este repositório é a **página de entrega e evidências acadêmicas** do jogo **CONQUEST — Vale dos Conjuntos**. Todo o código do jogo, backend, testes e documentação técnica fica centralizado em [**Conquest-nuvem**](https://github.com/Ruan-levi/Conquest-nuvem), evitando duplicar arquivos e perder o histórico do projeto original.

## 🎮 Links principais

| Recurso | Link |
|---|---|
| **JOGAR NA AWS** | **[http://3.149.254.9/](http://3.149.254.9/)** |
| **Código completo, linguagens e arquivos** | [Conquest-nuvem — README](https://github.com/Ruan-levi/Conquest-nuvem) |
| **Como o jogo foi desenvolvido** | [Arquitetura e exemplos de código](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/ARQUITETURA_E_CODIGO.md) |
| **Como instalar, criar e configurar a aplicação e a AWS** | [Guia de configuração e execução](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/CONFIGURACAO_E_EXECUCAO.md) |
| **Rotas, autenticação, banco e exemplos de código** | [API e banco SQLite](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/API_E_BANCO.md) |
| **Requisitos e transações da equipe** | [Matriz da Entregável 5](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/ENTREGAVEL5.md) |
| **Compilação e testes** | [GitHub Actions do CONQUEST](https://github.com/Ruan-levi/Conquest-nuvem/actions) |
| **Verificação da API AWS** | [GET /api/health](http://3.149.254.9/api/health) |

## 🎓 Objetivo

Reaproveitar o jogo educacional 3D já desenvolvido para demonstrar os requisitos técnicos da disciplina: frontend, backend, banco de dados, autenticação, versionamento, testes e publicação em plataforma de nuvem.

O jogador explora um cenário medieval, resolve desafios de Teoria dos Conjuntos e registra pontuações. A campanha é acessível sem login; **Progresso AWS** oferece conta autenticada, histórico e ranking.

## 🛠️ Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, **React 18**, Vite |
| Motor gráfico | **Babylon.js / WebGL** |
| Backend | **Node.js 22**, HTTP nativo e rotas **REST** |
| SGBD | **SQLite**, armazenado no EBS da EC2 |
| Autenticação | Login, hashing de senhas e sessão Bearer; autorização por papel |
| Hospedagem | **AWS EC2** `t3.micro`, Nginx e Amazon Linux 2023 |
| Versionamento / testes | Git, GitHub, Vitest, node:test e GitHub Actions |
| Serviços originais opcionais | Nhost, GraphQL, PostgreSQL, Storage e Realtime |

**Importante:** o jogo tem um módulo Unity/C# separado, mas **a aplicação web publicada não foi criada em Unity**. O Docker existente empacota o frontend estático original; o backend da Entregável 5 roda diretamente na EC2.

## 🗂️ Onde estão os códigos

- [`index.html`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/index.html): portal e canvas.
- [`src/main.js`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/src/main.js): eventos e interface da aventura.
- [`src/game/scene.js`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/src/game/scene.js): cenário 3D.
- [`src/game/logic.js`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/src/game/logic.js): movimento, batalhas, pontuação e estado.
- [`src/game/questions.js`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/src/game/questions.js): questões de matemática.
- [`src/ui/entregavel5.js`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/src/ui/entregavel5.js): painel React.
- [`server/index.mjs`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/server/index.mjs): servidor Node.js.
- [`server/service.mjs`](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/server/service.mjs): autenticação, autorização e SQLite.

## ▶️ Executar localmente

```bash
git clone https://github.com/Ruan-levi/Conquest-nuvem.git
cd Conquest-nuvem
npm ci
npm test
npm run build
```

Para executar o jogo completo em Linux/macOS:

```bash
mkdir -p data
CONQUEST_DB="$PWD/data/conquest.sqlite" CONQUEST_DIST="$PWD/dist" PORT=4000 node server/index.mjs
```

Abrir `http://127.0.0.1:4000/`. Há também modo frontend para desenvolvimento com `npm run dev`, mas sem API REST/SQLite integrada por padrão. Veja o [guia completo](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/CONFIGURACAO_E_EXECUCAO.md).

## ✅ Requisitos da atividade

- **Equipe de duas pessoas:** mínimo de duas transações por integrante; o projeto implementa cadastro, login, alteração de perfil, salvamento de pontuação, histórico e logout.
- **Frontend:** HTML/CSS/JS/React.
- **Backend:** Node.js e REST.
- **Controle de acesso:** autenticação e autorização.
- **Banco:** SQLite.
- **Controle de versão:** GitHub.
- **Testes formais:** Vitest, node:test e validações no GitHub Actions.
- **Nuvem:** AWS EC2, com URL pública.

Documentação completa das rotas, entradas e saídas no [Conquest-nuvem](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/ENTREGAVEL5.md).

## ☁️ Configuração da AWS e cuidados

A implantação usa EC2 `t3.micro`, região `us-east-2`, Nginx na porta pública 80, Node.js na porta local 4000 e SQLite em volume EBS. O IP público **pode mudar** após reinicialização da instância. Não há HTTPS configurado; use apenas **dados e senhas fictícios**. O uso de EC2/IPv4/EBS pode consumir créditos ou gerar custos.

**O workflow AWS verifica a aplicação publicada, mas não faz deploy automático na EC2.** Consulte o [guia de instalação, monitoramento e atualização](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/CONFIGURACAO_E_EXECUCAO.md).

### Histórico preservado

A aplicação anterior **CantinaFlow** foi substituída por CONQUEST. O código anterior permanece na branch [`backup-cantinaflow-2026`](../../tree/backup-cantinaflow-2026) e no histórico Git. O desenvolvimento do CONQUEST continua concentrado em `Conquest-nuvem`, sendo este repositório apenas a referência oficial da Entregável 5.
