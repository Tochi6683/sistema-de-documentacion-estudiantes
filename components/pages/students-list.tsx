import { getStudents, deleteStudent } from "@/lib/actions/student-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default async function StudentsList() {
  const students = await getStudents()

  async function handleDelete(id: string) {
    "use server"
    await deleteStudent(id)
  }

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No hay estudiantes registrados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Estudiantes Registrados</h2>
        <Badge variant="secondary">{students.length} estudiantes</Badge>
      </div>

      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {student.nombre} {student.apellido}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{student.carrera}</Badge>
                    <span>•</span>
                    <span>{student.semestre}° Semestre</span>
                  </CardDescription>
                </div>
                <form action={handleDelete.bind(null, student.id)}>
                  <Button variant="ghost" size="sm" type="submit">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </form>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                {student.telefono && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.telefono}</span>
                  </div>
                )}
                {student.fechaNacimiento && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(student.fechaNacimiento).toLocaleDateString()}</span>
                  </div>
                )}
                {student.direccion && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{student.direccion}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
