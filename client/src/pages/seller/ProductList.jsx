// import React from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ProductList = () => {
//     const {products, currency, axios, fetchProducts} = useAppContext()

//     const toggleStock = async (id, inStock)=>{
//         try {
//             const { data } = await axios.post('/api/product/stock', {id, inStock});
//             if (data.success){
//                 fetchProducts();
//                 toast.success(data.message)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }
//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//             <div className="w-full md:p-10 p-4">
//                 <h2 className="pb-4 text-lg font-medium">All Products</h2>
//                 <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//                     <table className="md:table-auto table-fixed w-full overflow-hidden">
//                         <thead className="text-gray-900 text-sm text-left">
//                             <tr>
//                                 <th className="px-4 py-3 font-semibold truncate">Product</th>
//                                 <th className="px-4 py-3 font-semibold truncate">Category</th>
//                                 <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
//                                 <th className="px-4 py-3 font-semibold truncate">In Stock</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm text-gray-500">
//                             {products.map((product) => (
//                                 <tr key={product._id} className="border-t border-gray-500/20">
//                                     <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                                         <div className="border border-gray-300 rounded p-2">
//                                             <img src={product.image[0]} alt="Product" className="w-16" />
//                                         </div>
//                                         <span className="truncate max-sm:hidden w-full">{product.name}</span>
//                                     </td>
//                                     <td className="px-4 py-3">{product.category}</td>
//                                     <td className="px-4 py-3 max-sm:hidden">{currency}{product.offerPrice}</td>
//                                     <td className="px-4 py-3">
//                                         <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
//                                             <input onClick={()=> toggleStock(product._id, !product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer" />
//                                             <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
//                                             <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
//                                         </label>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default ProductList




































// import React from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ProductList = () => {

//     const { products, currency, axios, fetchProducts } = useAppContext()

//     // DELETE PRODUCT
//     const removeProduct = async (id) => {
//         if (!window.confirm("Delete this product?")) return;

//         try {
//             const { data } = await axios.post('/api/product/delete', { id });

//             if (data.success) {
//                 toast.success(data.message)
//                 fetchProducts();
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // STOCK
//     const toggleStock = async (id, inStock) => {
//         try {
//             const { data } = await axios.post('/api/product/stock', { id, inStock });

