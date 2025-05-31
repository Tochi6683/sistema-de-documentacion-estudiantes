import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Database, Bell } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground">Configuración general del sistema académico.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración General
            </CardTitle>
            <CardDescription>Configuraciones básicas del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Nombre de la Institución</Label>
                <Input id="institution" placeholder="Universidad Ejemplo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semestre Actual</Label>
                <Input id="semester" placeholder="2024-1" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance" />
              <Label htmlFor="maintenance">Modo de Mantenimiento</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Configuración de Base de Datos
            </CardTitle>
            <CardDescription>Configuración de conexión a MySQL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" placeholder="localhost" defaultValue="localhost" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-port">Puerto</Label>
                <Input id="db-port" placeholder="3306" defaultValue="3306" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-name">Base de Datos</Label>
                <Input id="db-name" placeholder="sistema_academico" defaultValue="sistema_academico" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-user">Usuario</Label>
                <Input id="db-user" placeholder="root" defaultValue="root" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>Configuración de notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="email-notifications" />
              <Label htmlFor="email-notifications">Notificaciones por Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="push-notifications" />
              <Label htmlFor="push-notifications">Notificaciones Push</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="sms-notifications" />
              <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
