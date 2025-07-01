'use client'

import { FaStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number // de 0 a 5
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex text-teal-700">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`w-5 h-5 ${
            rating >= star ? 'fill-current' : 'fill-none stroke-current'
          }`}
        />
      ))}
    </div>
  )
}
