import { Suspense } from "react"
import StudentForm from "@/components/forms/student-form"
import StudentsList from "@/components/lists/students-list"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function StudentsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function EstudiantesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ingreso de Estudiantes</h1>
        <p className="text-muted-foreground">Registra y gestiona la información de los estudiantes del sistema.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <StudentForm />
        </div>

        <div>
          <Suspense fallback={<StudentsListSkeleton />}>
            <StudentsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
