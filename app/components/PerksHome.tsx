'use client'

import { FaShippingFast, FaGift, FaCrown, FaCreditCard } from 'react-icons/fa'

export default function PerksHome() {
  const perks = [
    {
      icon: <FaShippingFast className="text-3xl text-gray-700" />,
      title: 'Free Shipping',
      desc: 'On all orders over $75.00',
    },
    {
      icon: <FaGift className="text-3xl text-gray-700" />,
      title: 'Money Back',
      desc: '30 days money back guarantee',
    },
    {
      icon: <FaCrown className="text-3xl text-gray-700" />,
      title: 'Friendly Support',
      desc: 'Team always ready for you',
    },
    {
      icon: <FaCreditCard className="text-3xl text-gray-700" />,
      title: 'Free Shipping',
      desc: 'On all orders over $75.00',
    },
  ]

  return (
    <section className="py-10 border-t">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {perks.map((perk, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {perk.icon}
            <h4 className="font-bold text-sm uppercase">{perk.title}</h4>
            <p className="text-sm text-gray-600">{perk.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
