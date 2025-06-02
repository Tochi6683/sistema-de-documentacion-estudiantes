#!/bin/bash

# Colores para log
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
NC="\033[0m" # Sin color

function log_info() {
  echo -e "${GREEN}🚀 $1${NC}"
}

function log_error() {
  echo -e "${RED}❌ $1${NC}"
}

function log_warn() {
  echo -e "${YELLOW}⚠️ $1${NC}"
}

function check_command() {
  if ! command -v "$1" &> /dev/null; then
    log_error "$1 no está instalado. Por favor instálalo primero."
    exit 1
  fi
}

log_info "Configurando base de datos MySQL para Sistema Académico..."

check_command node
check_command npm

log_info "Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
  log_error "Falló la instalación de dependencias npm."
  exit 1
fi

log_info "Instalando Prisma..."
npm install prisma @prisma/client
if [ $? -ne 0 ]; then
  log_error "Falló la instalación de Prisma."
  exit 1
fi

log_info "Generando cliente de Prisma..."
npx prisma generate
if [ $? -ne 0 ]; then
  log_error "Falló la generación del cliente Prisma."
  exit 1
fi

log_info "Aplicando esquema a la base de datos..."
npx prisma db push
if [ $? -ne 0 ]; then
  log_error "Falló la aplicación del esquema a la base de datos."
  exit 1
fi

log_info "¡Configuración completada!"

echo ""
echo "📋 Próximos pasos:"
echo "1. Asegúrate de que XAMPP/WAMP/MAMP esté ejecutándose"
echo "2. Ve a http://localhost/phpmyadmin"
echo "3. Verifica que la base de datos 'sistema_academico' existe"
echo "4. Ejecuta 'npm run dev' para iniciar el servidor"
echo ""
echo "🔗 Luego ve a http://localhost:3000/configuracion para probar la conexión"
