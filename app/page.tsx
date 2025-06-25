'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

interface Product {
  id: number
  title: string
  price: number
  images: string[]
}

export default function Home() {
  const [productos, setProductos] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, price, images')
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
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <li
            key={prod.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-[1/1] overflow-hidden rounded-md group mb-4">
              <img
                src={prod.images?.[0] || './images/no_image.png'}
                alt={prod.title}
                className={`absolute inset-0 w-full h-full object-cover transition duration-300 transform group-hover:scale-105 ${
                  prod.images?.[1] ? 'opacity-100 group-hover:opacity-0' : ''
                }`}
              />
              {prod.images?.[1] && (
                <img
                  src={prod.images[1]}
                  alt={`${prod.title} hover`}
                  className="absolute inset-0 w-full h-full object-cover transition duration-300 transform group-hover:scale-105 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>

            <h2 className="text-lg font-semibold mb-2">{prod.title}</h2>
            <span className="text-2xl font-bold">${prod.price?.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
