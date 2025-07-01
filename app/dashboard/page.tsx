'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  const [profile, setProfile] = useState<{
    display_name: string
    telefono: string
    email: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        setError('No se pudo obtener la sesión.')
        return
      }

      const userId = session.user.id
      const email = session.user.email || ''

      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, telefono')
        .eq('id', userId)
        .single()

      if (error) {
        setError('Error al cargar el perfil: ' + error.message)
      } else {
        setProfile({ ...data, email })
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <ProtectedRoute>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al panel privado</h1>

        {error && <p className="text-red-500">{error}</p>}

        {profile ? (
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {profile.display_name}</p>
            <p><strong>Teléfono:</strong> {profile.telefono}</p>
            <p><strong>Correo electrónico:</strong> {profile.email}</p>
          </div>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </main>
    </ProtectedRoute>
  )
}
