import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, PieChart, Activity, Download, Eye, Plus } from "lucide-react"
import { getSystemStats, createProcessAnalysis, getProcessAnalyses } from "@/lib/actions/analysis-actions"

async function SystemStatsCards() {
  const stats = await getSystemStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Documentos Procesados</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalDocuments}</div>
          <p className="text-xs text-muted-foreground">{stats.pendingDocuments} pendientes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Procesos Activos</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeProcesses}</div>
          <p className="text-xs text-muted-foreground">{stats.completedProcesses} completados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasa de Completitud</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completionRate}%</div>
          <p className="text-xs text-muted-foreground">Documentos aprobados</p>
        </CardContent>
      </Card>
    </div>
  )
}

async function AnalysisForm() {
  async function handleCreateAnalysis(formData: FormData) {
    "use server"
    await createProcessAnalysis(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Análisis</CardTitle>
        <CardDescription>Genera un análisis personalizado del sistema</CardDescription>
      </CardHeader>
      <form action={handleCreateAnalysis}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="titulo" className="text-sm font-medium">
              Título del Análisis
            </label>
            <input
              id="titulo"
              name="titulo"
              className="w-full p-2 border rounded-md"
              placeholder="Ingresa el título"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tipo" className="text-sm font-medium">
              Tipo de Análisis
            </label>
            <select id="tipo" name="tipo" className="w-full p-2 border rounded-md" required>
              <option value="">Selecciona el tipo</option>
              <option value="Rendimiento">Análisis de Rendimiento</option>
              <option value="Estadistica">Análisis Estadístico</option>
              <option value="Tendencia">Análisis de Tendencias</option>
              <option value="Comparativo">Análisis Comparativo</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="descripcion" className="text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="w-full p-2 border rounded-md"
              placeholder="Descripción del análisis"
              rows={3}
            />
          </div>
        </CardContent>
        <div className="p-6 pt-0">
          <Button type="submit" className="w-full bg-black hover:bg-gray-800">
            <Plus className="mr-2 h-4 w-4" />
            Crear Análisis
          </Button>
        </div>
      </form>
    </Card>
  )
}

async function AnalysesList() {
  const analyses = await getProcessAnalyses()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Realizados</CardTitle>
        <CardDescription>Historial de análisis del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{analysis.titulo}</h4>
                  <p className="text-sm text-gray-600">{analysis.descripcion}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(analysis.createdAt).toLocaleDateString()} - {analysis.tipo}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
              {analysis.resultado && <div className="mt-2 p-2 bg-gray-50 rounded text-sm">{analysis.resultado}</div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalisisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Análisis de Procesos</h1>
        <p className="text-muted-foreground">Análisis estadístico y reportes del sistema académico.</p>
      </div>

      <Suspense fallback={<div>Cargando estadísticas...</div>}>
        <SystemStatsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisForm />
        <Suspense fallback={<div>Cargando análisis...</div>}>
          <AnalysesList />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Rendimiento</CardTitle>
            <CardDescription>Análisis detallado del rendimiento académico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Reporte de Estudiantes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Análisis de Tendencias
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Distribución por Carrera
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Exportar Datos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas del Sistema</CardTitle>
            <CardDescription>Estadísticas de uso y rendimiento del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" />
                Actividad del Sistema
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Uso de Módulos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Crecimiento de Datos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Ver Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
