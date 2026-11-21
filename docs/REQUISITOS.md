# Entregável 5 — Conferência dos requisitos

## Enunciado recebido

1. Criar conta em plataforma de nuvem (OCI, AWS, IBM Cloud ou Microsoft Azure).
2. Selecionar uma aplicação web do bloco de tutorial.
3. Publicar a URL da aplicação funcionando na plataforma escolhida.

## Correspondência com o projeto

| Requisito | Solução adotada | Situação |
| --- | --- | --- |
| Conta em nuvem | AWS — conta conectada e identidade conferida; região de trabalho `us-east-2` | Verificado |
| Aplicação web | AlgoLab: algoritmos dos Entregáveis 1/2/4 + calculadora do Entregável 3 | Desenvolvido |
| URL na nuvem | [Site estático no Amazon S3](http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com/) | Bucket, arquivos e acesso público configurados; teste externo em navegador comum pendente |

## Como cada entregável contribuiu

| Entregável | Repositório | Aproveitamento na Entregável 5 |
| --- | --- | --- |
| 1 | [Entregavel1-JavaScript](https://github.com/Ruan-levi/Entregavel1-JavaScript) | Seis problemas de lógica originais |
| 2 | [Entregavel-2-Ambientes](https://github.com/Ruan-levi/Entregavel-2-Ambientes) | Modelo de execução de algoritmos no navegador |
| 3 | [Entregavel3-Ambientes](https://github.com/Ruan-levi/Entregavel3-Ambientes) | Calculadora e as quatro operações, estudadas com Express/POST |
| 4 | [Entregavel4-Ambientes](https://github.com/Ruan-levi/Entregavel4-Ambientes) | Módulos JavaScript validados, código limpo e testes |
| 5 | [Entregavel5-Ambientes](https://github.com/Ruan-levi/Entregavel5-Ambientes) | Interface unificada, testes e documentação de publicação AWS |

> **Importante:** esta versão de demonstração é um site estático. O servidor Express do Entregável 3 permanece no repositório original para consulta. A calculadora publicada executa as mesmas quatro operações no navegador; o S3 não executa Node.js/Express. Nenhum backend ou banco de dados é necessário para o enunciado apresentado.

## Evidências para apresentar

- Abrir a **[URL da AWS](http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com/)** e confirmar o acesso externo antes de enviar a atividade.
- Demonstrar Número Primo, Fibonacci, QuickSort e Calculadora.
- Mostrar os arquivos de `src/` e os testes em `tests/`.
- Abrir o workflow de testes em `.github/workflows/ci.yml`.
- Explicar a infraestrutura escolhida e a relação com as atividades 1 a 4.
