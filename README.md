# AlgoLab — Entregável 5 | Ambientes de Desenvolvimento

**UNIFOR · HTML · CSS · JavaScript · Node.js · GitHub Actions · AWS**

## 🌐 Acessar o aplicativo na AWS

**[Abrir o AlgoLab — site publicado na AWS](http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com/)**

O bucket S3 está configurado como site público, com os cinco arquivos publicados. A abertura externa ainda precisa ser confirmada em um navegador comum porque o navegador automatizado de verificação encontrou uma restrição de protocolo. O endereço nativo do S3 utiliza **HTTP**, não HTTPS.

## O que é?

O **AlgoLab** é uma aplicação web interativa que reúne os exercícios das Entregáveis 1 a 4, com interface renovada e estrutura organizada para a Entregável 5. Há **seis algoritmos fundamentais** (Número Primo, Somatório, Fibonacci, MDC, QuickSort e Contagem de Inteiros) e uma **calculadora** com quatro operações.

Os algoritmos têm funções reutilizáveis, validação de entradas e testes automatizados. A interface executa tudo no navegador, sem exigir cadastro ou banco de dados.

### Requisitos recebidos

1. Ter conta em uma plataforma de computação em nuvem — **AWS conectada e verificada**.
2. Selecionar uma aplicação web — **AlgoLab desenvolvido a partir dos trabalhos anteriores**.
3. Publicar uma **URL em funcionamento na própria plataforma** — **arquivos e hospedagem AWS S3 configurados; confirmação de abertura externa pendente**.

Confira a matriz de requisitos em [docs/REQUISITOS.md](docs/REQUISITOS.md).

## Como executar localmente

Pré-requisito: Node.js **20 ou superior**.

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes
npm test
npm run build
npm start
```

Abra **http://localhost:3000** no navegador.

Sem dependências externas: não é preciso executar `npm install` para testar ou iniciar este projeto. Para testar uma operação, escolha um algoritmo no menu, altere os campos e clique em **Executar algoritmo**.

## Estrutura do repositório

| Caminho | Função |
| --- | --- |
| `index.html` | Página inicial da aplicação |
| `assets/css/` | Layout responsivo e identidade visual |
| `assets/js/app.js` | Interações, formulários e histórico local |
| `assets/js/algoritmos.bundle.js` | Bundle gerado automaticamente a partir de `src/` |
| `src/algoritmos/` | Os seis algoritmos reutilizados e aprimorados |
| `src/validacoes.js` | Validações compartilhadas |
| `tests/` | Testes unitários com Node.js |
| `scripts/` | Compilação para navegador e servidor de teste local |
| `.github/workflows/` | Testes automáticos e implantação manual na AWS |
| `docs/` | Requisitos, arquitetura, AWS e roteiro de apresentação |

## Continuidade dos trabalhos

- [Entregável 1 — JavaScript e Java](https://github.com/Ruan-levi/Entregavel1-JavaScript): origem dos algoritmos.
- [Entregável 2 — Interface JavaScript](https://github.com/Ruan-levi/Entregavel-2-Ambientes): referência de execução interativa.
- [Entregável 3 — Aplicação Express](https://github.com/Ruan-levi/Entregavel3-Ambientes): calculadora e estudo de requisições POST.
- [Entregável 4 — Clean Code e Jest](https://github.com/Ruan-levi/Entregavel4-Ambientes): base dos módulos e dos testes.
- **Entregável 5 — AWS:** publicação dos arquivos da aplicação web em bucket S3 da AWS.

> A versão hospedada estaticamente executa os cálculos no próprio navegador. As rotas Express com POST continuam disponíveis no repositório da Entregável 3, mas não são executadas dentro do Amazon S3.

## Testes e integração contínua

```bash
npm test       # verifica os algoritmos
npm run build  # gera assets/js/algoritmos.bundle.js usando o mesmo codigo
npm run check  # executa os dois passos
```

O workflow [Testes e compilação](.github/workflows/ci.yml) executa automaticamente os testes em cada atualização da branch `main`.

## Publicação e apresentação

- [Publicar na AWS — instruções e custos](docs/PUBLICACAO_AWS.md)
- [Roteiro de apresentação](docs/APRESENTACAO.md)
- [Arquitetura e decisões](docs/ARQUITETURA.md)
- [Checklist do enunciado](docs/REQUISITOS.md)

### Infraestrutura utilizada

- Provedor: **Amazon Web Services**, plano `FREE` (confirmado antes da implantação).
- Região: **us-east-2** (Ohio).
- Serviço: **Amazon S3**, site estático sem servidor, banco ou máquina virtual.
- Bucket: `ruan-levi-entregavel5-algolab-645822828419`.
- Política pública: somente **leitura** dos arquivos do site.
- URL: [AlgoLab publicado na AWS](http://ruan-levi-entregavel5-algolab-645822828419.s3-website.us-east-2.amazonaws.com/).

O consumo pode reduzir créditos do plano gratuito. **Nenhuma migração para plano pago foi feita.** O workflow de deploy por GitHub Actions permanece manual e exige configuração de IAM OIDC para futuras publicações.

**Repositório:** https://github.com/Ruan-levi/Entregavel5-Ambientes
