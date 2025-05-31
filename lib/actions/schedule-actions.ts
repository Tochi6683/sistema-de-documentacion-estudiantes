"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export interface ScheduleFormData {
  titulo: string
  descripcion?: string
  fechaInicio: string
  fechaFin: string
  tipo: string
  color?: string
}

export async function createScheduleEvent(formData: FormData) {
  try {
    await prisma.$connect()

    const data: ScheduleFormData = {
      titulo: formData.get("titulo") as string,
      descripcion: (formData.get("descripcion") as string) || undefined,
      fechaInicio: formData.get("fechaInicio") as string,
      fechaFin: formData.get("fechaFin") as string,
      tipo: formData.get("tipo") as string,
      color: (formData.get("color") as string) || "#3b82f6",
    }

    if (!data.titulo || !data.fechaInicio || !data.fechaFin || !data.tipo) {
      throw new Error("Los campos título, fechas y tipo son obligatorios")
    }

    const event = await prisma.schedule.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        tipo: data.tipo,
        color: data.color || "#3b82f6",
      },
    })

    revalidatePath("/cronograma")
    await prisma.$disconnect()

    return { success: true, event }
  } catch (error) {
    console.error("❌ Error creating schedule event:", error)
    await prisma.$disconnect()

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al crear el evento",
    }
  }
}

export async function getScheduleEvents() {
  try {
    await prisma.$connect()

    const events = await prisma.schedule.findMany({
      orderBy: {
        fechaInicio: "asc",
      },
    })

    await prisma.$disconnect()
    return events
  } catch (error) {
    console.error("❌ Error fetching schedule events:", error)
    await prisma.$disconnect()
    return []
  }
}

export async function updateEventStatus(id: string, estado: string) {
  try {
    await prisma.$connect()

    const event = await prisma.schedule.update({
      where: { id },
      data: { estado },
    })

    revalidatePath("/cronograma")
    await prisma.$disconnect()

    return { success: true, event }
  } catch (error) {
    console.error("❌ Error updating event status:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al actualizar el estado del evento" }
  }
}

export async function deleteScheduleEvent(id: string) {
  try {
    await prisma.$connect()

    await prisma.schedule.delete({
      where: { id },
    })

    revalidatePath("/cronograma")
    await prisma.$disconnect()

    return { success: true }
  } catch (error) {
    console.error("❌ Error deleting schedule event:", error)
    await prisma.$disconnect()

    return { success: false, error: "Error al eliminar el evento" }
  }
}
