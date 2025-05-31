#!/bin/bash

# Script para configurar la base de datos automáticamente
echo "🚀 Configurando base de datos MySQL para Sistema Académico..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instálalo primero."
    exit 1
fi

# Instalar dependencias si no existen
echo "📦 Instalando dependencias..."
npm install

# Instalar Prisma si no está instalado
echo "🔧 Instalando Prisma..."
npm install prisma @prisma/client

# Generar el cliente de Prisma
echo "⚙️ Generando cliente de Prisma..."
npx prisma generate

# Aplicar cambios a la base de datos
echo "🗄️ Aplicando esquema a la base de datos..."
npx prisma db push

echo "✅ ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Asegúrate de que XAMPP/WAMP/MAMP esté ejecutándose"
echo "2. Ve a http://localhost/phpmyadmin"
echo "3. Verifica que la base de datos 'sistema_academico' existe"
echo "4. Ejecuta 'npm run dev' para iniciar el servidor"
echo ""
echo "🔗 Luego ve a http://localhost:3000/configuracion para probar la conexión"
