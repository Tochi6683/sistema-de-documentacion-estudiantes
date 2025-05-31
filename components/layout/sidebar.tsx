"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, UserPlus, FileText, BookOpen, Settings, Calendar, BarChart3, Layers, Users } from "lucide-react"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Ingreso de Estudiantes", href: "/estudiantes", icon: UserPlus },
  { name: "Documentos de Estudiantes", href: "/documentos", icon: FileText },
  { name: "Estudio de Documentación", href: "/estudio-documentacion", icon: BookOpen },
  { name: "Procesos Académicos", href: "/procesos", icon: Users },
  { name: "Análisis de Procesos", href: "/analisis", icon: BarChart3 },
  { name: "Mockups", href: "/mockups", icon: Layers },
  { name: "Cronograma", href: "/cronograma", icon: Calendar },
  { name: "Configuración", href: "/configuracion", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Navegación</h2>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
