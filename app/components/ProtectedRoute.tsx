'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login') // Redirige si no está autenticado
      } else {
        setLoading(false)
      }
    }

    getSession()
  }, [router])

  if (loading) return <p className="text-center p-4">Cargando...</p>

  return (
    <div className="relative">
      <Link 
        href="/" 
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
      >
        Inicio
      </Link>
      {children}
    </div>
  )
}
