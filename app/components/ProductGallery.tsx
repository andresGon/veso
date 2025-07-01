'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || '/images/no_image.png')

  return (
    <div>
      {/* Imagen grande */}
      <img
        src={activeImage}
        alt={title}
        className="w-full aspect-square object-cover rounded-lg mb-4"
      />

      {/* Miniaturas */}
      <div className="flex gap-4 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-20 rounded border-2 ${
              activeImage === img ? 'border-black' : 'border-transparent'
            }`}
          >
            <img
              src={img}
              alt={`${title} ${index}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
