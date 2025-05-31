"use client"

import { Bell, Sun, Moon, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-900">Sistema Académico</h1>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="sm">
            <LogIn className="h-5 w-5 mr-2" />
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
