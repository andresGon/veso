// hooks/useCart.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCart() {
  const [cartId, setCartId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Obtener o crear carrito al cargar
  useEffect(() => {
    const initCart = async () => {
      setLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const userId = session?.user.id
      if (!userId) return

      const { data: cart, error } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'open')
        .single()

      if (cart) {
        setCartId(cart.id)
      } else {
        const { data: newCart, error: insertError } = await supabase
          .from('carts')
          .insert([{ user_id: userId, status: 'open' }])
          .select()
          .single()

        if (newCart) setCartId(newCart.id)
      }

      setLoading(false)
    }

    initCart()
  }, [])

  // Agregar producto al carrito
  const addToCart = async (productId: number, unit_price: number, qty = 1) => {
    if (!cartId) return

    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, qty')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .single()

    if (existingItem) {
      // Ya está en el carrito: actualiza qty
      await supabase
        .from('cart_items')
        .update({ qty: existingItem.qty + qty })
        .eq('id', existingItem.id)
    } else {
      // Nuevo producto
      await supabase.from('cart_items').insert([
        {
          cart_id: cartId,
          product_id: productId,
          unit_price,
          qty,
        },
      ])
    }
  }

  return {
    cartId,
    loading,
    addToCart,
  }
}
