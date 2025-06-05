"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createMockup } from "@/lib/actions/mockup-actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function MockupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createMockup(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "El mockup ha sido creado correctamente.",
        })
        const form = document.getElementById("mockup-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo crear el mockup.",
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
        <CardTitle>Crear Mockup</CardTitle>
        <CardDescription>Complete el formulario para crear un nuevo mockup del sistema.</CardDescription>
      </CardHeader>
      <form id="mockup-form" action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título del Mockup *</Label>
            <Input id="titulo" name="titulo" placeholder="Ingresa el título del mockup" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select name="categoria" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dashboard">Dashboard</SelectItem>
                  <SelectItem value="Formulario">Formulario</SelectItem>
                  <SelectItem value="Reporte">Reporte</SelectItem>
                  <SelectItem value="Interfaz">Interfaz</SelectItem>
                  <SelectItem value="Navegacion">Navegación</SelectItem>
                  <SelectItem value="Modal">Modal/Dialog</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Versión</Label>
              <Input id="version" name="version" placeholder="1.0" defaultValue="1.0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripcion del mockup"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="archivo">Archivo (URL o ruta)</Label>
            <Input id="archivo" name="archivo" placeholder="URL del archivo o ruta del mockup" />
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
              "Crear Mockup"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
