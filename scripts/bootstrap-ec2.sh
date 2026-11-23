#!/bin/bash
set -euo pipefail
exec > >(tee -a /var/log/cantinaflow-install.log) 2>&1
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
