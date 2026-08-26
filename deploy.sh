#!/usr/bin/env bash
set -euo pipefail

# config
REMOTE_USER="computacion2"
REMOTE_HOST="192.168.131.64"
REMOTE_DIR="~/deployEquipoDanielita/back"
LOCAL_BACKEND_DIR="mi-backend"
REMOTE_PORT=3000

# build local
echo "compilando..."
cd "$LOCAL_BACKEND_DIR"
npm install
npm run build
cd - > /dev/null

# carpeta en el remoto
ssh "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR}"

# copiar dist + package.json (sin node_modules, se instala allá)
echo "copiando al lab..."
scp -r \
  "${LOCAL_BACKEND_DIR}/dist" \
  "${LOCAL_BACKEND_DIR}/package.json" \
  "${LOCAL_BACKEND_DIR}/package-lock.json" \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"

# instalar deps y reiniciar el proceso
echo "reiniciando backend..."
ssh "${REMOTE_USER}@${REMOTE_HOST}" bash -s <<EOF
  set -e
  cd ${REMOTE_DIR}
  npm install --production

  # mata el proceso viejo si sigue corriendo en ese puerto
  fuser -k ${REMOTE_PORT}/tcp 2>/dev/null || true
  sleep 1

  # levanta el nuevo en background, log a nohup.out
  nohup node dist/main.js > backend.log 2>&1 &
  disown
EOF

echo "listo, backend corriendo en puerto ${REMOTE_PORT}"
echo "logs: ssh ${REMOTE_USER}@${REMOTE_HOST} 'tail -f ${REMOTE_DIR}/backend.log'"
