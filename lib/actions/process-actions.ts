"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface ProcessFormData {
  nombre: string
  descripcion?: string
  fechaInicio: string
  fechaFin: string
  semestre: string
  tipo: string
}

export async function createAcademicProcess(formData: FormData) {
  try {
    await prisma.$connect()

    const data: ProcessFormData = {
      nombre: formData.get("nombre") as string,
      descripcion: (formData.get("descripcion") as string) || undefined,
      fechaInicio: formData.get("fechaInicio") as string,
      fechaFin: formData.get("fechaFin") as string,
      semestre: formData.get("semestre") as string,
      tipo: formData.get("tipo") as string,
    }

    if (!data.nombre || !data.fechaInicio || !data.fechaFin || !data.semestre) {
      throw new Error("Los campos nombre, fechas y semestre son obligatorios")
    }

    const process = await prisma.academicProcess.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        semestre: data.semestre,
        tipo: data.tipo || "Proceso",
      },
    })

    revalidatePath("/procesos")
    await prisma.$disconnect()

    return { success: true, process }
  } catch (error) {
    console.error("❌ Error creating academic process:", error)
    await prisma.$disconnect()

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el proceso",
    }
  }
}

export async function getAcademicProcesses() {
  try {
    await prisma.$connect()

    const processes = await prisma.academicProcess.findMany({
      include: {
        estudiantes: {
          include: {
            student: true,
          },
        },
      },
      orderBy: {
        fechaInicio: "desc",
      },
    })

    await prisma.$disconnect()
    return processes
  } catch (error) {
    console.error("❌ Error fetching academic processes:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function updateProcessStatus(id: string, estado: string) {
  try {
    await prisma.$connect()

    const process = await prisma.academicProcess.update({
      where: { id },
      data: { estado },
    })

    revalidatePath("/procesos")
    await prisma.$disconnect()

    return { success: true, process }
  } catch (error) {
    console.error("❌ Error updating process status:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al actualizar el estado del proceso" }
  }
}

export async function enrollStudentInProcess(studentId: string, processId: string) {
  try {
    await prisma.$connect()

    const enrollment = await prisma.studentProcess.create({
      data: {
        studentId,
        processId,
      },
      include: {
        student: true,
        process: true,
      },
    })

    revalidatePath("/procesos")
    await prisma.$disconnect()

    return { success: true, enrollment }
  } catch (error) {
    console.error("❌ Error enrolling student:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al inscribir el estudiante" }
  }
}
