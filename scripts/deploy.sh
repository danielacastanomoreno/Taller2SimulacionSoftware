#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo "  Despliegue Taller2 con Docker Compose"
echo "  Host: $(hostname)"
echo "  Usuario: $(whoami)"
echo "  Directorio: $(pwd)"
echo "  Fecha: $(date)"
echo "=========================================="

test -f docker-compose.yml
test -f nginx/default.conf
test -f frontend/Dockerfile
test -f mi-backend/Dockerfile

docker --version
docker compose version

echo "Deteniendo contenedores anteriores..."
docker compose down --remove-orphans || true

echo "Construyendo imagenes..."
docker compose build

echo "Levantando aplicacion..."
docker compose up -d

echo "Contenedores activos:"
docker compose ps

echo "Probando frontend por Nginx..."
curl -fsSI http://localhost/ | head -n 5

echo "Probando backend por Nginx..."
curl -fsS http://localhost/api/calculator/health

echo "Despliegue completado."
