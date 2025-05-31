-- Script para configurar la base de datos en phpMyAdmin
-- Ejecuta estos comandos en phpMyAdmin

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_academico 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. Usar la base de datos
USE sistema_academico;

-- 3. Crear usuario específico (opcional, puedes usar root)
-- CREATE USER 'sistema_user'@'localhost' IDENTIFIED BY 'password123';
-- GRANT ALL PRIVILEGES ON sistema_academico.* TO 'sistema_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Las tablas se crearán automáticamente con Prisma
-- Este script es solo para preparar la base de datos
