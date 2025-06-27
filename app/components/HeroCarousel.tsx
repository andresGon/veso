'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
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
    bgColor: '#c8dfdb',
  },
  {
    id: 2,
    title: 'Shop the Latest\nArrivals',
    subtitle: 'New Season Essentials',
    description: 'Discover premium quality with style',
    buttonText: 'Shop Now',
    imageUrl: 'https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750880794/slide_hero_02_axptud.png',
    bgColor: '#fce7f3',
  },
  {
    id: 3,
    title: 'Timeless Looks\nRedefined',
    subtitle: 'Modern Meets Classic',
    description: 'Explore outfits for every occasion',
    buttonText: 'Explore',
    imageUrl: 'https://res.cloudinary.com/dzlg5jcqj/image/upload/v1750880794/slide_hero_03_lfkdx9.png',
    bgColor: '#e5e7eb',
  },
]

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
}

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="relative rounded-xl overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="bg-no-repeat bg-[position:80%_100%] bg-contain min-h-[500px] flex items-center"
              style={{
                backgroundColor: slide.bgColor,
                backgroundImage: `url(${slide.imageUrl})`,
              }}
            >
              <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-20 py-14">
                {activeSlide === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.2,
                        },
                      },
                    }}
                    className="max-w-xl text-left space-y-4"
                  >
                    <motion.p
                      className="text-sm tracking-widest text-gray-700 uppercase"
                      variants={textVariants}
                      custom={0.1}
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      className="text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line"
                      variants={textVariants}
                      custom={0.3}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      className="text-gray-700"
                      variants={textVariants}
                      custom={0.5}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div variants={textVariants} custom={0.7}>
                      <Link
                        href="/collections"
                        className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm font-semibold tracking-wide rounded hover:bg-gray-800 transition"
                      >
                        {slide.buttonText} &rarr;
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        {/* Botón personalizado previo */}
            <div className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 w-10 h-10 rounded-full bg-white text-black shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition -translate-y-1/2">
            <FiChevronLeft className="text-2xl" />
            </div>

            {/* Botón personalizado siguiente */}
            <div className="swiper-button-next-custom absolute top-1/2 right-4 z-10 w-10 h-10 rounded-full bg-white text-black shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition -translate-y-1/2">
            <FiChevronRight className="text-2xl" />
            </div>
      </Swiper>
    </section>
  )
}
