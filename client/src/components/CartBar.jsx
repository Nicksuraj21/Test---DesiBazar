// import React from "react"
// import { useAppContext } from "../context/AppContext"

// const CartBar = () => {

//   const { cartItems, navigate, setCartItems } = useAppContext()

//   const cartCount = Object.values(cartItems || {}).reduce((a, b) => a + b, 0)

//   const clearCart = () => {
//     setCartItems({})
//   }

//   if (cartCount === 0) return null

//   return (

//     <div className="fixed bottom-6 left-4 right-4 flex gap-3 z-50">

//       <button
//         onClick={clearCart}
//         className="w-1/2 bg-red-500 text-white py-3 text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
//       >
//         Clear Cart
//       </button>

//       <button
//         onClick={() => navigate('/cart')}
//         className="w-1/2 bg-primary text-white py-3 text-sm font-semibold rounded-lg shadow-md hover:opacity-90 transition"
//       >
//         Go to Cart ({cartCount})
//       </button>

//     </div>

//   )
// }

// export default CartBar




















import React from "react"
import { useAppContext } from "../context/AppContext"
import { useLocation } from "react-router-dom"

const CartBar = () => {

  const { cartItems, navigate, setCartItems } = useAppContext()
  const location = useLocation()

  const cartCount = Object.values(cartItems || {}).reduce((a, b) => a + b, 0)

  const clearCart = () => {
    setCartItems({})
  }

  // Hide on specific pages
  const hidePages = ["/cart", "/add-address"]

  if (cartCount === 0 || hidePages.includes(location.pathname)) return null

  return (

    <div className="fixed bottom-4 left-4 right-4 flex gap-3 z-50">

      <button
        onClick={clearCart}
        className="w-1/2 bg-red-400 text-white py-3 text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Clear Cart
      </button>

      <button
        onClick={() => navigate('/cart')}
        className="w-1/2 bg-primary text-white py-3 text-sm font-semibold rounded-lg shadow-md hover:opacity-90 transition"
      >
        Go to Cart ({cartCount})
      </button>

    </div>

  )
}

export default CartBar