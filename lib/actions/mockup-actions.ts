"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface MockupFormData {
  titulo: string
  descripcion?: string
  categoria: string
  archivo?: string
  version?: string
}

export async function createMockup(formData: FormData) {
  try {
    await prisma.$connect()

    const data: MockupFormData = {
      titulo: formData.get("titulo") as string,
      descripcion: (formData.get("descripcion") as string) || undefined,
      categoria: formData.get("categoria") as string,
      archivo: (formData.get("archivo") as string) || undefined,
      version: (formData.get("version") as string) || "1.0",
    }

    if (!data.titulo || !data.categoria) {
      throw new Error("Los campos título y categoría son obligatorios")
    }

    const mockup = await prisma.mockup.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        categoria: data.categoria,
        archivo: data.archivo,
        version: data.version || "1.0",
      },
    })

    revalidatePath("/mockups")
    await prisma.$disconnect()

    return { success: true, mockup }
  } catch (error) {
    console.error("❌ Error creating mockup:", error)
    await prisma.$disconnect()

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el mockup",
    }
  }
}

export async function getMockups() {
  try {
    await prisma.$connect()

    const mockups = await prisma.mockup.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    await prisma.$disconnect()
    return mockups
  } catch (error) {
    console.error("❌ Error fetching mockups:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function updateMockupStatus(id: string, estado: string) {
  try {
    await prisma.$connect()

    const mockup = await prisma.mockup.update({
      where: { id },
      data: { estado },
    })

    revalidatePath("/mockups")
    await prisma.$disconnect()

    return { success: true, mockup }
  } catch (error) {
    console.error("❌ Error updating mockup status:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al actualizar el estado del mockup" }
  }
}

export async function deleteMockup(id: string) {
  try {
    await prisma.$connect()

    await prisma.mockup.delete({
      where: { id },
    })

    revalidatePath("/mockups")
    await prisma.$disconnect()

    return { success: true }
  } catch (error) {
    console.error("❌ Error deleting mockup:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al eliminar el mockup" }
  }
}
