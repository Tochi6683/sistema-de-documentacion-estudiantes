import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Database, AlertTriangle, CheckCircle, Terminal } from "lucide-react"
import DatabaseTest from "@/lib/database-test"

export default function DatabaseSetup() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Configuración de Base de Datos MySQL
          </CardTitle>
          <CardDescription>Pasos para configurar tu base de datos en phpMyAdmin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Asegúrate de tener XAMPP, WAMP o MAMP ejecutándose con MySQL activo.</AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                1
              </Badge>
              <div>
                <h4 className="font-medium">Abrir phpMyAdmin</h4>
                <p className="text-sm text-muted-foreground">Ve a http://localhost/phpmyadmin</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                2
              </Badge>
              <div>
                <h4 className="font-medium">Crear Base de Datos</h4>
                <p className="text-sm text-muted-foreground">
                  Crea una nueva base de datos llamada{" "}
                  <code className="bg-gray-100 px-1 rounded">sistema_academico</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                3
              </Badge>
              <div>
                <h4 className="font-medium">Configurar .env</h4>
                <p className="text-sm text-muted-foreground">
                  Actualiza tu archivo .env con las credenciales correctas
                </p>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <code className="text-sm">DATABASE_URL="mysql://root:@localhost:3306/sistema_academico"</code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1">
                4
              </Badge>
              <div>
                <h4 className="font-medium">Ejecutar Migraciones</h4>
                <p className="text-sm text-muted-foreground">Ejecuta estos comandos en tu terminal:</p>
                <div className="mt-2 p-3 bg-gray-900 text-white rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4" />
                    <span className="text-sm">Terminal</span>
                  </div>
                  <code className="text-sm block">npx prisma generate</code>
                  <code className="text-sm block">npx prisma db push</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DatabaseTest />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Verificación Final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Una vez completados todos los pasos, deberías poder ver las tablas creadas en phpMyAdmin y el formulario de
            estudiantes debería guardar datos correctamente.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
