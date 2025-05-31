"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createAcademicProcess } from "@/lib/actions/process-actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ProcessForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createAcademicProcess(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "El proceso académico ha sido creado correctamente.",
        })
        const form = document.getElementById("process-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo crear el proceso.",
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
        <CardTitle>Crear Proceso Académico</CardTitle>
        <CardDescription>Completa el formulario para crear un nuevo proceso académico.</CardDescription>
      </CardHeader>
      <form id="process-form" action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Proceso *</Label>
            <Input id="nombre" name="nombre" placeholder="Ingresa el nombre del proceso" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Proceso *</Label>
              <Select name="tipo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proceso">Proceso General</SelectItem>
                  <SelectItem value="Evaluacion">Evaluación</SelectItem>
                  <SelectItem value="Evento">Evento</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semestre">Semestre *</Label>
              <Input id="semestre" name="semestre" placeholder="2024-1" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
              <Input id="fechaInicio" name="fechaInicio" type="datetime-local" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha de Fin *</Label>
              <Input id="fechaFin" name="fechaFin" type="datetime-local" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción del proceso académico"
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
              "Crear Proceso"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
