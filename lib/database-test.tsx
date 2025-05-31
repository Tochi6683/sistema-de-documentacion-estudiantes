"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Loader2 } from "lucide-react"

export default function DatabaseTest() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function testDatabaseConnection() {
    setIsTestingConnection(true)
    setConnectionStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/test-db", {
        method: "POST",
      })

      const result = await response.json()

      if (result.success) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
        setErrorMessage(result.error || "Error desconocido")
      }
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage("Error de conexión con el servidor")
    } finally {
      setIsTestingConnection(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Test de Conexión
        </CardTitle>
        <CardDescription>Verifica la conexión a la base de datos MySQL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testDatabaseConnection} disabled={isTestingConnection} className="w-full">
          {isTestingConnection ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Probando conexión...
            </>
          ) : (
            "Probar Conexión"
          )}
        </Button>

        {connectionStatus !== "idle" && (
          <div className="flex items-center gap-2">
            {connectionStatus === "success" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Badge variant="default" className="bg-green-500">
                  Conexión Exitosa
                </Badge>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <Badge variant="destructive">Conexión Fallida</Badge>
              </>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
