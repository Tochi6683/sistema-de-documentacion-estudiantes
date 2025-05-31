"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSystemStats() {
  try {
    await prisma.$connect()

    const [totalStudents, totalDocuments, activeProcesses, completedProcesses, pendingDocuments, approvedDocuments] =
      await Promise.all([
        prisma.student.count(),
        prisma.document.count(),
        prisma.academicProcess.count({ where: { estado: "Activo" } }),
        prisma.academicProcess.count({ where: { estado: "Completado" } }),
        prisma.document.count({ where: { estado: "Pendiente" } }),
        prisma.document.count({ where: { estado: "Aprobado" } }),
      ])

    const completionRate = totalDocuments > 0 ? (approvedDocuments / totalDocuments) * 100 : 0

    await prisma.$disconnect()

    return {
      totalStudents,
      totalDocuments,
      activeProcesses,
      completedProcesses,
      pendingDocuments,
      approvedDocuments,
      completionRate: Math.round(completionRate * 10) / 10,
    }
  } catch (error) {
    console.error("❌ Error fetching system stats:", error)
    await prisma.$disconnect()
    return {
      totalStudents: 0,
      totalDocuments: 0,
      activeProcesses: 0,
      completedProcesses: 0,
      pendingDocuments: 0,
      approvedDocuments: 0,
      completionRate: 0,
    }
  }
}

export async function getStudentsByCarrera() {
  try {
    await prisma.$connect()

    const studentsByCarrera = await prisma.student.groupBy({
      by: ["carrera"],
      _count: {
        id: true,
      },
    })

    await prisma.$disconnect()
    return studentsByCarrera
  } catch (error) {
    console.error("❌ Error fetching students by carrera:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function createProcessAnalysis(formData: FormData) {
  try {
    await prisma.$connect()

    const titulo = formData.get("titulo") as string
    const descripcion = formData.get("descripcion") as string
    const tipo = formData.get("tipo") as string

    if (!titulo || !tipo) {
      throw new Error("Los campos título y tipo son obligatorios")
    }

    // Generar datos de análisis basados en el tipo
    let datos = {}
    let resultado = ""

    switch (tipo) {
      case "Rendimiento":
        const stats = await getSystemStats()
        datos = stats
        resultado = `Análisis de rendimiento completado. Total de estudiantes: ${stats.totalStudents}, Tasa de completitud: ${stats.completionRate}%`
        break
      case "Estadistica":
        const carreraStats = await getStudentsByCarrera()
        datos = { carreraStats }
        resultado = `Análisis estadístico completado. Distribución por carreras analizada.`
        break
      default:
        resultado = `Análisis de tipo ${tipo} iniciado.`
    }

    const analysis = await prisma.processAnalysis.create({
      data: {
        titulo,
        descripcion,
        tipo,
        datos: JSON.stringify(datos),
        resultado,
        estado: "Completado",
      },
    })

    revalidatePath("/analisis")
    await prisma.$disconnect()

    return { success: true, analysis }
  } catch (error) {
    console.error("❌ Error creating process analysis:", error)
    await prisma.$disconnect()

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el análisis",
    }
  }
}

export async function getProcessAnalyses() {
  try {
    await prisma.$connect()

    const analyses = await prisma.processAnalysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    await prisma.$disconnect()
    return analyses
  } catch (error) {
    console.error("❌ Error fetching process analyses:", error)
    await prisma.$disconnect()
    return []
  }
}
