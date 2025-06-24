// pages/index.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from('productos').select('*')
      if (error) console.error('Error:', error)
      else setProductos(data)
    }

    fetchProductos()
  }, [])

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>{prod.nombre}</li>
        ))}
      </ul>
    </div>
  )
}
