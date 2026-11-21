# Publicação na AWS — Amazon S3 (região us-east-2)

> **Situação atual:** bucket criado, website S3 habilitado, política de leitura pública aplicada e cinco arquivos publicados. **A abertura externa precisa ser confirmada em um navegador comum** antes de enviar a URL ao professor.

**URL do site:** http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com/

**Bucket:** `ruan-levi-entregavel5-algolab-645822828419` · **Região:** `us-east-2`.

## Abordagem escolhida

Para esta entrega, o site pode funcionar **sem servidor e sem banco**, somente com HTML, CSS e JavaScript. Assim, pode ser hospedado no Amazon S3 como site estático. O site funciona em um endereço `http://<bucket>.s3-website.us-east-2.amazonaws.com` fornecido pela AWS.

**Atenção:** o endpoint nativo de website do S3 é apenas HTTP. Para HTTPS, usar outra arquitetura (por exemplo, CloudFront com bucket privado), após avaliar configurações e cobranças.

## Verificações realizadas

1. Conta AWS com plano `FREE`, status `ACTIVE` e créditos gratuitos disponíveis antes da criação.
2. Bucket S3 criado na região `us-east-2` (Ohio).
3. Hospedagem de site estático habilitada, documento inicial `index.html`.
4. Política pública limitada à leitura (`s3:GetObject`) dos objetos do bucket; sem permissão pública de escrita.
5. Os arquivos `index.html`, `assets/css/styles.css`, `assets/js/app.js`, `assets/js/algoritmos.bundle.js` e `assets/favicon.svg` estão presentes no S3.
6. **Pendente:** confirmar abertura da URL pública em um navegador comum.

## Configuração técnica executada

1. Criar o bucket S3 em `us-east-2`.
2. Ativar **Static website hosting**, documento inicial `index.html`.
3. Configurar acesso público **somente de leitura** para os objetos do site. Isso requer ajustar o bloqueio de acesso público ao nível do bucket e anexar política restrita a `s3:GetObject` para o prefixo do bucket. Não tornar o bucket gravável publicamente.
4. Enviar `index.html` e a pasta `assets/` após executar `npm run build`.
5. Abrir o **website endpoint** exibido nas propriedades do bucket, testar Número Primo e Calculadora.
6. Copiar a URL ao início do `README.md` (concluído) e **testar o acesso externo** antes de enviar na atividade do AVA.

## Automatização opcional com GitHub Actions

O arquivo `.github/workflows/deploy-aws.yml` está preparado, mas **não está ativo automaticamente**; somente `workflow_dispatch` pode executá-lo.

Para utilizar sem criar chaves permanentes:

1. Configurar um provedor OIDC do GitHub no AWS IAM (`https://token.actions.githubusercontent.com`).
2. Criar uma IAM Role com política de confiança restrita ao repositório `Ruan-levi/Entregavel5-Ambientes` e ao ambiente `production`.
3. Conceder à Role permissões mínimas para publicar objetos no bucket alvo: `s3:ListBucket`, `s3:PutObject`, `s3:DeleteObject`.
4. Em GitHub → repositório → Settings → Environments, criar o ambiente `production` e adicionar o segredo `AWS_ROLE_TO_ASSUME` com o ARN da Role; adicionar a variável `AWS_S3_BUCKET` com o nome do bucket.
5. Abrir Actions → **Publicar site na AWS S3** → Run workflow.

## Fontes oficiais

- [Tutorial de site estático no Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)
- [Preços do Amazon S3](https://aws.amazon.com/pt/s3/pricing/)
- [GitHub Actions e OIDC para AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
