'use client'

import Link from 'next/link'

interface ProductCardProps {
  id: number
  title: string
  price: number
  images: string[]
  slug: string
}

export default function ProductCard({ id, title, price, images, slug }: ProductCardProps) {
  return (
    <li key={id} className="p-4 text-center cursor-pointer">
      <Link href={`/products/${slug}`}>
        <div className="relative w-full aspect-[1/1] overflow-hidden rounded-md group mb-4">
          <img
            src={images?.[0] || './images/no_image.png'}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition duration-300 transform group-hover:scale-105 ${
              images?.[1] ? 'opacity-100 group-hover:opacity-0' : ''
            }`}
          />
          {images?.[1] && (
            <img
              src={images[1]}
              alt={`${title} hover`}
              className="absolute inset-0 w-full h-full object-cover transition duration-300 transform group-hover:scale-105 opacity-0 group-hover:opacity-100"
            />
          )}
        </div>
        <span className="text-base mb-2 font-bold">{title}</span><br />
        <span className="text-sm">${price?.toFixed(2)}</span>
      </Link>
    </li>
  )
}
