# Publicação na AWS — Amazon S3 (região us-east-2)

> **Situação:** aplicação preparada, mas publicação da infraestrutura depende de autorização para possíveis cobranças. Não afirmar ao professor que a URL AWS está ativa antes de validar o acesso externo.

## Abordagem escolhida

Para esta entrega, o site pode funcionar **sem servidor e sem banco**, somente com HTML, CSS e JavaScript. Assim, pode ser hospedado no Amazon S3 como site estático. O site funciona em um endereço `http://<bucket>.s3-website.us-east-2.amazonaws.com` fornecido pela AWS.

**Atenção:** o endpoint nativo de website do S3 é apenas HTTP. Para HTTPS, usar outra arquitetura (por exemplo, CloudFront com bucket privado), após avaliar configurações e cobranças.

## Antes de criar recursos

1. Confirmar orçamento e autorizar a criação de recursos S3 (armazenamento e acesso podem ser cobrados).
2. Escolher um nome único para o bucket; exemplo a confirmar: `ruan-levi-entregavel5-algolab-2026`.
3. Manter a região da conta em `us-east-2` (Ohio), utilizada nas consultas do projeto.

## Configuração técnica após autorização

1. Criar o bucket S3 em `us-east-2`.
2. Ativar **Static website hosting**, documento inicial `index.html`.
3. Configurar acesso público **somente de leitura** para os objetos do site. Isso requer ajustar o bloqueio de acesso público ao nível do bucket e anexar política restrita a `s3:GetObject` para o prefixo do bucket. Não tornar o bucket gravável publicamente.
4. Enviar `index.html` e a pasta `assets/` após executar `npm run build`.
5. Abrir o **website endpoint** exibido nas propriedades do bucket, testar Número Primo e Calculadora.
6. Copiar a URL confirmada ao início do `README.md` e enviar essa URL na atividade do AVA.

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
