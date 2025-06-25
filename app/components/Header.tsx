'use client'

import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaChevronDown,
} from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-5xl font-semibold">Veso</div>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-black/70">
            Shop <FaChevronDown className="text-xs" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-black/70">
            Blog <FaChevronDown className="text-xs" />
          </div>
          <div className="cursor-pointer hover:text-black/70">Contact</div>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-lg text-black">
          <button className="relative">
            <FaSearch />
          </button>
          <button className="relative">
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button className="relative">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button>
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  )
}
