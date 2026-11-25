# Configuração e execução — CONQUEST Entregável 5 AWS

## Executar na sua máquina

Pré-requisitos: Git, Node.js 22.12+, npm e navegador com WebGL.

```bash
git clone https://github.com/Ruan-levi/Entregavel5-Ambientes.git
cd Entregavel5-Ambientes/conquest
npm ci
npm test
npm run build
mkdir -p data
CONQUEST_DB="$PWD/data/conquest.sqlite" CONQUEST_DIST="$PWD/dist" PORT=4000 node server/index.mjs
```

Acesse `http://127.0.0.1:4000/` e `http://127.0.0.1:4000/api/health`. Em Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force data
$env:CONQUEST_DB = (Join-Path (Get-Location) "data/conquest.sqlite")
$env:CONQUEST_DIST = (Join-Path (Get-Location) "dist")
$env:PORT = "4000"
node server/index.mjs
```

Para testar apenas o frontend: `npm run dev`. Atenção: isso **não** executa a API/SQLite; o painel React requer o servidor REST em execução na mesma origem.

## Ambiente AWS usado na atividade

- Serviço: Amazon EC2, região Ohio `us-east-2`, instância `i-0201778b1ea2903b2`, classe `t3.micro`.
- Sistema: Amazon Linux 2023.
- URL pública: **[http://3.149.254.9/](http://3.149.254.9/)**.
- Nginx atende a porta 80 e encaminha requisições ao Node.js local em `127.0.0.1:4000`.
- Build web: `/opt/conquest/dist`; API: `/opt/conquest/server`.
- Banco persistente: `/var/lib/conquest/conquest.sqlite` em volume EBS.
- Administração: AWS Systems Manager / Session Manager.

**Atenção:** o endereço pode mudar após desligar e ligar a instância. Não há HTTPS configurado; use apenas contas e senhas fictícias.

## Como verificar na apresentação

Visite `http://3.149.254.9/api/health` e `http://3.149.254.9/api/ranking`. No AWS Console, na região Ohio, abra EC2 → Instâncias → instância indicada. Confirme os serviços usando Session Manager:

```bash
sudo systemctl status conquest
sudo systemctl status nginx
sudo journalctl -u conquest -n 40 --no-pager
curl http://127.0.0.1/api/health
```

## Atualização da aplicação publicada

**A Entregável 5 não implanta automaticamente via GitHub Actions.** A CI do repositório valida os arquivos, mas a EC2 utiliza a cópia já implantada. Alterar o GitHub não altera o site até aplicar o build atualizado na instância.

Para implantação futura, é necessário transferir/sincronizar os arquivos da pasta `conquest/` deste repositório para `/opt/conquest`, então executar `npm ci`, `npm test`, `npm run build` e reiniciar o serviço `conquest`. Antes disso, faça backup do banco, confirme a unidade systemd e evite sobrescrever `/var/lib/conquest/conquest.sqlite`. Não aplique `git pull` de um repositório antigo sem primeiro conferir a origem atualmente configurada na instância.

## Segurança e custos

A EC2, o armazenamento EBS, IPv4 e tráfego podem gerar cobrança. Não compartilhe chaves, senhas nem tokens da AWS. O sistema usa hash das senhas e sessões temporárias. O ranking acadêmico não recalcula os pontos em servidor.
