'use client'

import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from 'react-icons/fa'
import { MdPhone, MdEmail } from 'react-icons/md'

export default function HeaderTop() {
  return (
    <div className="bg-black text-white text-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MdPhone className="text-gray-400" />
            +0123456789
          </span>
          <span className="flex items-center gap-1">
            <MdEmail className="text-gray-400" />
            info@veso-shop.com
          </span>
        </div>

        {/* Center */}
        <div className="text-center">
          <span>
            Free Delivery on <strong>orders</strong> over <strong>$260</strong>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-lg">
            <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaPinterestP className="hover:text-red-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}
