#!/bin/bash
set -euo pipefail
exec > >(tee -a /var/log/cantinaflow-install.log) 2>&1
dnf install -y nodejs22 nodejs22-npm git
mkdir -p /opt/cantinaflow /var/lib/cantinaflow
if [ ! -f /opt/cantinaflow/package.json ]; then
  git clone --depth 1 https://github.com/Ruan-levi/Entregavel5-Ambientes.git /opt/cantinaflow
fi
chmod 750 /var/lib/cantinaflow
NODE_BIN=$(command -v node || command -v node-22)
cat > /etc/systemd/system/cantinaflow.service <<EOT
[Unit]
Description=CantinaFlow - API e frontend
Wants=network-online.target
After=network-online.target
[Service]
Type=simple
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
