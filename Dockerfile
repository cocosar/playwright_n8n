FROM docker.n8n.io/n8nio/n8n:latest

USER root

# Instalar dependencias necesarias para Playwright en Alpine Linux
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Crear el directorio workspace
RUN mkdir -p /workspace

# Establecer el directorio de trabajo
WORKDIR /workspace

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias del proyecto
RUN npm install

# Configurar Playwright para usar Chromium del sistema
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Instalar n8n-nodes-mcp en el directorio de configuración de n8n
# y asegurar permisos correctos para el usuario node
RUN mkdir -p /home/node/.n8n/nodes \
 && cd /home/node/.n8n/nodes \
 && npm install n8n-nodes-mcp \
 && chown -R node:node /home/node/.n8n \
 && chown -R node:node /workspace

# Cambiar al usuario node para ejecutar n8n
USER node

# Variables de entorno
ENV N8N_COMMUNITY_PACKAGES_ENABLED=true
ENV N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
