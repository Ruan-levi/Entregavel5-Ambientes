# Plano de trabalho — CantinaFlow

## Objetivo
Aplicação web para administrar vendas e estoque de uma cantina universitária, com autenticação, registros persistentes e relatórios.

## Equipe
Dois integrantes (preencher nomes). Cada integrante responde por pelo menos duas transações.

## Transações
1. Cadastrar produto (administrador). Entrada: nome, SKU, unidade, preço em centavos e estoque. Saída: produto cadastrado.
2. Atualizar preço (administrador). Entrada: ID e novo preço. Saída: produto e registro no histórico.
3. Movimentar estoque (administrador). Entrada: ID, quantidade positiva/negativa e motivo. Saída: estoque atualizado.
4. Cadastrar cliente (usuário autenticado). Entrada: nome, documento, contatos e localização. Saída: cliente.
5. Registrar venda (usuário autenticado). Entrada: cliente opcional, itens, quantidades, forma de pagamento e vencimento. Saída: número e total da venda; estoque baixado atomicamente.
6. Baixar pagamento (usuário autenticado). Entrada: ID do título. Saída: título quitado.

## Telas e eventos
- Login: preencher credenciais, entrar.
- Dashboard: visualizar indicadores, vendas recentes e estoque baixo.
- Produtos: listar, cadastrar, alterar preço, movimentar estoque.
- Clientes: listar e cadastrar.
- Nova venda: escolher cliente, itens e forma de pagamento; finalizar.
- A receber: listar títulos e dar baixa.
- Relatórios: maiores clientes, histórico de preços e vendas agrupadas por cliente.
- Configuração: informar URL da API para frontend estático.

## Banco de dados
Tabelas: `users`, `sessions`, `products`, `price_history`, `customers`, `sales`, `sale_items`, `receivables`, `stock_movements`. Relacionamentos e restrições declarados em `server/core.js`.

## Requisitos não funcionais
React, HTML/CSS/JS, Node.js, REST, SQLite, autenticação/autorização, GitHub, testes automatizados e CI.

## Segurança e implantação
Senha derivada por scrypt com salt; token aleatório persistido como hash; sessão expira em oito horas; autorização no servidor; SQL parametrizado. A hospedagem S3 é somente frontend, e o backend deve ficar em ambiente com armazenamento persistente e HTTPS.
