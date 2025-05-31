import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, BarChart3, FileSearch, TrendingUp } from "lucide-react"

export default function EstudioDocumentacionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Estudio de Documentación</h1>
        <p className="text-muted-foreground">Análisis y estudio de la documentación existente en el sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5" />
              Análisis de Documentos
            </CardTitle>
            <CardDescription>Revisa y analiza la documentación actual</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Herramientas para analizar la calidad y completitud de los documentos estudiantiles.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Iniciar Análisis</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estadísticas de Documentación
            </CardTitle>
            <CardDescription>Métricas y estadísticas de documentos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Visualiza estadísticas sobre el estado de la documentación estudiantil.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Ver Estadísticas</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencias de Documentación
            </CardTitle>
            <CardDescription>Análisis de tendencias temporales</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Identifica patrones y tendencias en la documentación a lo largo del tiempo.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Analizar Tendencias</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Reportes de Documentación
            </CardTitle>
            <CardDescription>Genera reportes detallados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Crea reportes personalizados sobre el estado de la documentación.
            </p>
            <Button className="w-full bg-black hover:bg-gray-800">Generar Reporte</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
