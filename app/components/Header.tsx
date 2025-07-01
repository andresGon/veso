'use client'

import { useEffect, useState } from 'react'
import {
  FaShoppingBag,
  FaSignOutAlt,
  FaSignInAlt,
  FaChevronDown,
} from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [displayName, setDisplayName] = useState<string>('')

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)

      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', session.user.id)
          .single()

        if (!error && data?.display_name) {
          const firstName = data.display_name.split(' ')[0]
          setDisplayName(firstName)
        }
      }
    }

    getSessionAndProfile()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)

        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', session.user.id)
            .single()

          if (!error && data?.display_name) {
            const firstName = data.display_name.split(' ')[0]
            setDisplayName(firstName)
          } else {
            setDisplayName('')
          }
        } else {
          setDisplayName('')
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setDisplayName('')
    router.push('/')
  }

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-5xl font-semibold">Veso</div>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-black/70">
            Shop <FaChevronDown className="text-xs" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-black/70">
            Blog
          </div>
          <div className="cursor-pointer hover:text-black/70">Contact</div>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-lg text-black">
          {/* Nombre del usuario */}
          {session && (
            <span className="text-sm font-medium hidden md:inline">
              hola &nbsp;
              {displayName}
            </span>
          )}

          {/* Carrito */}
          <button className="relative">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* Botón login/logout */}
          {session ? (
            <button onClick={handleLogout} title="Cerrar sesión">
              <FaSignOutAlt />
            </button>
          ) : (
            <button onClick={handleLoginRedirect} title="Iniciar sesión">
              <FaSignInAlt />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
