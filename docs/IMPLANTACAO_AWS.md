# CantinaFlow — Implantação na Amazon EC2

## Arquitetura

Instância EC2 t3.micro (Amazon Linux 2023), Nginx na porta HTTP 80, aplicação Node.js na porta 3000 e SQLite em volume EBS de 8 GiB. GitHub contém o frontend React e o backend. **O endereço acessado será HTTP**; para uso fora da demonstração, configure HTTPS e não utilize credenciais nem dados reais.

## Custo

A instância t3.micro aparece como elegível ao Free Tier de contas AWS novas, mas a elegibilidade não significa custo garantidamente zero. Instância, armazenamento EBS, IPv4 público e transferência de dados podem consumir créditos e, dependendo do plano, gerar cobranças. Antes de criar, verifique Billing > Free Tier e créditos. Pare/exclua a instância e o volume ao concluir as apresentações, se não for mais utilizá-los.

## Console AWS

1. Abra AWS Console > EC2 > Launch instance, região **us-east-2 (Ohio)**.
2. Nome: `CantinaFlow - Entrega Final`. Sistema operacional: **Amazon Linux 2023**, arquitetura x86_64.
3. Tipo da instância: **t3.micro**. Se a indicação Free Tier não estiver disponível em sua conta, não prossiga automaticamente.
4. Volume root: **8 GiB gp3**, exclusão junto à instância marcada.
5. Segurança: criar security group que permita somente **HTTP TCP 80** de `0.0.0.0/0` para a apresentação. Não abrir a porta 3000 nem abrir SSH desnecessariamente.
6. Em **Advanced details > User data**, cole o script abaixo e substitua as duas senhas por valores únicos de demonstração. Evite senha de contas pessoais.
7. Crie a instância. Aguarde os dois status checks passarem e abra `http://IP_PUBLICO/api/health`. A resposta esperada é `{"status":"ok","service":"CantinaFlow","database":"sqlite"}`.
8. Abra `http://IP_PUBLICO/` e teste login, cadastro de produtos, cadastro de clientes, venda, contas a receber e relatórios. O endereço público da instância pode mudar após desligar/reiniciar.

### User data

```bash
#!/bin/bash
set -euxo pipefail
cat > /etc/cantinaflow.env <<'ENVEND'
NODE_ENV=production
DB_FILE=/var/lib/cantinaflow/cantinaflow.sqlite
PORT=3000
ADMIN_PASSWORD=SUBSTITUA_POR_SENHA_FORTE_DO_ADMIN
OPERATOR_PASSWORD=SUBSTITUA_POR_SENHA_FORTE_DO_OPERADOR
ENVEND
chmod 600 /etc/cantinaflow.env
dnf install -y git
mkdir -p /opt/cantinaflow
git clone --depth 1 https://github.com/Ruan-levi/Entregavel5-Ambientes.git /opt/cantinaflow
bash /opt/cantinaflow/scripts/bootstrap-ec2.sh
```

## Diagnóstico

Caso `/api/health` não responda, entre pelo Systems Manager Session Manager ou outro acesso administrativo autorizado e confira:

```bash
sudo systemctl status cantinaflow nginx
sudo journalctl -u cantinaflow -n 80 --no-pager
sudo tail -n 80 /var/log/cantinaflow-install.log
sudo nginx -t
```

Sem login administrativo ou função IAM apropriada, o Session Manager pode não estar habilitado. Não abra SSH para toda a internet apenas para depurar. A instância deve ter saída para instalar os pacotes do sistema e clonar o GitHub.

## Observações

A interface React é carregada de `esm.sh`; o dispositivo do usuário precisa acessar esse domínio pela internet. O sistema gera comprovantes de venda internos: não emite NF-e/NFC-e fiscal. Para utilização real configure TLS, backup do banco, retenção de logs, limitação de login e proteção de dados pessoais.