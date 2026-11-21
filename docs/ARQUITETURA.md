# Arquitetura do AlgoLab

## Visão geral

```text
Visitante (navegador)
  └─ URL de site estático AWS S3 (após deploy)
      ├─ index.html
      ├─ assets/css/styles.css
      ├─ assets/js/app.js
      └─ assets/js/algoritmos.bundle.js
                 ↑ gerado a partir de src/algoritmos

Desenvolvimento:
  src/algoritmos/*.js + src/validacoes.js
          ├─ npm test (Node.js, testes de unidade)
          └─ npm run build (scripts/build.mjs)
                             └─ bundle para navegador
```

## Decisões

- **Sem banco de dados:** o exercício exige uma aplicação web publicada, não autenticação ou armazenamento remoto.
- **Sem servidor permanente:** o navegador calcula localmente com as mesmas funções testadas no Node.js.
- **Sem pacotes npm externos:** Node.js 20+ já executa testes, compilação e servidor de desenvolvimento.
- **Histórico local:** até seis resultados ficam no `localStorage` do navegador. Não são enviados a serviços externos.
- **Erros tratados:** entradas inválidas e divisão por zero recebem mensagens claras.
- **AWS S3:** hospeda somente HTML, CSS, JavaScript e SVG. A URL de website do S3 usa HTTP; se futuramente for exigido HTTPS, avaliar CloudFront e custos.
- **GitHub Actions:** CI valida testes e bundle; deploy manual preparado com credenciais temporárias OIDC, exigindo configuração adicional de IAM e variáveis no GitHub.

## Segurança e custos

- Nenhuma chave AWS fica no código ou no repositório.
- Ao usar o endpoint de website do S3, o conteúdo estático precisa ser legível publicamente. Nunca adicionar documentos privados ao bucket do site.
- Não inserir dados pessoais ou credenciais nos arquivos publicados.
- Armazenamento, requisições e saída de dados da AWS **podem gerar cobranças**, dependendo do uso, plano e créditos da conta.
