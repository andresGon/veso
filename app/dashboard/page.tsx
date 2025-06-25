// app/dashboard/page.tsx o pages/dashboard.tsx
import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido al panel privado</h1>
      </main>
    </ProtectedRoute>
  )
}
