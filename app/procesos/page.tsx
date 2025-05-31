import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, CheckCircle, Clock, Eye, Edit } from "lucide-react"
import { getAcademicProcesses, updateProcessStatus } from "@/lib/actions/process-actions"
import ProcessForm from "@/components/forms/process-form"

async function ProcessesList() {
  const processes = await getAcademicProcesses()

  async function handleStatusUpdate(id: string, estado: string) {
    "use server"
    await updateProcessStatus(id, estado)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Procesos Registrados</h2>
        <Badge variant="secondary">{processes.length} procesos</Badge>
      </div>

      <div className="grid gap-6">
        {processes.map((proceso) => (
          <Card key={proceso.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{proceso.nombre}</CardTitle>
                  <CardDescription className="mt-1">{proceso.descripcion}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{proceso.tipo}</Badge>
                  <Badge
                    variant={
                      proceso.estado === "Activo"
                        ? "default"
                        : proceso.estado === "Planificado"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {proceso.estado === "Activo" && <Clock className="mr-1 h-3 w-3" />}
                    {proceso.estado === "Completado" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {proceso.estado}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Inicio: {new Date(proceso.fechaInicio).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Fin: {new Date(proceso.fechaFin).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{proceso.estudiantes.length} estudiantes inscritos</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Gestionar
                </Button>
                <form
                  action={handleStatusUpdate.bind(
                    null,
                    proceso.id,
                    proceso.estado === "Activo" ? "Completado" : "Activo",
                  )}
                  className="inline"
                >
                  <Button variant="outline" size="sm" type="submit">
                    {proceso.estado === "Activo" ? "Completar" : "Activar"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ProcesosPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Procesos Académicos</h1>
          <p className="text-muted-foreground">Gestión de procesos del semestre actual y anteriores.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProcessForm />
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Cargando procesos...</div>}>
            <ProcessesList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
