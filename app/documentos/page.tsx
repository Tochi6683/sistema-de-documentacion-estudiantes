import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download } from "lucide-react"
import { getDocuments } from "@/lib/actions/document-actions"
import DocumentForm from "@/components/forms/document-form"

async function DocumentsList() {
  const documents = await getDocuments()

  const documentsByType = {
    identidad: documents.filter((doc) => doc.tipo === "identidad"),
    academico: documents.filter((doc) => doc.tipo === "academico"),
    medico: documents.filter((doc) => doc.tipo === "medico"),
    financiero: documents.filter((doc) => doc.tipo === "financiero"),
    legal: documents.filter((doc) => doc.tipo === "legal"),
    otros: documents.filter((doc) => doc.tipo === "otros"),
  }

  const typeLabels = {
    identidad: "Documentos de Identidad",
    academico: "Certificados Académicos",
    medico: "Documentos Médicos",
    financiero: "Documentos Financieros",
    legal: "Documentos Legales",
    otros: "Otros Documentos",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(documentsByType).map(([tipo, docs]) => (
        <Card key={tipo}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {typeLabels[tipo as keyof typeof typeLabels]}
            </CardTitle>
            <CardDescription>
              {docs.length} documento{docs.length !== 1 ? "s" : ""} registrado{docs.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {docs.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{doc.titulo}</p>
                    <p className="text-xs text-gray-500">
                      {doc.student.nombre} {doc.student.apellido}
                    </p>
                  </div>
                  <Badge
                    variant={
                      doc.estado === "Aprobado" ? "default" : doc.estado === "Pendiente" ? "secondary" : "destructive"
                    }
                  >
                    {doc.estado}
                  </Badge>
                </div>
              ))}
              {docs.length > 3 && <p className="text-xs text-gray-500">+{docs.length - 3} más...</p>}
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Ver Todos ({docs.length})
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Descargar Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function DocumentosPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documentos de Estudiantes</h1>
          <p className="text-muted-foreground">Gestiona la documentación estudiantil organizada por categorías.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DocumentForm />
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Cargando documentos...</div>}>
            <DocumentsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
