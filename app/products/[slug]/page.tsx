// app/products/[slug]/page.tsx

import { supabase } from '@/app/lib/supabaseClient'
import { notFound } from 'next/navigation'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGallery from '../../components/ProductGallery'
import StarRating from '../../components/StarRating'

// 1. Tipificación de los parámetros de la página
interface PageProps {
  params: { slug: string };
}

// 2. Tipificación de la estructura de datos del producto
// (Asegúrate de que estos campos coincidan con tu tabla 'products' en Supabase)
interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  gender: 'men' | 'women' | null;
  category_men: string | null;
  category_women: string | null;
  discount: number | null;
  rating: number | null;
  // Agrega otros campos que uses, como 'created_at', etc.
}

// 3. Componente de Servidor Asíncrono
export default async function ProductDetail({ params }: PageProps) {
  // El tipado de 'params' es correcto aquí
  const slug = params.slug

  // Consulta a Supabase, tipificando el resultado
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single<Product>() // Especificamos que esperamos un único objeto 'Product'

  // Si no se encuentra el producto o hay un error, usa la función 'notFound' de Next.js
  if (!product || error) return notFound()

  return (
    <>
      <HeaderTop />
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* El array de imágenes no debe ser 'null', por eso se usa || [] */}
          <ProductGallery images={product.images || []} title={product.title} />
          <div>
            {/* Si 'gender' existe, lo mostramos */}
            {product.gender && <p className="text-sm uppercase text-gray-500">{product.gender}</p>}
            
            {/* Muestra categorías solo si existen */}
            {product.category_men && <p className="text-sm text-gray-400">{product.category_men}</p>}
            {product.category_women && <p className="text-sm text-gray-400">{product.category_women}</p>}
            
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            {/* Mostrar el precio. Usamos toFixed(2) y el operador de encadenamiento opcional (?) */}
            <p className="text-xl text-gray-800 mb-2">${product.price?.toFixed(2)}</p>
            
            {/* Mostrar descuento si existe */}
            {product.discount && (
              <p className="text-xl text-red-600 mb-2"> {product.discount} %</p>
            )}
            
            {/* Mostrar descripción si existe */}
            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}
            
            {/* El rating no debe ser 'null' si se le pasa al componente */}
            <StarRating rating={product.rating || 0} />
            
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mt-4 ">
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}