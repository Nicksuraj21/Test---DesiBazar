





import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {

    const {products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=>{
        if(searchQuery.length > 0){
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))}else{
                setFilteredProducts(products)
            }
    },[products, searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
           {filteredProducts.map((product, index)=>(
            <ProductCard key={index} product={product}/>
           ))}
        </div>

    </div>
  )
}

export default AllProducts

























// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'
// import ProductCard from '../components/ProductCard'

// const AllProducts = () => {

//   const { products, searchQuery, cartItems, navigate, setCartItems } = useAppContext()

//   const [filteredProducts, setFilteredProducts] = useState([])

//   useEffect(() => {

//     if (searchQuery.length > 0) {

//       setFilteredProducts(
//         products.filter(product =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       )

//     } else {

//       setFilteredProducts(products)

//     }

//   }, [products, searchQuery])


//   const cartCount = Object.values(cartItems || {}).reduce((a, b) => a + b, 0)


//   const clearCart = () => {
//     setCartItems({})
//   }


//   return (

//     <div className='mt-16 flex flex-col pb-24'>

//       <div className='flex flex-col items-end w-max'>
//         <p className='text-2xl font-medium uppercase'>All products</p>
//         <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//       </div>

//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
//         {filteredProducts.map((product, index) => (
//           <ProductCard key={index} product={product} />
//         ))}
//       </div>


//       {/* Bottom Cart Buttons */}

//       {cartCount > 0 && (

//   <div className="fixed bottom-4 left-4 right-4 flex gap-3 z-50">

//     <button
//       onClick={clearCart}
//       className="w-1/2 bg-red-500 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-red-600 transition"
//     >
//       Clear Cart
//     </button>

//     <button
//       onClick={() => navigate('/cart')}
//       className="w-1/2 bg-primary text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
//     >
//       Go to Cart ({cartCount})
//     </button>

//   </div>

// )}

//     </div>

//   )
// }

// export default AllProducts





