import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Eye, Download, Edit, Trash2 } from "lucide-react"
import { getMockups, updateMockupStatus, deleteMockup } from "@/lib/actions/mockup-actions"
import MockupForm from "@/components/forms/mockup-form"

async function MockupsList() {
  const mockups = await getMockups()

  async function handleStatusUpdate(id: string, estado: string) {
    "use server"
    await updateMockupStatus(id, estado)
  }

  async function handleDelete(id: string) {
    "use server"
    await deleteMockup(id)
  }

  const mockupsByCategory = mockups.reduce(
    (acc, mockup) => {
      if (!acc[mockup.categoria]) {
        acc[mockup.categoria] = []
      }
      acc[mockup.categoria].push(mockup)
      return acc
    },
    {} as Record<string, typeof mockups>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mockups del Sistema</h2>
        <Badge variant="secondary">{mockups.length} mockups</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(mockupsByCategory).map(([categoria, categoryMockups]) => (
          <div key={categoria} className="space-y-4">
            <h3 className="text-lg font-semibold">{categoria}</h3>
            {categoryMockups.map((mockup) => (
              <Card key={mockup.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    {mockup.titulo}
                  </CardTitle>
                  <CardDescription>{mockup.descripcion}</CardDescription>
                  <div className="flex gap-2">
                    <Badge variant="outline">v{mockup.version}</Badge>
                    <Badge
                      variant={
                        mockup.estado === "Implementado"
                          ? "default"
                          : mockup.estado === "Aprobado"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {mockup.estado}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Mockup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                      <form
                        action={handleStatusUpdate.bind(
                          null,
                          mockup.id,
                          mockup.estado === "Implementado" ? "Borrador" : "Implementado",
                        )}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" type="submit" className="w-full">
                          {mockup.estado === "Implementado" ? "Revertir" : "Implementar"}
                        </Button>
                      </form>
                      <form action={handleDelete.bind(null, mockup.id)}>
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
        ))}
      </div>
    </div>
  )
}

export default function MockupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mockups</h1>
          <p className="text-muted-foreground">Prototipos y diseños del sistema académico.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <MockupForm />
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Cargando mockups...</div>}>
            <MockupsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
