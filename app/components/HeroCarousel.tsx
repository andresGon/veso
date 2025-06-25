'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/navigation'

const slides = [
  {
    id: 1,
    title: 'Stay Ahead of\nThe Trends',
    subtitle: 'Elegance is Elimination',
    description: 'Tell your brand’s story through images',
    buttonText: 'Collections',
    imageUrl: 'https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750878700/slide_hero_01_anstit.png',
  },
  {
    id: 2,
    title: 'Shop the Latest\nArrivals',
    subtitle: 'New Season Essentials',
    description: 'Discover premium quality with style',
    buttonText: 'Shop Now',
    imageUrl: 'https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750880794/slide_hero_02_axptud.png',
  },
  {
    id: 3,
    title: 'Timeless Looks\nRedefined',
    subtitle: 'Modern Meets Classic',
    description: 'Explore outfits for every occasion',
    buttonText: 'Explore',
    imageUrl: 'https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750880794/slide_hero_03_lfkdx9.png',
  },
]

export default function HeroCarousel() {
  return (
    <section className="relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="bg-[#c8dfdb] bg-no-repeat bg-[position:80%_100%] bg-contain min-h-[500px] flex items-center"
              style={{
                backgroundImage: `url(${slide.imageUrl})`,
              }}
            >
              <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-20 py-14">
                <div className="max-w-xl text-left space-y-4">
                  <p className="text-sm tracking-widest text-gray-700 uppercase">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-gray-700">{slide.description}</p>
                  <Link
                    href="/collections"
                    className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm font-semibold tracking-wide rounded hover:bg-gray-800 transition"
                  >
                    {slide.buttonText} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
