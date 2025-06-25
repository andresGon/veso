'use client'

import { FaEnvelope, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcDiscover } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#eaf4f4] text-gray-800 text-sm mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <p className="font-bold">70 Washington Square South, New York,<br />NY 10012, United States</p>
          <p className="mt-2">
            <strong>Email:</strong> info@fashionshop.com
          </p>
          <p>
            <strong>Phone:</strong> (212)555-1234
          </p>
        </div>

        {/* Our Store */}
        <div>
          <h3 className="font-semibold mb-2">Our Store</h3>
          <ul className="space-y-1">
            <li>Full Grooming</li>
            <li>Bath and Dry</li>
            <li>Styling</li>
            <li>Medical Bath</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li>Login</li>
            <li>My account</li>
            <li>Wishlist</li>
            <li>Checkout</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-semibold mb-2">Sign Up for Email</h3>
          <p className="mb-3">Subscribe to our newsletter to receive news on update.</p>
          <form className="flex border rounded overflow-hidden bg-white">
            <div className="flex items-center px-3 text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-2 py-2 outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 hover:bg-gray-800 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <span>© 2025, Veso</span>
          <div className="flex space-x-3 mt-2 md:mt-0 text-xl text-gray-500">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcPaypal />
            <FaCcDiscover />
          </div>
        </div>
      </div>
    </footer>
  )
}
