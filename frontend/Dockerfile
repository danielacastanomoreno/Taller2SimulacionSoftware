# Partimos de una imagen base oficial de node
# Etapa 1: Build de la aplicacion (Node.js)
FROM node:20-alpine AS builder

# El directorio de trabajo es desde donde se ejecuta el contenedor al iniciarse
WORKDIR /app

# Copiamos todos los archivos del build context al directorio /app del contenedor
COPY package*.json /app

# Ejecutamos pip para instalar las dependencias en el contenedor
RUN npm ci

# Indicamos que este contenedor se comunica por el puerto 80/tcp. Puerto 80 del contenedor NO DEL HOST. OJO
EXPOSE 3000

# Copiar codigo fuente y compilar
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]