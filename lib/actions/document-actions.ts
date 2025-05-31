"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface DocumentFormData {
  titulo: string
  tipo: string
  descripcion?: string
  archivo?: string
  studentId: string
}

export async function createDocument(formData: FormData) {
  try {
    await prisma.$connect()

    const data: DocumentFormData = {
      titulo: formData.get("titulo") as string,
      tipo: formData.get("tipo") as string,
      descripcion: (formData.get("descripcion") as string) || undefined,
      archivo: (formData.get("archivo") as string) || undefined,
      studentId: formData.get("studentId") as string,
    }

    if (!data.titulo || !data.tipo || !data.studentId) {
      throw new Error("Los campos título, tipo y estudiante son obligatorios")
    }

    const document = await prisma.document.create({
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        descripcion: data.descripcion,
        archivo: data.archivo,
        studentId: data.studentId,
      },
      include: {
        student: true,
      },
    })

    revalidatePath("/documentos")
    await prisma.$disconnect()

    return { success: true, document }
  } catch (error) {
    console.error("❌ Error creating document:", error)
    await prisma.$disconnect()

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el documento",
    }
  }
}

export async function getDocuments() {
  try {
    await prisma.$connect()

    const documents = await prisma.document.findMany({
      include: {
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    await prisma.$disconnect()
    return documents
  } catch (error) {
    console.error("❌ Error fetching documents:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function getDocumentsByType(tipo: string) {
  try {
    await prisma.$connect()

    const documents = await prisma.document.findMany({
      where: { tipo },
      include: {
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    await prisma.$disconnect()
    return documents
  } catch (error) {
    console.error("❌ Error fetching documents by type:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function updateDocumentStatus(id: string, estado: string) {
  try {
    await prisma.$connect()

    const document = await prisma.document.update({
      where: { id },
      data: { estado },
      include: {
        student: true,
      },
    })

    revalidatePath("/documentos")
    await prisma.$disconnect()

    return { success: true, document }
  } catch (error) {
    console.error("❌ Error updating document status:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al actualizar el estado del documento" }
  }
}

export async function deleteDocument(id: string) {
  try {
    await prisma.$connect()

    await prisma.document.delete({
      where: { id },
    })

    revalidatePath("/documentos")
    await prisma.$disconnect()

    return { success: true }
  } catch (error) {
    console.error("❌ Error deleting document:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al eliminar el documento" }
  }
}
