// app/products/[slug]/page.tsx

import { supabase } from '@/app/lib/supabaseClient'
import { notFound } from 'next/navigation'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductGallery from '../../components/ProductGallery'
import StarRating from '../../components/StarRating'

// Tipos de product (estos sí pueden quedarse)
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
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {

  const { slug } = params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single<Product>();

  if (!product || error) return notFound();

  return (
    <>
      <HeaderTop />
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <ProductGallery images={product.images || []} title={product.title} />

          <div>
            {product.gender && (
              <p className="text-sm uppercase text-gray-500">{product.gender}</p>
            )}

            {product.category_men && (
              <p className="text-sm text-gray-400">{product.category_men}</p>
            )}

            {product.category_women && (
              <p className="text-sm text-gray-400">{product.category_women}</p>
            )}

            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <p className="text-xl text-gray-800 mb-2">
              ${product.price?.toFixed(2)}
            </p>

            {product.discount && (
              <p className="text-xl text-red-600 mb-2">{product.discount} %</p>
            )}

            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}

            <StarRating rating={product.rating || 0} />

            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mt-4">
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
