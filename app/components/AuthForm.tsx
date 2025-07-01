'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError(null)

    // Validación
    if (!email || !password) {
      setError('Correo y contraseña son obligatorios.')
      return
    }

    if (isRegistering && (!displayName || !telefono)) {
      setError('Por favor completa todos los campos para registrarte.')
      return
    }

    setLoading(true)

    if (isRegistering) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      const userId = data.user?.id
      if (userId) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: userId, display_name: displayName, telefono }])

        if (insertError) {
          setError('Usuario creado, pero error al guardar perfil: ' + insertError.message)
          setLoading(false)
          return
        }
      }

      alert('Registro exitoso :)')
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        setError(loginError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="border mb-2 p-2 w-full"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border mb-2 p-2 w-full"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegistering && (
        <>
          <input
            className="border mb-2 p-2 w-full"
            type="text"
            placeholder="Nombre completo"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className="border mb-2 p-2 w-full"
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? isRegistering
            ? 'Registrando...'
            : 'Iniciando sesión...'
          : isRegistering
          ? 'Registrarse'
          : 'Iniciar sesión'}
      </button>

      <p className="text-sm text-center mt-4">
        {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering)
            setError(null)
          }}
          className="text-blue-600 underline"
        >
          {isRegistering ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  )
}
