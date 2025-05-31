"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createDocument } from "@/lib/actions/document-actions"
import { getStudents } from "@/lib/actions/student-actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function DocumentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    async function loadStudents() {
      const studentsData = await getStudents()
      setStudents(studentsData)
    }
    loadStudents()
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createDocument(formData)

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "El documento ha sido registrado correctamente.",
        })
        const form = document.getElementById("document-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo registrar el documento.",
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
        <CardTitle>Registro de Documento</CardTitle>
        <CardDescription>Completa el formulario para registrar un nuevo documento.</CardDescription>
      </CardHeader>
      <form id="document-form" action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Documento *</Label>
              <Input id="titulo" name="titulo" placeholder="Ingresa el título" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Documento *</Label>
              <Select name="tipo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identidad">Documentos de Identidad</SelectItem>
                  <SelectItem value="academico">Certificados Académicos</SelectItem>
                  <SelectItem value="medico">Documentos Médicos</SelectItem>
                  <SelectItem value="financiero">Documentos Financieros</SelectItem>
                  <SelectItem value="legal">Documentos Legales</SelectItem>
                  <SelectItem value="otros">Otros Documentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Estudiante *</Label>
            <Select name="studentId" required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estudiante" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.nombre} {student.apellido} - {student.cedula}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción del documento"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="archivo">Archivo (URL o ruta)</Label>
            <Input id="archivo" name="archivo" placeholder="URL del archivo o ruta" />
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
              "Registrar Documento"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
