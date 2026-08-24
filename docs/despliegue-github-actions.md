# Guia de despliegue con GitHub Actions, scripting, Docker y Nginx

Esta guia explica como desplegar este proyecto en un computador de la sala usando CI/CD. La idea es mantener la misma logica del repositorio base, pero adaptada a una aplicacion con frontend y backend.

Si primero quieres levantar la aplicacion manualmente con Docker, revisa [levantar-docker-desde-cero.md](levantar-docker-desde-cero.md).

## 1. Idea general

El repositorio base despliega un HTML simple:

```text
push a main
-> GitHub Actions
-> self-hosted runner
-> copiar index.html y nginx.conf
-> recargar Nginx
```

Este proyecto no es solo un HTML. Tiene:

- `frontend`: aplicacion Next.js.
- `mi-backend`: API NestJS.
- `nginx`: reverse proxy para publicar la app por IP.

Por eso el flujo queda asi:

```text
push a deploySantiago
-> GitHub Actions
-> self-hosted runner en el computador de sala
-> scripts/deploy.sh
-> docker compose build
-> docker compose up -d
-> app disponible en http://IP_DEL_PC/
```

## 2. Por que usamos self-hosted runner y no SSH

Un self-hosted runner es un programa instalado en una maquina que GitHub usa para ejecutar workflows.

En esta actividad conviene instalar el runner en el computador de la sala porque el workflow se ejecuta directamente en el destino del despliegue. Asi no hace falta entrar por SSH desde GitHub hacia el computador.

SSH seria otra forma de hacerlo:

```text
GitHub-hosted runner
-> conexion SSH al computador de sala
-> comandos de despliegue remotos
```

Pero para eso se necesita configurar llaves SSH, acceso remoto, firewall y permisos. Con self-hosted runner el computador de sala se conecta a GitHub y espera trabajos; suele ser mas simple para un laboratorio.

## 3. Que hace cada tecnologia

GitHub Actions ejecuta el pipeline cuando haces push a la rama `deploySantiago`.

El self-hosted runner es el computador que ejecuta realmente los comandos del workflow.

`scripts/deploy.sh` representa la parte de scripting. Automatiza validaciones, build, levantamiento de contenedores y pruebas basicas.

Docker empaqueta cada parte de la aplicacion para que no dependa de instalaciones manuales de Node en el computador.

Docker Compose levanta los servicios juntos:

- `backend`: API NestJS en el puerto interno `3000`.
- `frontend`: Next.js en el puerto interno `8080`.
- `nginx`: entrada publica en el puerto `80`.

Nginx recibe las peticiones del navegador:

```text
http://IP_DEL_PC/                  -> frontend
http://IP_DEL_PC/api/calculator/... -> backend
```

## 4. Archivos importantes

`.github/workflows/deploy.yml` define el workflow de CI/CD. Es similar al workflow base, pero ejecuta `scripts/deploy.sh` en vez de copiar un `index.html`.

`scripts/deploy.sh` contiene los comandos de despliegue:

```bash
docker compose down --remove-orphans || true
docker compose build
docker compose up -d
docker compose ps
curl -fsSI http://localhost/
curl -fsS http://localhost/api/calculator/health
```

`docker-compose.yml` define los contenedores de frontend, backend y Nginx.

`nginx/default.conf` define las rutas:

```text
/     -> frontend
/api/ -> backend
```

## 5. Pasos en el computador de sala

Estos pasos se hacen una sola vez en el computador de la sala.

### 5.1 Instalar Docker

El computador debe tener Docker y Docker Compose. Para verificar:

```bash
docker --version
docker compose version
```

El usuario que ejecuta el runner debe poder usar Docker. Si `docker ps` falla por permisos, normalmente se agrega el usuario al grupo `docker` y se reinicia la sesion.

### 5.2 Instalar el self-hosted runner

En GitHub:

1. Entrar al repositorio.
2. Ir a `Settings`.
3. Entrar a `Actions`.
4. Entrar a `Runners`.
5. Crear un nuevo self-hosted runner.
6. Escoger Linux si el computador de sala usa Linux.
7. Copiar y ejecutar los comandos que GitHub muestra.

GitHub muestra comandos actualizados para descargar, configurar y arrancar el runner. No conviene copiar comandos fijos de internet porque la version del runner cambia.

Despues de configurarlo, se recomienda instalarlo como servicio para que siga corriendo aunque se cierre la terminal.

### 5.3 Confirmar que el puerto 80 esta libre

La app publica Nginx desde Docker en el puerto `80`. Verifica:

```bash
sudo ss -ltnp | grep ':80'
```

Si ya hay otro Nginx o Apache usando el puerto 80, Docker no podra levantar el contenedor `taller2-nginx`. En ese caso hay dos opciones:

- detener el servicio que usa el puerto 80;
- o cambiar temporalmente el puerto en `docker-compose.yml`, por ejemplo `"8080:80"`.

Para la entrega por IP directa, lo ideal es usar el puerto `80`.

## 6. Como desplegar

El workflow esta configurado para la rama `deploySantiago`.

Cada vez que hagas push:

```bash
git push origin deploySantiago
```

GitHub Actions ejecutara:

```text
Checkout Repository
Diagnostics & Environment Info
Verify Project Files
Deploy App
```

El paso `Deploy App` llama:

```bash
bash scripts/deploy.sh
```

## 7. Como probar

Cuando tengas la IP real del computador de sala, reemplaza mentalmente `IP_DEL_PC` por esa IP.

Frontend:

```text
http://IP_DEL_PC/
```

Backend por Nginx:

```text
http://IP_DEL_PC/api/calculator/health
```

En el computador de sala tambien puedes probar localmente:

```bash
curl -I http://localhost/
curl http://localhost/api/calculator/health
docker compose ps
docker compose logs nginx
docker compose logs frontend
docker compose logs backend
```

## 8. Como explicarlo en clase

Una explicacion corta seria:

> El workflow de GitHub Actions se ejecuta cuando hacemos push a `deploySantiago`. Como usamos un self-hosted runner instalado en el computador de la sala, los comandos se ejecutan directamente en la maquina destino. El workflow no copia un HTML porque nuestra app tiene frontend y backend; en cambio ejecuta un script de despliegue. Ese script construye y levanta los contenedores con Docker Compose. Nginx queda como entrada publica por el puerto 80 y redirige `/` al frontend y `/api` al backend.

La diferencia principal con el repo base es:

```text
Repo base: copiar index.html.
Este repo: construir y levantar contenedores.
```

## 9. Problemas comunes

Si el workflow no arranca, revisa que el runner aparezca online en GitHub.

Si falla `docker compose`, revisa que Docker este instalado y que el usuario del runner tenga permisos.

Si falla el puerto `80`, revisa si otro servicio ya lo esta usando.

Si el frontend carga pero la calculadora falla, revisa:

```bash
curl http://localhost/api/calculator/health
docker compose logs backend
docker compose logs nginx
```

Si necesitas limpiar y levantar de nuevo manualmente:

```bash
docker compose down --remove-orphans
docker compose up -d --build
```
