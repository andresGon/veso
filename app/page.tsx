'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

interface Product {
  id: number
  title: string
  images: string
}

export default function Home() {
  const [productos, setProductos] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        console.error('Error al obtener productos:', error.message)
        setError(error.message)
      } else {
        setProductos(data as Product[])
      }
    }

    fetchProductos()
  }, [])

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <li key={prod.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            {prod.images && (
              <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                <img 
                  src={`${prod.images}`}
                  alt={prod.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold">{prod.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  )
}
