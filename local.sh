#!/bin/bash

# Archivo principal de tu proyecto
MAIN="server.js"

chmod +x local.sh

# Busca nodemon de manera local en node_modules o global
if ! npx nodemon --version >/dev/null 2>&1; then
  echo "nodemon no está instalado. Instalando localmente..."
  npm install --save-dev nodemon
fi

echo "Iniciando el servidor con nodemon (archivo: $MAIN)..."
npx nodemon "$MAIN"