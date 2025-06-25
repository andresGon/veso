'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard') // Ruta protegida
    }
  }

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert('Revisa tu correo para confirmar tu cuenta')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login / Registro</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border mb-2 p-2 w-full"
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border mb-2 p-2 w-full"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={handleLogin}>
        Iniciar sesión
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  )
}
