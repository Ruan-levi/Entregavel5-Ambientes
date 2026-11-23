#!/bin/bash
set -euo pipefail
exec > >(tee -a /var/log/cantinaflow-install.log /dev/console) 2>&1
if [ ! -f /etc/cantinaflow.env ]; then
  ADMIN_DEMO=$(openssl rand -hex 16)
  OPERATOR_DEMO=$(openssl rand -hex 16)
  cat > /etc/cantinaflow.env <<EOCREDS
NODE_ENV=production
DB_FILE=/var/lib/cantinaflow/cantinaflow.sqlite
PORT=3000
ADMIN_PASSWORD=$ADMIN_DEMO
OPERATOR_PASSWORD=$OPERATOR_DEMO
EOCREDS
  chmod 600 /etc/cantinaflow.env
  printf 'CantinaFlow admin: %s\nCantinaFlow operador: %s\n' "$ADMIN_DEMO" "$OPERATOR_DEMO" > /root/cantinaflow-demo-credentials
  chmod 600 /root/cantinaflow-demo-credentials
  echo 'CantinaFlow credentials saved at /root/cantinaflow-demo-credentials'
fi
dnf install -y nodejs22 nodejs22-npm git nginx
mkdir -p /opt/cantinaflow /var/lib/cantinaflow
if [ ! -f /opt/cantinaflow/package.json ]; then
  git clone --depth 1 https://github.com/Ruan-levi/Entregavel5-Ambientes.git /opt/cantinaflow
fi
chown ec2-user:ec2-user /var/lib/cantinaflow
chmod 750 /var/lib/cantinaflow
NODE_BIN=$(command -v node || command -v node-22)
cat > /etc/systemd/system/cantinaflow.service <<EOT
[Unit]
Description=CantinaFlow - API e frontend
Wants=network-online.target
After=network-online.target
[Service]
Type=simple
User=ec2-user
Group=ec2-user
WorkingDirectory=/opt/cantinaflow
EnvironmentFile=/etc/cantinaflow.env
ExecStart=$NODE_BIN server/index.js
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
ProtectSystem=full
ReadWritePaths=/var/lib/cantinaflow
[Install]
WantedBy=multi-user.target
EOT
systemctl daemon-reload
systemctl enable --now cantinaflow.service

cat > /etc/nginx/conf.d/cantinaflow.conf <<'EOT'
server {
    listen 80 default_server;
    server_name _;
    client_max_body_size 1m;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOT
nginx -t
systemctl enable --now nginx
