'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabaseClient'
import HeaderTop from './components/HeaderTop'
import Header from './components/Header'
import Footer from './components/Footer'
import PerksHome from './components/PerksHome'
import HeroCarousel from './components/HeroCarousel'
import ProductCard from './components/ProductCard'

interface Product {
  id: number
  title: string
  price: number
  images: string[]
  slug: string
  gender?: string
}

export default function Home() {
  const [productos, setProductos] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all')

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, price, images, slug, gender')

        if (error) throw error
        setProductos(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  if (loading) return <div className="text-center p-4">Cargando...</div>
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>

  return (
    <>
      <HeaderTop />
      <Header />
      <HeroCarousel />
      <PerksHome />

      <main className="container mx-auto p-4">
        {/* Filtro de género */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedGender('all')}
            className={`px-4 py-2 rounded ${
              selectedGender === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-black'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedGender('men')}
            className={`px-4 py-2 rounded ${
              selectedGender === 'men' ? 'bg-black text-white' : 'bg-gray-100 text-black'
            }`}
          >
            Hombre
          </button>
          <button
            onClick={() => setSelectedGender('women')}
            className={`px-4 py-2 rounded ${
              selectedGender === 'women' ? 'bg-black text-white' : 'bg-gray-100 text-black'
            }`}
          >
            Mujer
          </button>
        </div>

        {/* Lista de productos filtrada */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos
            .filter((prod) =>
              selectedGender === 'all' ? true : prod.gender === selectedGender
            )
            .map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
        </ul>
      </main>

      <Footer />
    </>
  )
}
