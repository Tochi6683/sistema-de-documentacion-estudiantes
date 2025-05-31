import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, Trash2 } from "lucide-react"
import { getScheduleEvents, updateEventStatus, deleteScheduleEvent } from "@/lib/actions/schedule-actions"
import ScheduleForm from "@/components/forms/schedule-form"

async function EventsList() {
  const events = await getScheduleEvents()

  async function handleStatusUpdate(id: string, estado: string) {
    "use server"
    await updateEventStatus(id, estado)
  }

  async function handleDelete(id: string) {
    "use server"
    await deleteScheduleEvent(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Eventos Programados</h2>
        <Badge variant="secondary">{events.length} eventos</Badge>
      </div>

      <div className="grid gap-4">
        {events.map((evento) => (
          <Card key={evento.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: evento.color }} />
                    {evento.titulo}
                  </CardTitle>
                  <CardDescription className="mt-1">{evento.descripcion}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{evento.tipo}</Badge>
                  <Badge variant={evento.estado === "Completado" ? "default" : "secondary"}>{evento.estado}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(evento.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(evento.fechaFin).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                  <form
                    action={handleStatusUpdate.bind(
                      null,
                      evento.id,
                      evento.estado === "Completado" ? "Programado" : "Completado",
                    )}
                    className="inline"
                  >
                    <Button variant="outline" size="sm" type="submit">
                      {evento.estado === "Completado" ? "Reactivar" : "Completar"}
                    </Button>
                  </form>
                  <form action={handleDelete.bind(null, evento.id)} className="inline">
                    <Button variant="ghost" size="sm" type="submit">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function CronogramaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cronograma</h1>
          <p className="text-muted-foreground">Planificación y seguimiento del semestre académico.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ScheduleForm />
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Cargando eventos...</div>}>
            <EventsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
