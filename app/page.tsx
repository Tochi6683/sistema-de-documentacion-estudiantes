import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, UserPlus, FileText, BookOpen, Users, Calendar, BarChart3 } from "lucide-react"

const modules = [
  {
    title: "Ingreso de Estudiantes",
    description: "Registro y gestión de estudiantes",
    content: "Accede al módulo de registro y gestión de información de estudiantes.",
    href: "/estudiantes",
    icon: UserPlus,
  },
  {
    title: "Documentos de Estudiantes",
    description: "Gestión de documentación estudiantil",
    content: "Accede a los documentos de los estudiantes organizados por carpetas.",
    href: "/documentos",
    icon: FileText,
  },
  {
    title: "Estudio de Documentación",
    description: "Análisis de documentación actual",
    content: "Accede al estudio y análisis de la documentación existente en el sistema.",
    href: "/estudio-documentacion",
    icon: BookOpen,
  },
  {
    title: "Procesos Académicos",
    description: "Gestión de procesos del semestre",
    content: "Accede a los procesos académicos del semestre actual y anteriores.",
    href: "/procesos",
    icon: Users,
  },
  {
    title: "Cronograma",
    description: "Planificación y seguimiento del semestre",
    content: "Visualiza y gestiona el cronograma de actividades académicas.",
    href: "/cronograma",
    icon: Calendar,
  },
  {
    title: "Análisis de Procesos",
    description: "Análisis estadístico de procesos",
    content: "Accede a los análisis y reportes estadísticos del sistema.",
    href: "/analisis",
    icon: BarChart3,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gestión Académica</h1>
        <p className="text-gray-600">Gestiona todos los aspectos académicos desde un solo lugar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <module.icon className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{module.content}</p>
              <Link href={module.href}>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Acceder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
