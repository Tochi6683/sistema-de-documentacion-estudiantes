import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    // Intentar conectar a la base de datos
    await prisma.$connect()

    // Hacer una consulta simple para verificar la conexión
    const result = await prisma.$queryRaw`SELECT 1 as test`

    // Verificar si las tablas existen
    const tables = await prisma.$queryRaw`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = DATABASE()
    `

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: "Conexión exitosa a MySQL",
      tables: tables,
      testQuery: result,
    })
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error)

    let errorMessage = "Error desconocido"

    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "No se puede conectar a MySQL. Verifica que el servidor esté ejecutándose."
      } else if (error.message.includes("Access denied")) {
        errorMessage = "Credenciales incorrectas. Verifica usuario y contraseña."
      } else if (error.message.includes("Unknown database")) {
        errorMessage = "La base de datos 'sistema_academico' no existe. Créala en phpMyAdmin."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
    })
  }
}
