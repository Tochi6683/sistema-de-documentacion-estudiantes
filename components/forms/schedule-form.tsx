"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createScheduleEvent } from "@/lib/actions/schedule-actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ScheduleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createScheduleEvent(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "El evento ha sido creado correctamente.",
        })
        const form = document.getElementById("schedule-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo crear el evento.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crear Evento</CardTitle>
        <CardDescription>Completa el formulario para crear un nuevo evento en el cronograma.</CardDescription>
      </CardHeader>
      <form id="schedule-form" action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título del Evento *</Label>
            <Input id="titulo" name="titulo" placeholder="Ingresa el título del evento" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Evento *</Label>
              <Select name="tipo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academico">Académico</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                  <SelectItem value="Evaluacion">Evaluación</SelectItem>
                  <SelectItem value="Receso">Receso</SelectItem>
                  <SelectItem value="Evento">Evento Especial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" name="color" type="color" defaultValue="#3b82f6" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha y Hora de Inicio *</Label>
              <Input id="fechaInicio" name="fechaInicio" type="datetime-local" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha y Hora de Fin *</Label>
              <Input id="fechaFin" name="fechaFin" type="datetime-local" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción del evento"
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Evento"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
