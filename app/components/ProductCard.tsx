// components/ProductCard.tsx
'use client'

import Link from 'next/link'
import { useCart } from '../hooks/useCart'

interface Product {
  id: number
  title: string
  price: number
  images: string[]
  slug: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, loading } = useCart()

  const handleAddToCart = () => {
    addToCart(product.id, product.price)
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img
        src={product.images?.[0] || '/images/no_image.png'}
        alt={product.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>

      <div className="flex justify-between items-center">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm text-blue-600 underline"
        >
          Ver detalles
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-gray-800 transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
