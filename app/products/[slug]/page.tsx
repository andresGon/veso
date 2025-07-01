// app/products/[slug]/page.tsx

import { supabase } from '@/app/lib/supabaseClient'
import { notFound } from 'next/navigation'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface PageProps {
  params: { slug: string }
}

export default async function ProductDetail({ params }: PageProps) {
  // ✅ el acceso a params.slug está dentro de una función async
  const slug = params.slug

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product || error) return notFound()

  return (
    <>
    <HeaderTop />
    <Header />
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.images?.[0] || '/images/no_image.png'}
          alt={product.title}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-2">${product.price?.toFixed(2)}</p>
          {product.discount && (
            <p className="text-xl text-red-600 mb-2">Descuento: {product.discount}</p>
          )}
          {product.description && (
            <p className="text-gray-600 mb-6">{product.description}</p>
          )}
          <p>{product.gender}</p>
          <p>{product.category_men}</p>
          <p>{product.category_women}</p>
          <p>Calificación: {product.rating}</p>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
