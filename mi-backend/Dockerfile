# ---- Build stage ----
FROM node:22-alpine AS build

WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Only production deps in the final image
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Bring in the compiled output from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]