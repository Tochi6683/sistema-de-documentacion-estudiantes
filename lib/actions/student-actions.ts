"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface StudentFormData {
  nombre: string
  apellido: string
  email: string
  telefono?: string
  carrera: string
  semestre: number
  fechaNacimiento?: string
  direccion?: string
  cedula: string
}

export async function createStudent(formData: FormData) {
  try {
    const data: StudentFormData = {
      nombre: formData.get("nombre") as string,
      apellido: formData.get("apellido") as string,
      email: formData.get("email") as string,
      telefono: (formData.get("telefono") as string) || undefined,
      carrera: formData.get("carrera") as string,
      semestre: Number.parseInt(formData.get("semestre") as string),
      fechaNacimiento: (formData.get("fechaNacimiento") as string) || undefined,
      direccion: (formData.get("direccion") as string) || undefined,
      cedula: formData.get("cedula") as string,
    }

    // Validaciones
    if (!data.nombre || !data.apellido || !data.email || !data.carrera || !data.cedula) {
      throw new Error("Los campos nombre, apellido, email, carrera y cédula son obligatorios")
    }

    if (data.semestre < 1 || data.semestre > 12) {
      throw new Error("El semestre debe estar entre 1 y 12")
    }

    // Verificar si ya existe un estudiante con esa cédula o email
    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ email: data.email }, { cedula: data.cedula }],
      },
    })

    if (existingStudent) {
      throw new Error("Ya existe un estudiante con esa cédula o email")
    }

    // Crear el estudiante
    const student = await prisma.student.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        carrera: data.carrera,
        semestre: data.semestre,
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : undefined,
        direccion: data.direccion,
        cedula: data.cedula,
      },
    })

    revalidatePath("/estudiantes")
    return { success: true, student }
  } catch (error) {
    console.error("Error creating student:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el estudiante",
    }
  }
}

export async function getStudents() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return students
  } catch (error) {
    console.error("Error fetching students:", error)
    return []
  }
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id },
    })
    revalidatePath("/estudiantes")
    return { success: true }
  } catch (error) {
    console.error("Error deleting student:", error)
    return { success: false, error: "Error al eliminar el estudiante" }
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    const data: Partial<StudentFormData> = {
      nombre: formData.get("nombre") as string,
      apellido: formData.get("apellido") as string,
      email: formData.get("email") as string,
      telefono: (formData.get("telefono") as string) || undefined,
      carrera: formData.get("carrera") as string,
      semestre: Number.parseInt(formData.get("semestre") as string),
      fechaNacimiento: (formData.get("fechaNacimiento") as string) || undefined,
      direccion: (formData.get("direccion") as string) || undefined,
      cedula: formData.get("cedula") as string,
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...data,
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : undefined,
      },
    })

    revalidatePath("/estudiantes")
    return { success: true, student }
  } catch (error) {
    console.error("Error updating student:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al actualizar el estudiante",
    }
  }
}