//             if (data.success) {
//                 fetchProducts();
//                 toast.success(data.message)
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     return (
//         <div className="flex-1 h-[95vh] overflow-y-scroll">
//             <div className="w-full md:p-10 p-4">

//                 <h2 className="pb-4 text-lg font-medium">All Products</h2>

//                 <table className="w-full border">
//                     <thead>
//                         <tr className="border-b">
//                             <th>Product</th>
//                             <th>Category</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {products.map((p) => (
//                             <tr key={p._id} className="border-b text-center">

//                                 <td className="flex items-center gap-3 p-2">
//                                     <img src={p.image[0]} className="w-12" />
//                                     {p.name}
//                                 </td>

//                                 <td>{p.category}</td>
//                                 <td>{currency}{p.offerPrice}</td>

//                                 <td>
//                                     <input
//                                         type="checkbox"
//                                         checked={p.inStock}
//                                         onChange={() =>
//                                             toggleStock(p._id, !p.inStock)
//                                         }
//                                     />
//                                 </td>

//                                 <td>
//                                     <button
//                                         onClick={() => removeProduct(p._id)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//             </div>
//         </div>
//     )
// }

// export default ProductList



















// import React from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ProductList = () => {

//     const {products, currency, axios, fetchProducts} = useAppContext()

//     // PRICE UPDATE
//     const updatePrice = async (id, price, offerPrice)=>{
//         try {
//             const { data } = await axios.post('/api/product/update-price', {
//                 id,
//                 price,
//                 offerPrice
//             });

//             if(data.success){
//                 fetchProducts();
//                 toast.success("Price updated")
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // DELETE
//     const removeProduct = async (id)=>{
//         try {
//             const { data } = await axios.post('/api/product/delete', {id});
//             if(data.success){
//                 fetchProducts();
//                 toast.success(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // STOCK
//     const toggleStock = async (id, inStock)=>{
//         try {
//             const { data } = await axios.post('/api/product/stock', {id, inStock});
//             if(data.success){
//                 fetchProducts();
//                 toast.success(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//   return (
//     <div className="flex-1 h-[95vh] overflow-y-scroll">
//         <div className="w-full md:p-10 p-4">

//             <h2 className="pb-4 text-lg font-medium">All Products</h2>

//             <table className="w-full border">
//                 <thead>
//                     <tr className="border-b">
//                         <th>Product</th>
//                         <th>Category</th>
//                         <th>Price</th>
//                         <th>Stock</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.map((product)=>(
//                         <tr key={product._id} className="border-b text-center">

//                             <td className="flex items-center gap-3 p-2">
//                                 <img src={product.image[0]} className="w-12"/>
//                                 {product.name}
//                             </td>

//                             <td>{product.category}</td>

//                             {/* 🔴 EDITABLE PRICE */}
//                             <td>
//                                 <input
//                                   type="number"
//                                   defaultValue={product.offerPrice}
//                                   onBlur={(e)=> updatePrice(product._id, product.price, e.target.value)}
//                                   className="border w-20 px-1"
//                                 />
//                             </td>

//                             <td>
//                                 <input
//                                   type="checkbox"
//                                   checked={product.inStock}
//                                   onChange={()=>toggleStock(product._id, !product.inStock)}
//                                 />
//                             </td>

//                             <td>
//                                 <button
//                                   onClick={()=>removeProduct(product._id)}
//                                   className="bg-red-500 text-white px-3 py-1 rounded"
//                                 >
//                                   Delete
//                                 </button>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </div>
//     </div>
//   )
// }

// export default ProductList





























// import React from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ProductList = () => {

//     const {products, currency, axios, fetchProducts} = useAppContext()

//     // UPDATE PRICE
//     const updatePrice = async (id, price, offerPrice)=>{
//         try {
//             const { data } = await axios.post('/api/product/update-price', {
//                 id,
//                 price,
//                 offerPrice
//             });

//             if(data.success){
//                 fetchProducts();
//                 toast.success("Price updated")
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // DELETE
//     const removeProduct = async (id)=>{
//         try {
//             const { data } = await axios.post('/api/product/delete', {id});
//             if(data.success){
//                 fetchProducts();
//                 toast.success(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // STOCK
//     const toggleStock = async (id, inStock)=>{
//         try {
//             const { data } = await axios.post('/api/product/stock', {id, inStock});
//             if(data.success){
//                 fetchProducts();
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//   return (
//     <div className="flex-1 h-[95vh] overflow-y-scroll">
//         <div className="w-full md:p-10 p-4">

//             <h2 className="pb-4 text-lg font-medium">All Products</h2>

//             <table className="w-full border">
//                 <thead>
//                     <tr className="border-b">
//                         <th>Product</th>
//                         <th>Category</th>
//                         <th>MRP</th>
//                         <th>Offer</th>
//                         <th>Stock</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.map((product)=>(
//                         <tr key={product._id} className="border-b text-center">

//                             <td className="flex items-center gap-3 p-2">
//                                 <img src={product.image[0]} className="w-12"/>
//                                 {product.name}
//                             </td>

//                             <td>{product.category}</td>

//                             {/* 🔴 BASE PRICE */}
//                             <td>
//                                 <input
//                                   type="number"
//                                   defaultValue={product.price}
//                                   onBlur={(e)=> updatePrice(product._id, e.target.value, product.offerPrice)}
//                                   className="border w-20 px-1"
//                                 />
//                             </td>

//                             {/* 🔴 OFFER PRICE */}
//                             <td>
//                                 <input
//                                   type="number"
//                                   defaultValue={product.offerPrice}
//                                   onBlur={(e)=> updatePrice(product._id, product.price, e.target.value)}
//                                   className="border w-20 px-1"
//                                 />
//                             </td>

//                             <td>
//                                 <input
//                                   type="checkbox"
//                                   checked={product.inStock}
//                                   onChange={()=>toggleStock(product._id, !product.inStock)}
//                                 />
//                             </td>

//                             <td>
//                                 <button
//                                   onClick={()=>removeProduct(product._id)}
//                                   className="bg-red-500 text-white px-3 py-1 rounded"
//                                 >
//                                   Delete
//                                 </button>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </div>
//     </div>
//   )
// }

// export default ProductList





































// import React from 'react'
// import { useAppContext } from '../../context/AppContext'
// import toast from 'react-hot-toast'

// const ProductList = () => {

//     const {products, currency, axios, fetchProducts} = useAppContext()

//     const updatePrice = async (id, price, offerPrice)=>{
//         try {
//             const { data } = await axios.post('/api/product/update-price', {
//                 id,
//                 price,
//                 offerPrice
//             });
//             if(data.success){
//                 fetchProducts();
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const toggleBest = async (id, bestSeller)=>{
//       try {
//         const {data} = await axios.post('/api/product/best-seller',{id,bestSeller})
//         if(data.success){
//           fetchProducts()
//         }
//       } catch (error) {
//         toast.error(error.message)
//       }
//     }

//   return (
//     <div className="flex-1 h-[95vh] overflow-y-scroll">
//         <div className="w-full md:p-10 p-4">

//             <h2 className="pb-4 text-lg font-medium">All Products</h2>

//             <table className="w-full border">
//                 <thead>
//                     <tr className="border-b">
//                         <th>Product</th>
//                         <th>Category</th>
//                         <th>MRP</th>
//                         <th>Offer</th>
//                         <th>Best</th>
//                         <th>Stock</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {products.map((product)=>(
//                         <tr key={product._id} className="border-b text-center">

//                             <td className="flex items-center gap-3 p-2">
//                                 <img src={product.image[0]} className="w-12"/>
//                                 {product.name}
//                             </td>

//                             <td>{product.category}</td>

//                             <td>
//                                 <input
//                                   type="number"
//                                   defaultValue={product.price}
//                                   onBlur={(e)=> updatePrice(product._id, e.target.value, product.offerPrice)}
//                                   className="border w-20 px-1"
//                                 />
//                             </td>

//                             <td>
//                                 <input
//                                   type="number"
//                                   defaultValue={product.offerPrice}
//                                   onBlur={(e)=> updatePrice(product._id, product.price, e.target.value)}
//                                   className="border w-20 px-1"
//                                 />
//                             </td>

//                             {/* BEST SELLER */}
//                             <td>
//                               <input
//                                 type="checkbox"
//                                 checked={product.bestSeller}
//                                 onChange={()=>toggleBest(product._id, !product.bestSeller)}
//                               />
//                             </td>

//                             <td>
//                                 <input
//                                   type="checkbox"
//                                   checked={product.inStock}
//                                   onChange={()=>toggleStock(product._id, !product.inStock)}
//                                 />
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </div>
//     </div>
//   )
// }

// export default ProductList


























import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

const ProductList = () => {

    const {products, currency, axios, fetchProducts} = useAppContext()

    // UPDATE PRICE
    const updatePrice = async (id, price, offerPrice)=>{
        try {
            const { data } = await axios.post('/api/product/update-price', {
                id,
                price,
                offerPrice
            });
            if(data.success){
                toast.success("Price Updated")
                fetchProducts();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // BEST SELLER
    const toggleBest = async (id, bestSeller)=>{
      try {
        const {data} = await axios.post('/api/product/best-seller',{id,bestSeller})
        if(data.success){
          fetchProducts()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    // STOCK
    const toggleStock = async (id, inStock)=>{
      try {
        const {data} = await axios.post('/api/product/stock',{id,inStock})
        if(data.success){
          fetchProducts()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    // DELETE PRODUCT
    const deleteProduct = async (id)=>{
      if(!window.confirm("Are you sure you want to delete this product?")) return

      try {
        const {data} = await axios.post('/api/product/delete',{id})
        if(data.success){
          toast.success("Product Deleted")
          fetchProducts()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll">
        <div className="w-full md:p-10 p-4">

            <h2 className="pb-4 text-lg font-medium">All Products</h2>

            <table className="w-full border">
                <thead>
                    <tr className="border-b">
                        <th>Product</th>
                        <th>Category</th>
                        <th>MRP</th>
                        <th>Offer</th>
                        <th>Best</th>
                        <th>Stock</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id} className="border-b text-center">

                            <td className="flex items-center gap-3 p-2">
                                <img src={product.image[0]} className="w-12"/>
                                {product.name}
                            </td>

                            <td>{product.category}</td>

                            <td>
                                <input
                                  type="number"
                                  defaultValue={product.price}
                                  onBlur={(e)=> updatePrice(product._id, e.target.value, product.offerPrice)}
                                  className="border w-20 px-1"
                                />
                            </td>

                            <td>
                                <input
                                  type="number"
                                  defaultValue={product.offerPrice}
                                  onBlur={(e)=> updatePrice(product._id, product.price, e.target.value)}
                                  className="border w-20 px-1"
                                />
                            </td>

                            <td>
                              <input
                                type="checkbox"
                                checked={product.bestSeller}
                                onChange={()=>toggleBest(product._id, !product.bestSeller)}
                              />
                            </td>

                            <td>
                                <input
                                  type="checkbox"
                                  checked={product.inStock}
                                  onChange={()=>toggleStock(product._id, !product.inStock)}
                                />
                            </td>

                            {/* DELETE ICON */}
                            <td>
                                <button
                                  onClick={()=>deleteProduct(product._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={18}/>
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default ProductList