# CantinaFlow — Entrega Final | Ambientes de Desenvolvimento de Software

Sistema acadêmico de gestão de cantina / pequeno supermercado. Substitui o antigo AlgoLab da Entregável 5.

## Requisitos da atividade

- Equipe de 2 pessoas: mínimo de 4 transações. Implementadas: cadastro de produtos, atualização de preços, movimentação de estoque, cadastro de clientes, venda à vista, venda a prazo, baixa de pagamento, consultas e relatórios.
- Frontend: HTML, CSS, JavaScript e **React 18**.
- Backend: **Node.js** com rotas HTTP REST (sem framework externo).
- Controle de acesso: autenticação por usuário/senha, sessões com token aleatório e autorização por papéis `admin` e `operador`.
- SGBD: **SQLite**, com integridade referencial, transações ACID e histórico de preços.
- Controle de versão: GitHub.
- Testes formais: `node:test`, executados no GitHub Actions.

## Execução local

Requer **Node.js 22.13+**. Não precisa instalar pacotes npm.

```bash
npm test
npm start
```

Abra **http://localhost:3000**. O navegador precisa acessar `esm.sh` para carregar o React; é necessária conexão à internet.

**Acesso de demonstração local:** `admin` / `TrocarSenha123!` ou `operador` / `Operador123!`. Em produção, defina `NODE_ENV=production`, `ADMIN_PASSWORD` e `OPERATOR_PASSWORD` **antes do primeiro início**; nunca publique senhas reais no repositório. Altere as senhas de desenvolvimento antes de usar dados reais.

O banco é criado automaticamente em `cantinaflow.sqlite` e não deve ser versionado. É possível alterar o caminho com `DB_FILE`. O servidor escuta `PORT=3000` por padrão. Para permitir um frontend hospedado em outro domínio, defina `CORS_ORIGIN` com a origem exata, por exemplo `http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com`.

## Arquitetura

`public/` — frontend React e interface responsiva; `server/core.js` — serviços, validações, autenticação e SQL; `server/index.js` — servidor HTTP, roteamento REST e CORS; `tests/` — testes de integração de serviços; `.github/workflows/ci.yml` — CI.

## Serviços REST

`POST /api/login`, `POST /api/logout`, `GET /api/me`;
`GET/POST /api/products`, `PATCH /api/products/:id`, `POST /api/products/:id/stock`;
`GET/POST /api/customers`;
`GET/POST /api/sales`, `GET /api/sales/:id`;
`GET /api/receivables`, `POST /api/receivables/:id/pay`;
`GET /api/dashboard`;
`GET /api/reports/top-customers?from=YYYY-MM-DD&to=YYYY-MM-DD&limit=20`;
`GET /api/reports/customer-history?customer_id=1&from=YYYY-MM-DD&to=YYYY-MM-DD`;
`GET /api/reports/price-history`, `GET /api/reports/invoices?from=YYYY-MM-DD&to=YYYY-MM-DD`, `GET /api/reports/sales-by-customer`.

As rotas protegidas recebem `Authorization: Bearer TOKEN`. Operações administrativas de produtos e relatórios exigem perfil `admin`. Valores monetários são armazenados em **centavos inteiros** para evitar erros de arredondamento. As vendas baixam estoque atomicamente; falhas revertem a transação.

## Limitações importantes

O sistema emite **comprovantes internos de venda**, não NF-e/NFC-e com validade fiscal. Emissão fiscal verdadeira exige integração com a SEFAZ, certificado digital e regras tributárias; não faz parte desta implementação acadêmica.

**Hospedagem AWS EC2:** esta versão executa Node.js, a interface React e o banco SQLite na mesma instância. O endpoint `/api/health` permite acompanhar o servidor. Para a demonstração em HTTP, use apenas credenciais de teste e dados fictícios; antes do uso real, configure HTTPS, backups, proteção contra tentativas de login e supervisão operacional. Instâncias EC2, volumes e IPv4 público podem consumir créditos e/ou gerar cobranças conforme o plano.

## Divisão sugerida da equipe

Integrante 1: cadastro de produtos, movimentação de estoque e atualização de preços. Integrante 2: cadastro de clientes, registro de vendas e baixa de pagamentos. Ambos: testes, autenticação e apresentação. Identifique os nomes reais no documento de entrega.

## Cronograma e artefatos

- 27/10: equipe, sistema e lista de funcionalidades — `docs/PLANO.md`.
- 03/11: telas e eventos — interface `public/` e `docs/PLANO.md`.
- 10/11: estrutura de banco e especificação de E/S — `server/core.js` e `docs/PLANO.md`.
- 17/11: serviços e frontend — `server/`, `public/` e testes.

**Observação:** o enunciado permite escolher qualquer sistema; as funcionalidades de nota fiscal, promissória e relatórios do sistema de vendas apresentado são uma sugestão para quem não escolher outro sistema. O CantinaFlow é uma escolha própria, e a abrangência deve ser combinada com o professor.

## AWS EC2

O provisionamento de demonstração utiliza uma instância Free Tier elegível (t3.micro), Amazon Linux 2023 e um volume EBS gp3 de 8 GiB. O `scripts/bootstrap-ec2.sh` prepara a instância, instala Node.js 22, clona este repositório e inicia o sistema como serviço `systemd`. O arquivo de credenciais `/etc/cantinaflow.env` é criado durante a inicialização e **nunca** deve ser incluído no Git. O frontend e a API compartilham a mesma origem. Acesso de teste por HTTP não é apropriado para dados reais.
