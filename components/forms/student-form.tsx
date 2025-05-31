"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createStudent } from "@/lib/actions/student-actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function StudentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createStudent(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "El estudiante ha sido registrado correctamente.",
        })
        // Limpiar el formulario
        const form = document.getElementById("student-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo registrar el estudiante.",
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
        <CardTitle>Registro de Estudiante</CardTitle>
        <CardDescription>Completa el formulario para registrar un nuevo estudiante en el sistema.</CardDescription>
      </CardHeader>
      <form id="student-form" action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input id="nombre" name="nombre" placeholder="Ingresa el nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input id="apellido" name="apellido" placeholder="Ingresa el apellido" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cedula">Cédula *</Label>
              <Input id="cedula" name="cedula" placeholder="Número de cédula" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="estudiante@ejemplo.com" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" placeholder="Número de teléfono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input id="fechaNacimiento" name="fechaNacimiento" type="date" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carrera">Carrera *</Label>
              <Select name="carrera" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una carrera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingenieria-sistemas">Ingeniería de Sistemas</SelectItem>
                  <SelectItem value="ingenieria-industrial">Ingeniería Industrial</SelectItem>
                  <SelectItem value="administracion">Administración de Empresas</SelectItem>
                  <SelectItem value="contaduria">Contaduría Pública</SelectItem>
                  <SelectItem value="derecho">Derecho</SelectItem>
                  <SelectItem value="medicina">Medicina</SelectItem>
                  <SelectItem value="psicologia">Psicología</SelectItem>
                  <SelectItem value="arquitectura">Arquitectura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semestre">Semestre *</Label>
              <Select name="semestre" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el semestre" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}° Semestre
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              name="direccion"
              placeholder="Dirección completa del estudiante"
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar Estudiante"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
