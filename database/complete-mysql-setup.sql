-- =====================================================
-- SCRIPT COMPLETO PARA PHPMYADMIN - SISTEMA ACADÉMICO
-- EJECUTAR EN PHPMYADMIN PASO A PASO
-- =====================================================

-- 1. CREAR LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS sistema_academico 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. USAR LA BASE DE DATOS
USE sistema_academico;

-- 3. ELIMINAR TABLAS SI EXISTEN (para empezar limpio)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS student_processes;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS academic_processes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS mockups;
DROP TABLE IF EXISTS documentation_studies;
DROP TABLE IF EXISTS process_analysis;
SET FOREIGN_KEY_CHECKS = 1;

-- 4. CREAR TABLA DE ESTUDIANTES
CREATE TABLE students (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    nombre VARCHAR(191) NOT NULL,
    apellido VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    telefono VARCHAR(191) NULL,
    carrera VARCHAR(191) NOT NULL,
    semestre INT NOT NULL,
    fechaNacimiento DATETIME(3) NULL,
    direccion TEXT NULL,
    cedula VARCHAR(191) NOT NULL UNIQUE,
    estado VARCHAR(191) NOT NULL DEFAULT 'Activo',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 5. CREAR TABLA DE DOCUMENTOS
CREATE TABLE documents (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    titulo VARCHAR(191) NOT NULL,
    tipo VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    archivo VARCHAR(191) NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'Pendiente',
    studentId VARCHAR(191) NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
);

-- 6. CREAR TABLA DE PROCESOS ACADÉMICOS
CREATE TABLE academic_processes (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    nombre VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    fechaInicio DATETIME(3) NOT NULL,
    fechaFin DATETIME(3) NOT NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'Planificado',
    semestre VARCHAR(191) NOT NULL,
    tipo VARCHAR(191) NOT NULL DEFAULT 'Proceso',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 7. CREAR TABLA DE RELACIÓN ESTUDIANTE-PROCESO
CREATE TABLE student_processes (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    studentId VARCHAR(191) NOT NULL,
    processId VARCHAR(191) NOT NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'Inscrito',
    nota DOUBLE NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE KEY unique_student_process (studentId, processId),
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (processId) REFERENCES academic_processes(id) ON DELETE CASCADE
);

-- 8. CREAR TABLA DE CRONOGRAMA
CREATE TABLE schedules (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    titulo VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    fechaInicio DATETIME(3) NOT NULL,
    fechaFin DATETIME(3) NOT NULL,
    tipo VARCHAR(191) NOT NULL,
    color VARCHAR(191) NOT NULL DEFAULT '#3b82f6',
    estado VARCHAR(191) NOT NULL DEFAULT 'Programado',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 9. CREAR TABLA DE MOCKUPS
CREATE TABLE mockups (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    titulo VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    categoria VARCHAR(191) NOT NULL,
    archivo VARCHAR(191) NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'Borrador',
    version VARCHAR(191) NOT NULL DEFAULT '1.0',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 10. CREAR TABLA DE ESTUDIOS DE DOCUMENTACIÓN
CREATE TABLE documentation_studies (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    titulo VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    tipo VARCHAR(191) NOT NULL,
    resultado TEXT NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'En Progreso',
    fechaInicio DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    fechaFin DATETIME(3) NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 11. CREAR TABLA DE ANÁLISIS DE PROCESOS
CREATE TABLE process_analysis (
    id VARCHAR(191) NOT NULL PRIMARY KEY,
    titulo VARCHAR(191) NOT NULL,
    descripcion TEXT NULL,
    tipo VARCHAR(191) NOT NULL,
    datos TEXT NULL,
    resultado TEXT NULL,
    estado VARCHAR(191) NOT NULL DEFAULT 'En Progreso',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- 12. CREAR ÍNDICES PARA OPTIMIZACIÓN
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_cedula ON students(cedula);
CREATE INDEX idx_students_carrera ON students(carrera);
CREATE INDEX idx_students_estado ON students(estado);
CREATE INDEX idx_documents_studentId ON documents(studentId);
CREATE INDEX idx_documents_tipo ON documents(tipo);
CREATE INDEX idx_documents_estado ON documents(estado);
CREATE INDEX idx_student_processes_studentId ON student_processes(studentId);
CREATE INDEX idx_student_processes_processId ON student_processes(processId);
CREATE INDEX idx_academic_processes_estado ON academic_processes(estado);
CREATE INDEX idx_schedules_tipo ON schedules(tipo);
CREATE INDEX idx_schedules_estado ON schedules(estado);
CREATE INDEX idx_mockups_categoria ON mockups(categoria);
CREATE INDEX idx_mockups_estado ON mockups(estado);

-- 13. INSERTAR DATOS DE EJEMPLO
-- Estudiantes de ejemplo
INSERT INTO students (id, nombre, apellido, email, cedula, carrera, semestre, estado) VALUES
('student1', 'Juan', 'Pérez', 'juan.perez@email.com', '12345678', 'ingenieria-sistemas', 5, 'Activo'),
('student2', 'María', 'González', 'maria.gonzalez@email.com', '87654321', 'administracion', 3, 'Activo'),
('student3', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '11223344', 'derecho', 7, 'Activo');

-- Procesos académicos de ejemplo
INSERT INTO academic_processes (id, nombre, descripcion, fechaInicio, fechaFin, estado, semestre, tipo) VALUES
('process1', 'Inscripciones 2024-1', 'Proceso de inscripción primer semestre', '2024-01-15 08:00:00', '2024-01-30 17:00:00', 'Completado', '2024-1', 'Administrativo'),
('process2', 'Evaluaciones Parciales', 'Primera ronda de evaluaciones', '2024-03-15 08:00:00', '2024-03-22 17:00:00', 'Activo', '2024-1', 'Evaluacion'),
('process3', 'Feria de Proyectos', 'Exposición de proyectos estudiantiles', '2024-04-20 09:00:00', '2024-04-20 18:00:00', 'Planificado', '2024-1', 'Evento');

-- Eventos del cronograma de ejemplo
INSERT INTO schedules (id, titulo, descripcion, fechaInicio, fechaFin, tipo, color, estado) VALUES
('schedule1', 'Inicio de Clases', 'Comienzo del semestre académico', '2024-02-01 08:00:00', '2024-02-01 17:00:00', 'Academico', '#22c55e', 'Completado'),
('schedule2', 'Semana de Receso', 'Semana de descanso académico', '2024-04-01 00:00:00', '2024-04-07 23:59:59', 'Receso', '#f59e0b', 'Programado'),
('schedule3', 'Graduación 2024', 'Ceremonia de graduación', '2024-06-15 10:00:00', '2024-06-15 12:00:00', 'Evento', '#8b5cf6', 'Programado');

-- Documentos de ejemplo
INSERT INTO documents (id, titulo, tipo, descripcion, studentId, estado) VALUES
('doc1', 'Cédula de Ciudadanía', 'identidad', 'Documento de identificación principal', 'student1', 'Aprobado'),
('doc2', 'Certificado de Bachillerato', 'academico', 'Título de educación secundaria', 'student1', 'Aprobado'),
('doc3', 'Examen Médico', 'medico', 'Certificado médico de ingreso', 'student2', 'Pendiente');

-- Mockups de ejemplo
INSERT INTO mockups (id, titulo, descripcion, categoria, estado, version) VALUES
('mockup1', 'Dashboard Principal', 'Diseño de la página principal del sistema', 'Dashboard', 'Implementado', '2.0'),
('mockup2', 'Formulario de Estudiantes', 'Prototipo del formulario de registro', 'Formulario', 'Aprobado', '1.5'),
('mockup3', 'Panel de Reportes', 'Interfaz para generación de reportes', 'Reporte', 'Revision', '1.0');

-- 14. VERIFICAR CREACIÓN DE TABLAS
SELECT 'Tablas creadas exitosamente' as mensaje;
SELECT TABLE_NAME, TABLE_ROWS 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'sistema_academico' 
ORDER BY TABLE_NAME;
