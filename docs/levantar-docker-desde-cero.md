# Guia para levantar Docker desde cero

Esta guia parte del caso en que acabas de recibir o clonar el proyecto y quieres levantarlo con Docker en una maquina nueva.

## 1. Requisitos de la maquina

La maquina debe tener:

- Git.
- Docker.
- Docker Compose.

Verifica:

```bash
git --version
docker --version
docker compose version
```

Si `docker compose version` responde, Docker Compose ya esta disponible.

## 2. Clonar el proyecto

Clona el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd Taller2SimulacionSoftware
```

Como el despliegue se preparo en la rama `deploySantiago`, entra a esa rama:

```bash
git checkout deploySantiago
```

Si la rama no aparece localmente:

```bash
git fetch origin
git checkout deploySantiago
```

## 3. Revisar que existan los archivos Docker

Desde la raiz del proyecto, verifica:

```bash
ls
```

Deben existir estos archivos o carpetas:

```text
docker-compose.yml
frontend/Dockerfile
mi-backend/Dockerfile
nginx/default.conf
scripts/deploy.sh
```

Tambien puedes validarlo con:

```bash
test -f docker-compose.yml
test -f frontend/Dockerfile
test -f mi-backend/Dockerfile
test -f nginx/default.conf
test -f scripts/deploy.sh
echo "Archivos Docker encontrados"
```

## 4. Entender que se va a levantar

Docker Compose levanta tres servicios:

```text
nginx    -> entrada publica por http://localhost/
frontend -> aplicacion Next.js
backend  -> API NestJS
```

Las rutas quedan asi:

```text
http://localhost/                       -> frontend
http://localhost/api/calculator/health  -> backend
```

En el computador de la sala, `localhost` se reemplaza por la IP:

```text
http://IP_DEL_PC/
http://IP_DEL_PC/api/calculator/health
```

## 5. Construir las imagenes

Desde la raiz del proyecto:

```bash
docker compose build
```

Esto hace:

- instalar dependencias del frontend;
- compilar Next.js;
- instalar dependencias del backend;
- compilar NestJS;
- preparar las imagenes Docker.

Si este paso termina sin error, las imagenes quedaron listas.

## 6. Levantar la aplicacion

Ejecuta:

```bash
docker compose up -d
```

La bandera `-d` significa que los contenedores quedan corriendo en segundo plano.

Verifica el estado:

```bash
docker compose ps
```

Deberias ver algo parecido a:

```text
taller2-backend    Up
taller2-frontend   Up
taller2-nginx      Up
```

## 7. Probar desde terminal

Prueba el frontend:

```bash
curl -I http://localhost/
```

Debe responder algo como:

```text
HTTP/1.1 200 OK
Server: nginx
```

Prueba el backend:

```bash
curl http://localhost/api/calculator/health
```

Debe responder un JSON parecido a:

```json
{"status":200,"uptime":10.5,"permissions":true}
```

El valor de `uptime` cambia en cada ejecucion.

## 8. Probar desde navegador

Abre:

```text
http://localhost/
```

En el computador de la sala seria:

```text
http://IP_DEL_PC/
```

Prueba una operacion en la calculadora. Si la operacion responde, el frontend, Nginx y el backend estan comunicandose correctamente.

## 9. Ver logs

Si algo falla, mira logs.

Todos los servicios:

```bash
docker compose logs
```

Solo Nginx:

```bash
docker compose logs nginx
```

Solo frontend:

```bash
docker compose logs frontend
```

Solo backend:

```bash
docker compose logs backend
```

Para seguir los logs en vivo:

```bash
docker compose logs -f
```

## 10. Apagar la aplicacion

Para detener los contenedores:

```bash
docker compose down
```

Para detenerlos y limpiar contenedores que ya no pertenecen al compose actual:

```bash
docker compose down --remove-orphans
```

## 11. Levantar todo con el script de despliegue

El script hace los pasos principales automaticamente:

```bash
bash scripts/deploy.sh
```

Ese script:

```text
1. valida archivos necesarios;
2. muestra informacion de la maquina;
3. apaga contenedores anteriores;
4. construye imagenes;
5. levanta contenedores;
6. prueba frontend;
7. prueba backend.
```

Este es el mismo script que ejecuta GitHub Actions en el workflow.

## 12. Problemas comunes

### Docker no tiene permisos

Error comun:

```text
permission denied while trying to connect to the Docker daemon
```

Significa que tu usuario no puede usar Docker.

Solucion tipica en Linux:

```bash
sudo usermod -aG docker $USER
```

Luego cierra sesion y vuelve a entrar.

### El puerto 80 ya esta ocupado

Error comun:

```text
Bind for 0.0.0.0:80 failed: port is already allocated
```

Revisa que usa el puerto:

```bash
sudo ss -ltnp | grep ':80'
```

Opciones:

- detener el servicio que ocupa el puerto 80;
- o cambiar temporalmente en `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

Si haces ese cambio, pruebas con:

```text
http://localhost:8080/
```

Para la entrega por IP directa, lo ideal es mantener:

```yaml
ports:
  - "80:80"
```

### El frontend carga pero la calculadora falla

Prueba el backend:

```bash
curl http://localhost/api/calculator/health
```

Si falla, mira:

```bash
docker compose logs backend
docker compose logs nginx
```

### Cambiaste codigo y no se ve reflejado

Reconstruye:

```bash
docker compose down --remove-orphans
docker compose build
docker compose up -d
```

O usa directamente:

```bash
bash scripts/deploy.sh
```

## 13. Comandos importantes para memorizar

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs
docker compose down --remove-orphans
bash scripts/deploy.sh
```

## 14. Explicacion corta

Una forma simple de explicarlo:

> Docker Compose levanta tres contenedores: frontend, backend y Nginx. Nginx publica la aplicacion por el puerto 80. Cuando entro a `/`, Nginx envia la peticion al frontend. Cuando entro a `/api`, Nginx envia la peticion al backend. El script `deploy.sh` automatiza el build y el levantamiento de esos contenedores.
