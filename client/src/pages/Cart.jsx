
// ______________________________________________________________________________________________




// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets, dummyAddress } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios, user, setCartItems} = useAppContext()
//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [showAddress, setShowAddress] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentOption, setPaymentOption] = useState("COD")

//     // 🟢 DELIVERY LOGIC (ONLY ADDITION)
//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0
//     const tax = Math.floor(cartAmount * 0.02)
//     const finalTotal = cartAmount + deliveryCharge + tax

//     const getCart = ()=>{
//         let tempArray = []
//         for(const key in cartItems){
//             const product = products.find((item)=>item._id === key)
//             product.quantity = cartItems[key]
//             tempArray.push(product)
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async ()=>{
//         try {
//             const {data} = await axios.get('/api/address/get');
//             if (data.success){
//                 setAddresses(data.addresses)
//                 if(data.addresses.length > 0){
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async ()=>{
//         try {
//             if(!selectedAddress){
//                 return toast.error("Please select an address")
//             }

//             if(paymentOption === "COD"){
//                 const {data} = await axios.post('/api/order/cod', {
//                     userId: user._id,
//                     items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
//                     address: selectedAddress._id
//                 })

//                 if(data.success){
//                     toast.success(data.message)
//                     setCartItems({})
//                     navigate('/my-orders')
//                 }else{
//                     toast.error(data.message)
//                 }
//             }else{
//                 const {data} = await axios.post('/api/order/stripe', {
//                     userId: user._id,
//                     items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
//                     address: selectedAddress._id
//                 })

//                 if(data.success){
//                     window.location.replace(data.url)
//                 }else{
//                     toast.error(data.message)
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(products.length > 0 && cartItems){
//             getCart()
//         }
//     },[products, cartItems])

//     useEffect(()=>{
//         if(user){
//             getUserAddress()
//         }
//     },[user])

//     return products.length > 0 && cartItems ? (
//         <div className="flex flex-col md:flex-row mt-16">
//             <div className='flex-1 max-w-4xl'>
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//                     <p className="text-left">Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product, index) => (
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
//                         <div className="flex items-center md:gap-6 gap-3">
//                             <div onClick={()=>{
//                                 navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)
//                             }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
//                                 <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
//                             </div>
//                             <div>
//                                 <p className="hidden md:block font-semibold">{product.name}</p>
//                                 <div className="font-normal text-gray-500/70">
//                                     <p>Weight: <span>{product.weight || "N/A"}</span></p>
//                                     <div className='flex items-center'>
//                                         <p>Qty:</p>
//                                         <select onChange={e => updateCartItem(product._id, Number(e.target.value))}  value={cartItems[product._id]} className='outline-none'>
//                                             {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
//                                                 <option key={index} value={index + 1}>{index + 1}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
//                         <button onClick={()=> removeFromCart(product._id)} className="cursor-pointer mx-auto">
//                             <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
//                         </button>
//                     </div>
//                 ))}

//                 <button onClick={()=> {navigate("/products"); scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
//                     <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
//                     Continue Shopping
//                 </button>

//             </div>

//             {/* RIGHT PANEL */}
//             <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
//                 <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
//                 <hr className="border-gray-300 my-5" />

//                 <div className="mb-6">
//                     <p className="text-sm font-medium uppercase">Delivery Address</p>
//                     <div className="relative flex justify-between items-start mt-2">
//                         <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}</p>
//                         <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
//                             Change
//                         </button>
//                     </div>

//                     <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

//                     <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
//                         <option value="COD">Cash On Delivery</option>
//                         <option value="Online">Online Payment</option>
//                     </select>
//                 </div>

//                 <hr className="border-gray-300" />

//                 {/* ⚡ ONLY LOGIC CHANGED */}
//                 <div className="text-gray-500 mt-4 space-y-2">
//                     <p className="flex justify-between">
//                         <span>Price</span><span>{currency}{cartAmount}</span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Shipping Fee</span>
//                         <span>
//                             {deliveryCharge === 0
//                                 ? <span className="text-green-600">Free</span>
//                                 : `${currency}${deliveryCharge}`}
//                         </span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Tax (2%)</span><span>{currency}{tax}</span>
//                     </p>

//                     <p className="flex justify-between text-lg font-medium mt-3">
//                         <span>Total Amount:</span>
//                         <span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
//                     {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
//                 </button>
//             </div>
//         </div>
//     ) : null
// }

// export default Cart;




// _____________________________________________________________________________________________________





















































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext()

//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [showAddress, setShowAddress] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState(null)

//     // COUPON
//     const [coupon, setCoupon] = useState("")
//     const [discount, setDiscount] = useState(0)

//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0

//     const applyCoupon = ()=>{
//         if(coupon.toLowerCase()==="save10"){
//             setDiscount(Math.floor(cartAmount*0.10))
//             toast.success("SAVE10 applied")
//         }
//         else if(coupon.toLowerCase()==="off50"){
//             setDiscount(50)
//             toast.success("OFF50 applied")
//         }
//         else{
//             setDiscount(0)
//             toast.error("Invalid coupon")
//         }
//     }

//     const finalTotal = cartAmount + deliveryCharge - discount

//     const getCart = ()=>{
//         let tempArray=[]
//         for(const key in cartItems){
//             const product = products.find(item=>item._id===key)
//             if(product){
//                 tempArray.push({...product, quantity: cartItems[key]})
//             }
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async ()=>{
//         try {
//             const {data} = await axios.get('/api/address/get')
//             if(data.success){
//                 setAddresses(data.addresses)
//                 if(data.addresses.length>0){
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async ()=>{
//         try {
//             if(!selectedAddress){
//                 return toast.error("Please select address")
//             }

//             const {data} = await axios.post('/api/order/cod',{
//                 userId:user._id,
//                 items: cartArray.map(item=>({
//                     product:item._id,
//                     quantity:item.quantity
//                 })),
//                 address:selectedAddress._id,
//                 coupon: coupon
//             })

//             if(data.success){
//                 toast.success(data.message)
//                 setCartItems({})
//                 navigate('/my-orders')
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(products.length>0){
//             getCart()
//         }
//     },[products, cartItems])

//     useEffect(()=>{
//         if(user){
//             getUserAddress()
//         }
//     },[user])

//     return (
//         <div className="flex flex-col md:flex-row mt-16">

//             {/* LEFT */}
//             <div className='flex-1 max-w-4xl'>
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//                     <p className="text-left">Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product,index)=>(
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">

//                         <div className="flex items-center md:gap-6 gap-3">
//                             <div
//                                 onClick={()=>{
//                                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
//                                     scrollTo(0,0)
//                                 }}
//                                 className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
//                             >
//                                 <img className="max-w-full h-full object-cover" src={product.image[0]} />
//                             </div>

//                             <div>
//                                 <p className="hidden md:block font-semibold">{product.name}</p>
//                                 <div className="font-normal text-gray-500/70">
//                                     <p>Weight: <span>{product.weight || "N/A"}</span></p>

//                                     <div className='flex items-center'>
//                                         <p>Qty:</p>
//                                         <select
//                                             value={product.quantity}
//                                             onChange={e=>updateCartItem(product._id, Number(e.target.value))}
//                                             className='outline-none ml-2'
//                                         >
//                                             {Array(10).fill('').map((_,i)=>(
//                                                 <option key={i} value={i+1}>{i+1}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <p className="text-center">
//                             {currency}{product.offerPrice * product.quantity}
//                         </p>

//                         <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
//                             <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
//                         </button>
//                     </div>
//                 ))}

//                 {/* CONTINUE SHOPPING */}
//                 <button
//                     onClick={()=>{navigate("/products"); scrollTo(0,0)}}
//                     className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
//                 >
//                     <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* RIGHT SUMMARY */}
//             <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
//                 <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
//                 <hr className="border-gray-300 my-5"/>

//                 {/* COUPON */}
//                 <div className="flex gap-2 mb-4">
//                     <input
//                         value={coupon}
//                         onChange={e=>setCoupon(e.target.value)}
//                         placeholder="Coupon code"
//                         className="border border-gray-300 bg-white px-3 py-2 w-full outline-none"
//                     />
//                     <button onClick={applyCoupon} className="bg-primary text-white px-4 hover:bg-primary-dull transition">
//                         Apply
//                     </button>
//                 </div>

//                 <hr className="border-gray-300"/>

//                 <div className="text-gray-500 mt-4 space-y-2">

//                     <p className="flex justify-between">
//                         <span>Price</span>
//                         <span>{currency}{cartAmount}</span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Shipping Fee</span>
//                         <span>
//                             {deliveryCharge===0
//                                 ? <span className="text-green-600">Free</span>
//                                 : `${currency}${deliveryCharge}`}
//                         </span>
//                     </p>

//                     {discount>0 && (
//                         <p className="flex justify-between text-green-600">
//                             <span>Discount</span>
//                             <span>-{currency}{discount}</span>
//                         </p>
//                     )}

//                     <p className="flex justify-between text-lg font-medium mt-3">
//                         <span>Total Amount:</span>
//                         <span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={placeOrder}
//                     className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
//                 >
//                     Place Order
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Cart





































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext()

//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [selectedAddress, setSelectedAddress] = useState(null)

//     // COUPON
//     const [coupon, setCoupon] = useState("")
//     const [discount, setDiscount] = useState(0)

//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0

//     const applyCoupon = ()=>{
//         if(coupon.toLowerCase()==="save10"){
//             setDiscount(Math.floor(cartAmount*0.10))
//             toast.success("SAVE10 applied")
//         }
//         else if(coupon.toLowerCase()==="off50"){
//             setDiscount(50)
//             toast.success("OFF50 applied")
//         }
//         else{
//             setDiscount(0)
//             toast.error("Invalid coupon")
//         }
//     }

//     const removeCoupon = ()=>{
//         setCoupon("")
//         setDiscount(0)
//         toast("Coupon removed")
//     }

//     const finalTotal = cartAmount + deliveryCharge - discount

//     const getCart = ()=>{
//         let tempArray=[]
//         for(const key in cartItems){
//             const product = products.find(item=>item._id===key)
//             if(product){
//                 tempArray.push({...product, quantity: cartItems[key]})
//             }
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async ()=>{
//         try {
//             const {data} = await axios.get('/api/address/get')
//             if(data.success){
//                 setAddresses(data.addresses)
//                 if(data.addresses.length>0){
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async ()=>{
//         try {
//             if(!selectedAddress){
//                 return toast.error("Please select address")
//             }

//             const {data} = await axios.post('/api/order/cod',{
//                 userId:user._id,
//                 items: cartArray.map(item=>({
//                     product:item._id,
//                     quantity:item.quantity
//                 })),
//                 address:selectedAddress._id,
//                 coupon: coupon
//             })

//             if(data.success){
//                 toast.success(data.message)
//                 setCartItems({})
//                 navigate('/my-orders')
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(products.length>0){
//             getCart()
//         }
//     },[products, cartItems])

//     useEffect(()=>{
//         if(user){
//             getUserAddress()
//         }
//     },[user])

//     return (
//         <div className="flex flex-col md:flex-row mt-16">

//             {/* LEFT */}
//             <div className='flex-1 max-w-4xl'>
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//                     <p className="text-left">Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product,index)=>(
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">

//                         <div className="flex items-center md:gap-6 gap-3">
//                             <div
//                                 onClick={()=>{
//                                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
//                                     scrollTo(0,0)
//                                 }}
//                                 className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
//                             >
//                                 <img className="max-w-full h-full object-cover" src={product.image[0]} />
//                             </div>

//                             <div>
//                                 <p className="hidden md:block font-semibold">{product.name}</p>
//                                 <div className="font-normal text-gray-500/70">
//                                     <p>Weight: <span>{product.weight || "N/A"}</span></p>

//                                     <div className='flex items-center'>
//                                         <p>Qty:</p>
//                                         <select
//                                             value={product.quantity}
//                                             onChange={e=>updateCartItem(product._id, Number(e.target.value))}
//                                             className='outline-none ml-2'
//                                         >
//                                             {Array(10).fill('').map((_,i)=>(
//                                                 <option key={i} value={i+1}>{i+1}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <p className="text-center">
//                             {currency}{product.offerPrice * product.quantity}
//                         </p>

//                         <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
//                             <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
//                         </button>
//                     </div>
//                 ))}

//                 {/* CONTINUE SHOPPING */}
//                 <button
//                     onClick={()=>{navigate("/products"); scrollTo(0,0)}}
//                     className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
//                 >
//                     <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* RIGHT SUMMARY */}
//             <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
//                 <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
//                 <hr className="border-gray-300 my-5"/>

//                 {/* COUPON */}
//                 <div className="flex gap-2 mb-4">
//                     <input
//                         value={coupon}
//                         onChange={e=>setCoupon(e.target.value)}
//                         placeholder="Coupon code"
//                         className="border border-gray-300 bg-white px-3 py-2 w-full outline-none"
//                         disabled={discount>0}
//                     />

//                     {discount>0 ? (
//                         <button
//                             onClick={removeCoupon}
//                             className="bg-gray-300 text-black px-4 hover:bg-gray-400 transition"
//                         >
//                             Remove
//                         </button>
//                     ) : (
//                         <button
//                             onClick={applyCoupon}
//                             className="bg-primary text-white px-4 hover:bg-primary-dull transition"
//                         >
//                             Apply
//                         </button>
//                     )}
//                 </div>

//                 <hr className="border-gray-300"/>

//                 <div className="text-gray-500 mt-4 space-y-2">

//                     <p className="flex justify-between">
//                         <span>Price</span>
//                         <span>{currency}{cartAmount}</span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Shipping Fee</span>
//                         <span>
//                             {deliveryCharge===0
//                                 ? <span className="text-green-600">Free</span>
//                                 : `${currency}${deliveryCharge}`}
//                         </span>
//                     </p>

//                     {discount>0 && (
//                         <p className="flex justify-between text-green-600">
//                             <span>Discount</span>
//                             <span>-{currency}{discount}</span>
//                         </p>
//                     )}

//                     <p className="flex justify-between text-lg font-medium mt-3">
//                         <span>Total Amount:</span>
//                         <span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={placeOrder}
//                     className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
//                 >
//                     Place Order
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Cart

































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext()

//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [showAddress, setShowAddress] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentOption, setPaymentOption] = useState("COD")

//     // COUPON
//     const [coupon, setCoupon] = useState("")
//     const [discount, setDiscount] = useState(0)

//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0

//     const applyCoupon = ()=>{
//         if(coupon.toLowerCase()==="save10"){
//             setDiscount(Math.floor(cartAmount*0.10))
//             toast.success("SAVE10 applied")
//         }
//         else if(coupon.toLowerCase()==="off50"){
//             setDiscount(50)
//             toast.success("OFF50 applied")
//         }
//         else{
//             setDiscount(0)
//             toast.error("Invalid coupon")
//         }
//     }

//     const removeCoupon = ()=>{
//         setCoupon("")
//         setDiscount(0)
//         toast("Coupon removed")
//     }

//     const finalTotal = cartAmount + deliveryCharge - discount

//     const getCart = ()=>{
//         let tempArray=[]
//         for(const key in cartItems){
//             const product = products.find(item=>item._id===key)
//             if(product){
//                 tempArray.push({...product, quantity: cartItems[key]})
//             }
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async ()=>{
//         try {
//             const {data} = await axios.get('/api/address/get')
//             if(data.success){
//                 setAddresses(data.addresses)
//                 if(data.addresses.length>0){
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async ()=>{
//         try {
//             if(!selectedAddress){
//                 return toast.error("Please select address")
//             }

//             if(paymentOption === "COD"){
//                 const {data} = await axios.post('/api/order/cod',{
//                     userId:user._id,
//                     items: cartArray.map(item=>({
//                         product:item._id,
//                         quantity:item.quantity
//                     })),
//                     address:selectedAddress._id,
//                     coupon
//                 })

//                 if(data.success){
//                     toast.success(data.message)
//                     setCartItems({})
//                     navigate('/my-orders')
//                 }else{
//                     toast.error(data.message)
//                 }
//             } 
//             else {
//                 const {data} = await axios.post('/api/order/stripe',{
//                     userId:user._id,
//                     items: cartArray.map(item=>({
//                         product:item._id,
//                         quantity:item.quantity
//                     })),
//                     address:selectedAddress._id,
//                     coupon
//                 })

//                 if(data.success){
//                     window.location.replace(data.url)
//                 }else{
//                     toast.error(data.message)
//                 }
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(products.length>0){
//             getCart()
//         }
//     },[products, cartItems])

//     useEffect(()=>{
//         if(user){
//             getUserAddress()
//         }
//     },[user])

//     return (
//         <div className="flex flex-col md:flex-row mt-16">

//             {/* LEFT */}
//             <div className='flex-1 max-w-4xl'>
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//                     <p>Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product,index)=>(
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center pt-3">

//                         <div className="flex items-center gap-3">
//                             <div
//                                 onClick={()=>{
//                                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
//                                     scrollTo(0,0)
//                                 }}
//                                 className="cursor-pointer w-24 h-24 border border-gray-300 rounded flex items-center justify-center"
//                             >
//                                 <img className="h-full object-cover" src={product.image[0]} />
//                             </div>

//                             <div>
//                                 <p className="font-semibold">{product.name}</p>
//                                 <p className="text-sm text-gray-500">
//                                     Weight: {product.weight || "N/A"}
//                                 </p>

//                                 <div className="flex items-center">
//                                     <p>Qty:</p>
//                                     <select
//                                         value={product.quantity}
//                                         onChange={e=>updateCartItem(product._id, Number(e.target.value))}
//                                         className="ml-2 outline-none"
//                                     >
//                                         {Array(10).fill('').map((_,i)=>(
//                                             <option key={i} value={i+1}>{i+1}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         <p className="text-center">
//                             {currency}{product.offerPrice * product.quantity}
//                         </p>

//                         <button onClick={()=>removeFromCart(product._id)} className="mx-auto">
//                             <img src={assets.remove_icon} className="w-6"/>
//                         </button>
//                     </div>
//                 ))}

//                 <button
//                     onClick={()=>{navigate("/products"); scrollTo(0,0)}}
//                     className="flex items-center mt-8 gap-2 text-primary font-medium"
//                 >
//                     <img src={assets.arrow_right_icon_colored} className="w-4"/>
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* RIGHT SUMMARY */}
//             <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border border-gray-300/70">

//                 <h2 className="text-xl font-medium">Order Summary</h2>
//                 <hr className="my-5"/>

//                 {/* ADDRESS */}
//                 <p className="text-sm font-medium uppercase">Delivery Address</p>
//                 <div className="relative mt-2">
//                     <p className="text-gray-500">
//                         {selectedAddress 
//                         ? `${selectedAddress.street}, ${selectedAddress.city}` 
//                         : "No address"}
//                     </p>

//                     <button
//                         onClick={()=>setShowAddress(!showAddress)}
//                         className="text-primary text-sm"
//                     >
//                         Change
//                     </button>

//                     {showAddress && (
//                         <div className="absolute bg-white border mt-2 w-full z-10">
//                             {addresses.map(a=>(
//                                 <p
//                                     key={a._id}
//                                     onClick={()=>{
//                                         setSelectedAddress(a)
//                                         setShowAddress(false)
//                                     }}
//                                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                                 >
//                                     {a.street}, {a.city}
//                                 </p>
//                             ))}
//                             <p
//                                 onClick={()=>navigate("/add-address")}
//                                 className="p-2 text-primary cursor-pointer"
//                             >
//                                 Add address
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* PAYMENT */}
//                 <p className="text-sm font-medium uppercase mt-5">Payment Method</p>
//                 <select
//                     onChange={e=>setPaymentOption(e.target.value)}
//                     className="w-full border px-3 py-2 mt-2"
//                 >
//                     <option value="COD">Cash On Delivery</option>
//                     <option value="Online">Online Payment</option>
//                 </select>

//                 {/* COUPON */}
//                 <div className="flex gap-2 mt-4">
//                     <input
//                         value={coupon}
//                         onChange={e=>setCoupon(e.target.value)}
//                         placeholder="Coupon code"
//                         className="border px-3 py-2 w-full"
//                         disabled={discount>0}
//                     />

//                     {discount>0 ? (
//                         <button onClick={removeCoupon} className="bg-gray-300 px-4">
//                             Remove
//                         </button>
//                     ) : (
//                         <button onClick={applyCoupon} className="bg-primary text-white px-4">
//                             Apply
//                         </button>
//                     )}
//                 </div>

//                 <hr className="my-4"/>

//                 <div className="space-y-2 text-gray-600">
//                     <p className="flex justify-between">
//                         <span>Price</span>
//                         <span>{currency}{cartAmount}</span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Shipping Fee</span>
//                         <span>
//                             {deliveryCharge===0
//                                 ? <span className="text-green-600">Free</span>
//                                 : `${currency}${deliveryCharge}`}
//                         </span>
//                     </p>

//                     {discount>0 && (
//                         <p className="flex justify-between text-green-600">
//                             <span>Discount</span>
//                             <span>-{currency}{discount}</span>
//                         </p>
//                     )}

//                     <p className="flex justify-between font-semibold text-lg">
//                         <span>Total</span>
//                         <span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={placeOrder}
//                     className="w-full py-3 mt-6 bg-primary text-white"
//                 >
//                     {paymentOption==="COD" ? "Place Order" : "Proceed to Pay"}
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Cart































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext()

//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [showAddress, setShowAddress] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentOption, setPaymentOption] = useState("COD")

//     const [coupon, setCoupon] = useState("")
//     const [discount, setDiscount] = useState(0)

//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0

//     // ⭐ ADD THIS
//     useEffect(() => {
//         if (!coupon) return;

//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10))
//         }
//         else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50)
//         }

//     }, [cartAmount])


//     const applyCoupon = () => {
//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10))
//             toast.success("SAVE10 applied")
//         }
//         else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50)
//             toast.success("OFF50 applied")
//         }
//         else {
//             setDiscount(0)
//             toast.error("Invalid coupon")
//         }
//     }

//     const removeCoupon = () => {
//         setCoupon("")
//         setDiscount(0)
//         toast("Coupon removed")
//     }

//     const finalTotal = cartAmount + deliveryCharge - discount

//     const getCart = () => {
//         let tempArray = []
//         for (const key in cartItems) {
//             const product = products.find(item => item._id === key)
//             if (product) {
//                 tempArray.push({ ...product, quantity: cartItems[key] })
//             }
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async () => {
//         try {
//             const { data } = await axios.get('/api/address/get')
//             if (data.success) {
//                 setAddresses(data.addresses)
//                 if (data.addresses.length > 0) {
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async () => {
//         try {
//             if (!selectedAddress) {
//                 return toast.error("Please select address")
//             }

//             if (paymentOption === "COD") {
//                 const { data } = await axios.post('/api/order/cod', {
//                     userId: user._id,
//                     items: cartArray.map(item => ({
//                         product: item._id,
//                         quantity: item.quantity
//                     })),
//                     address: selectedAddress._id,
//                     coupon
//                 })

//                 if (data.success) {
//                     toast.success(data.message)
//                     setCartItems({})
//                     navigate('/my-orders')
//                 } else {
//                     toast.error(data.message)
//                 }
//             }
//             else {
//                 const { data } = await axios.post('/api/order/stripe', {
//                     userId: user._id,
//                     items: cartArray.map(item => ({
//                         product: item._id,
//                         quantity: item.quantity
//                     })),
//                     address: selectedAddress._id,
//                     coupon
//                 })

//                 if (data.success) {
//                     window.location.replace(data.url)
//                 } else {
//                     toast.error(data.message)
//                 }
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(() => {
//         if (products.length > 0) {
//             getCart()
//         }
//     }, [products, cartItems])

//     useEffect(() => {
//         if (user) {
//             getUserAddress()
//         }
//     }, [user])

//     return (
//         <div className="flex flex-col md:flex-row mt-16 gap-10">

//             {/* LEFT */}
//             <div className='flex-1 max-w-4xl'>
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm font-medium pb-3">
//                     <p>Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product, index) => (
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-t border-gray-200">

//                         <div className="flex items-center gap-4">
//                             <div
//                                 onClick={() => {
//                                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
//                                     scrollTo(0, 0)
//                                 }}
//                                 className="cursor-pointer w-24 h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white"
//                             >
//                                 <img className="h-full object-cover" src={product.image[0]} />
//                             </div>

//                             <div>
//                                 <p className="font-medium text-gray-700">{product.name}</p>
//                                 <p className="text-sm text-gray-400">
//                                     Weight: {product.weight || "N/A"}
//                                 </p>

//                                 <div className="flex items-center mt-1">
//                                     <p className="text-sm">Qty:</p>
//                                     <select
//                                         value={product.quantity}
//                                         onChange={e => updateCartItem(product._id, Number(e.target.value))}
//                                         className="ml-2 text-sm outline-none border border-gray-200 rounded px-1"
//                                     >
//                                         {Array(10).fill('').map((_, i) => (
//                                             <option key={i} value={i + 1}>{i + 1}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         <p className="text-center font-medium text-gray-700">
//                             {currency}{product.offerPrice * product.quantity}
//                         </p>

//                         <button onClick={() => removeFromCart(product._id)} className="mx-auto opacity-70 hover:opacity-100">
//                             <img src={assets.remove_icon} className="w-5" />
//                         </button>
//                     </div>
//                 ))}

//                 <button
//                     onClick={() => { navigate("/products"); scrollTo(0, 0) }}
//                     className="flex items-center mt-8 gap-2 text-primary font-medium"
//                 >
//                     <img src={assets.arrow_right_icon_colored} className="w-4" />
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* RIGHT SUMMARY */}
//             <div className="max-w-[360px] w-full bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">

//                 <h2 className="text-lg font-medium mb-4">Order Summary</h2>

//                 {/* ADDRESS */}
//                 <p className="text-xs text-gray-400 uppercase">Delivery Address</p>
//                 <div className="mt-1">
//                     <p className="text-gray-600 text-sm">
//                         {selectedAddress
//                             ? `${selectedAddress.street}, ${selectedAddress.city}`
//                             : "No address"}
//                     </p>

//                     <button
//                         onClick={() => setShowAddress(!showAddress)}
//                         className="text-primary text-xs mt-1"
//                     >
//                         Change
//                     </button>

//                     {showAddress && (
//                         <div className="border border-gray-200 mt-2 rounded bg-white">
//                             {addresses.map(a => (
//                                 <p
//                                     key={a._id}
//                                     onClick={() => {
//                                         setSelectedAddress(a)
//                                         setShowAddress(false)
//                                     }}
//                                     className="p-2 text-sm hover:bg-gray-50 cursor-pointer"
//                                 >
//                                     {a.street}, {a.city}
//                                 </p>
//                             ))}
//                             <p
//                                 onClick={() => navigate("/add-address")}
//                                 className="p-2 text-primary text-sm cursor-pointer"
//                             >
//                                 Add address
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* PAYMENT */}
//                 <p className="text-xs text-gray-400 uppercase mt-5">Payment</p>
//                 <select
//                     onChange={e => setPaymentOption(e.target.value)}
//                     className="w-full border border-gray-200 rounded px-3 py-2 mt-1 text-sm outline-none"
//                 >
//                     <option value="COD">Cash On Delivery</option>
//                     <option value="Online">Online Payment</option>
//                 </select>

//                 {/* COUPON */}
//                 <div className="flex gap-2 mt-4">
//                     <input
//                         value={coupon}
//                         onChange={e => setCoupon(e.target.value)}
//                         placeholder="Coupon code"
//                         className="border border-gray-200 rounded px-3 py-2 w-full text-sm outline-none"
//                         disabled={discount > 0}
//                     />

//                     {discount > 0 ? (
//                         <button onClick={removeCoupon} className="bg-gray-200 px-4 rounded text-sm">
//                             Remove
//                         </button>
//                     ) : (
//                         <button onClick={applyCoupon} className="bg-primary text-white px-4 rounded text-sm">
//                             Apply
//                         </button>
//                     )}
//                 </div>

//                 <div className="mt-5 space-y-2 text-sm text-gray-600">

//                     <p className="flex justify-between">
//                         <span>Price</span>
//                         <span>{currency}{cartAmount}</span>
//                     </p>

//                     <p className="flex justify-between">
//                         <span>Shipping</span>
//                         <span>
//                             {deliveryCharge === 0
//                                 ? <span className="text-green-600">Free</span>
//                                 : `${currency}${deliveryCharge}`}
//                         </span>
//                     </p>

//                     {discount > 0 && (
//                         <p className="flex justify-between text-green-600">
//                             <span>Discount</span>
//                             <span>-{currency}{discount}</span>
//                         </p>
//                     )}

//                     <p className="flex justify-between font-semibold text-base pt-2">
//                         <span>Total</span>
//                         <span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={placeOrder}
//                     className="w-full py-3 mt-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition"
//                 >
//                     {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
//                 </button>
//             </div>
//         </div>
//     )
// }


// export default Cart












































// -------------------------FULL UPDATED Cart.jsx (Razorpay UPI Integrated)---



// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext()

//     const [cartArray, setCartArray] = useState([])
//     const [addresses, setAddresses] = useState([])
//     const [showAddress, setShowAddress] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState(null)
//     const [paymentOption, setPaymentOption] = useState("COD")

//     const [coupon, setCoupon] = useState("")
//     const [discount, setDiscount] = useState(0)

//     const cartAmount = getCartAmount()
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0
//     const finalTotal = cartAmount + deliveryCharge - discount

//     useEffect(() => {
//         if (!coupon) return;

//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10))
//         }
//         else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50)
//         }
//     }, [cartAmount])

//     const applyCoupon = () => {
//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10))
//             toast.success("SAVE10 applied")
//         }
//         else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50)
//             toast.success("OFF50 applied")
//         }
//         else {
//             setDiscount(0)
//             toast.error("Invalid coupon")
//         }
//     }

//     const removeCoupon = () => {
//         setCoupon("")
//         setDiscount(0)
//         toast("Coupon removed")
//     }

//     const getCart = () => {
//         let tempArray = []
//         for (const key in cartItems) {
//             const product = products.find(item => item._id === key)
//             if (product) {
//                 tempArray.push({ ...product, quantity: cartItems[key] })
//             }
//         }
//         setCartArray(tempArray)
//     }

//     const getUserAddress = async () => {
//         try {
//             const { data } = await axios.get('/api/address/get')
//             if (data.success) {
//                 setAddresses(data.addresses)
//                 if (data.addresses.length > 0) {
//                     setSelectedAddress(data.addresses[0])
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // 🔥 RAZORPAY UPI FLOW
//     const handleUpiPayment = async () => {
//         try {
//             if (!selectedAddress) {
//                 return toast.error("Please select address")
//             }

//             const { data } = await axios.post('/api/order/upi/create', {
//                 userId: user._id,
//                 items: cartArray.map(item => ({
//                     product: item._id,
//                     quantity: item.quantity
//                 })),
//                 address: selectedAddress._id,
//                 coupon
//             })

//             if (!data.success) {
//                 return toast.error(data.message)
//             }

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: data.amount,
//                 currency: "INR",
//                 name: "DesiBazar",
//                 description: "UPI Order Payment",
//                 order_id: data.razorpayOrderId,

//                 method: {
//                     upi: true,
//                     card: false,
//                     netbanking: false,
//                     wallet: false
//                 },

//                 handler: async function (response) {
//                     const verifyRes = await axios.post('/api/order/upi/verify', {
//                         razorpayOrderId: response.razorpay_order_id,
//                         razorpayPaymentId: response.razorpay_payment_id,
//                         razorpaySignature: response.razorpay_signature
//                     })

//                     if (verifyRes.data.success) {
//                         toast.success("Payment Successful 🎉")
//                         setCartItems({})
//                         navigate('/my-orders')
//                     } else {
//                         toast.error("Payment verification failed")
//                     }
//                 },

//                 theme: { color: "#16a34a" }
//             }

//             const rzp = new window.Razorpay(options)
//             rzp.open()

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const placeOrder = async () => {
//         if (paymentOption === "COD") {
//             try {
//                 const { data } = await axios.post('/api/order/cod', {
//                     userId: user._id,
//                     items: cartArray.map(item => ({
//                         product: item._id,
//                         quantity: item.quantity
//                     })),
//                     address: selectedAddress._id,
//                     coupon
//                 })

//                 if (data.success) {
//                     toast.success(data.message)
//                     setCartItems({})
//                     navigate('/my-orders')
//                 } else {
//                     toast.error(data.message)
//                 }
//             } catch (error) {
//                 toast.error(error.message)
//             }
//         } else {
//             handleUpiPayment()
//         }
//     }

//     useEffect(() => {
//         if (products.length > 0) {
//             getCart()
//         }
//     }, [products, cartItems])

//     useEffect(() => {
//         if (user) {
//             getUserAddress()
//         }
//     }, [user])

//     return (
//         <div className="flex flex-col md:flex-row mt-16 gap-10">
//             {/* UI SAME AS BEFORE */}
//         </div>
//     )
// }

// export default Cart



































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const {
//     products,
//     currency,
//     cartItems,
//     removeFromCart,
//     getCartCount,
//     updateCartItem,
//     navigate,
//     getCartAmount,
//     axios,
//     user,
//     setCartItems
//   } = useAppContext();

//   const [cartArray, setCartArray] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [showAddress, setShowAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentOption, setPaymentOption] = useState("COD");

//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const cartAmount = getCartAmount();
//   const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0;
//   const finalTotal = cartAmount + deliveryCharge - discount;

//   // ==============================
//   // COUPON AUTO UPDATE
//   // ==============================
//   useEffect(() => {
//     if (!coupon) return;

//     if (coupon.toLowerCase() === "save10") {
//       setDiscount(Math.floor(cartAmount * 0.1));
//     } else if (coupon.toLowerCase() === "off50") {
//       setDiscount(50);
//     }
//   }, [cartAmount]);

//   const applyCoupon = () => {
//     if (coupon.toLowerCase() === "save10") {
//       setDiscount(Math.floor(cartAmount * 0.1));
//       toast.success("SAVE10 applied");
//     } else if (coupon.toLowerCase() === "off50") {
//       setDiscount(50);
//       toast.success("OFF50 applied");
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon");
//     }
//   };

//   const removeCoupon = () => {
//     setCoupon("");
//     setDiscount(0);
//     toast("Coupon removed");
//   };

//   // ==============================
//   // CART DATA
//   // ==============================
//   const getCart = () => {
//     let tempArray = [];
//     for (const key in cartItems) {
//       const product = products.find(item => item._id === key);
//       if (product) {
//         tempArray.push({ ...product, quantity: cartItems[key] });
//       }
//     }
//     setCartArray(tempArray);
//   };

//   // ==============================
//   // ADDRESS
//   // ==============================
//   const getUserAddress = async () => {
//     try {
//       const { data } = await axios.get("/api/address/get");
//       if (data.success) {
//         setAddresses(data.addresses);
//         if (data.addresses.length > 0) {
//           setSelectedAddress(data.addresses[0]);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ==============================
//   // 🔥 RAZORPAY UPI PAYMENT
//   // ==============================
//   const handleUpiPayment = async () => {
//     try {
//       if (!selectedAddress) {
//         return toast.error("Please select address");
//       }

//       const { data } = await axios.post(
//         "/api/payment/create-upi-order",
//         {
//           userId: user._id,
//           items: cartArray.map(item => ({
//             product: item._id,
//             quantity: item.quantity
//           })),
//           address: selectedAddress._id,
//           coupon
//         }
//       );

//       if (!data.success) {
//         return toast.error(data.message);
//       }

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         order_id: data.razorpayOrder.id,
//         amount: data.razorpayOrder.amount,
//         currency: "INR",
//         name: "DesiBazar",
//         description: "UPI Payment",

//         method: {
//           upi: true,
//           card: false,
//           netbanking: false,
//           wallet: false
//         },

//         handler: async function (response) {
//           const verifyRes = await axios.post(
//             "/api/payment/verify-upi",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId: data.orderId
//             }
//           );

//           if (verifyRes.data.success) {
//             toast.success("Payment Successful 🎉");
//             setCartItems({});
//             navigate("/my-orders");
//           } else {
//             toast.error("Payment verification failed");
//           }
//         },

//         theme: { color: "#16a34a" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ==============================
//   // PLACE ORDER
//   // ==============================
//   const placeOrder = async () => {
//     if (!selectedAddress) {
//       return toast.error("Please select address");
//     }

//     if (paymentOption === "COD") {
//       try {
//         const { data } = await axios.post("/api/order/cod", {
//           userId: user._id,
//           items: cartArray.map(item => ({
//             product: item._id,
//             quantity: item.quantity
//           })),
//           address: selectedAddress._id,
//           coupon
//         });

//         if (data.success) {
//           toast.success(data.message);
//           setCartItems({});
//           navigate("/my-orders");
//         } else {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     } else {
//       handleUpiPayment();
//     }
//   };

//   // ==============================
//   // EFFECTS
//   // ==============================
//   useEffect(() => {
//     if (products.length > 0) {
//       getCart();
//     }
//   }, [products, cartItems]);

//   useEffect(() => {
//     if (user) {
//       getUserAddress();
//     }
//   }, [user]);

//   // ==============================
//   // UI
//   // ==============================
//   return (
//     <div className="flex flex-col md:flex-row mt-16 gap-10">

//       {/* LEFT CART */}
//       <div className="flex-1 max-w-4xl">
//         <h1 className="text-3xl font-medium mb-6">
//           Shopping Cart{" "}
//           <span className="text-sm text-primary">
//             {getCartCount()} Items
//           </span>
//         </h1>

//         {cartArray.map((product, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center py-4 border-t"
//           >
//             <div className="flex gap-4">
//               <img
//                 src={product.image[0]}
//                 className="w-24 h-24 object-cover border rounded"
//               />
//               <div>
//                 <p className="font-medium">{product.name}</p>
//                 <p className="text-sm text-gray-400">
//                   Qty: {product.quantity}
//                 </p>
//                 <select
//                   value={product.quantity}
//                   onChange={e =>
//                     updateCartItem(product._id, Number(e.target.value))
//                   }
//                   className="border mt-1"
//                 >
//                   {Array(10)
//                     .fill("")
//                     .map((_, i) => (
//                       <option key={i} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>

//             <p className="font-medium">
//               {currency}
//               {product.offerPrice * product.quantity}
//             </p>

//             <button onClick={() => removeFromCart(product._id)}>
//               <img src={assets.remove_icon} className="w-5" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT SUMMARY */}
//       <div className="w-full max-w-[360px] border p-6 rounded-lg">
//         <h2 className="text-lg font-medium mb-4">Order Summary</h2>

//         <p className="flex justify-between">
//           <span>Subtotal</span>
//           <span>{currency}{cartAmount}</span>
//         </p>

//         <p className="flex justify-between">
//           <span>Delivery</span>
//           <span>{deliveryCharge === 0 ? "Free" : currency + deliveryCharge}</span>
//         </p>

//         {discount > 0 && (
//           <p className="flex justify-between text-green-600">
//             <span>Discount</span>
//             <span>-{currency}{discount}</span>
//           </p>
//         )}

//         <p className="flex justify-between font-semibold mt-2">
//           <span>Total</span>
//           <span>{currency}{finalTotal}</span>
//         </p>

//         <select
//           onChange={e => setPaymentOption(e.target.value)}
//           className="w-full border mt-4 p-2"
//         >
//           <option value="COD">Cash On Delivery</option>
//           <option value="UPI">UPI (Razorpay)</option>
//         </select>

//         <button
//           onClick={placeOrder}
//           className="w-full bg-primary text-white py-3 mt-4 rounded"
//         >
//           {paymentOption === "COD" ? "Place Order" : "Pay via UPI"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;




















// ✅ FULL FINAL Cart.jsx (UI SAME AS BEFORE)


// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         products,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         axios,
//         user,
//         setCartItems
//     } = useAppContext();

//     const [cartArray, setCartArray] = useState([]);
//     const [addresses, setAddresses] = useState([]);
//     const [showAddress, setShowAddress] = useState(false);
//     const [selectedAddress, setSelectedAddress] = useState(null);
//     const [paymentOption, setPaymentOption] = useState("COD");

//     const [userLocation, setUserLocation] = useState(null)


//     const [coupon, setCoupon] = useState("");
//     const [discount, setDiscount] = useState(0);

//     const cartAmount = getCartAmount();
//     const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0;

//     /* ================= COUPON ================= */
//     useEffect(() => {
//         if (!coupon) return;

//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10));
//         } else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50);
//         }
//     }, [cartAmount]);

//     const applyCoupon = () => {
//         if (coupon.toLowerCase() === "save10") {
//             setDiscount(Math.floor(cartAmount * 0.10));
//             toast.success("SAVE10 applied");
//         } else if (coupon.toLowerCase() === "off50") {
//             setDiscount(50);
//             toast.success("OFF50 applied");
//         } else {
//             setDiscount(0);
//             toast.error("Invalid coupon");
//         }
//     };

//     const removeCoupon = () => {
//         setCoupon("");
//         setDiscount(0);
//         toast("Coupon removed");
//     };

//     const finalTotal = cartAmount + deliveryCharge - discount;

//     /* ================= CART ================= */
//     const getCart = () => {
//         let tempArray = [];
//         for (const key in cartItems) {
//             const product = products.find(item => item._id === key);
//             if (product) {
//                 tempArray.push({ ...product, quantity: cartItems[key] });
//             }
//         }
//         setCartArray(tempArray);
//     };

//     /* ================= ADDRESS ================= */
//     const getUserAddress = async () => {
//         try {
//             const { data } = await axios.get("/api/address/get");
//             if (data.success) {
//                 setAddresses(data.addresses);
//                 if (data.addresses.length > 0) {
//                     setSelectedAddress(data.addresses[0]);
//                 }
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };


//     /* ================= User se Location lo ================= */
//     const getCurrentLocation = () => {
//         if (!navigator.geolocation) {
//             toast.error("Location not supported")
//             return
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setUserLocation({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 })
//                 toast.success("Location captured 📍")
//             },
//             () => {
//                 toast.error("Location permission denied")
//             }
//         )
//     }



//     /* ================= RAZORPAY UPI ================= */

//     const handleUpiPayment = async () => {
//         try {
//             const { data } = await axios.post("/api/payment/create-upi-order", {
//                 userId: user._id,
//                 items: cartArray.map(item => ({
//                     product: item._id,
//                     quantity: item.quantity
//                 })),
//                 address: selectedAddress._id,
//                 coupon,
//                 location: userLocation   // 👈 ADD THIS
//             });

//             if (!data.success) return toast.error(data.message);

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 order_id: data.razorpayOrder.id,
//                 amount: data.razorpayOrder.amount,
//                 currency: "INR",
//                 name: "DesiBazar",
//                 description: "Order Payment",

//                 method: {
//                     upi: true,
//                     card: false,
//                     netbanking: false,
//                     wallet: false
//                 },

//                 handler: async function (response) {
//                     const verify = await axios.post("/api/payment/verify-upi", {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         orderId: data.orderId
//                     });

//                     if (verify.data.success) {
//                         toast.success("Payment Successful 🎉");
//                         setCartItems({});
//                         navigate("/my-orders");
//                     } else {
//                         toast.error("Payment failed");
//                     }
//                 },

//                 theme: { color: "#16a34a" }
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();

//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     /* ================= PLACE ORDER COD ================= */
//     const placeOrder = async () => {
//         if (!selectedAddress) {
//             return toast.error("Please select address");
//         }

//         if (paymentOption === "COD") {
//             try {
//                 const { data } = await axios.post("/api/order/cod", {
//                     userId: user._id,
//                     items: cartArray.map(item => ({
//                         product: item._id,
//                         quantity: item.quantity
//                     })),
//                     address: selectedAddress._id,
//                     coupon,
//                     location: userLocation   // 👈 ADD THIS
//                 });

//                 if (data.success) {
//                     toast.success(data.message);
//                     setCartItems({});
//                     navigate("/my-orders");
//                 } else {
//                     toast.error(data.message);
//                 }
//             } catch (error) {
//                 toast.error(error.message);
//             }
//         } else {
//             handleUpiPayment();
//         }
//     };

//     useEffect(() => {
//         if (products.length > 0) getCart();
//     }, [products, cartItems]);

//     useEffect(() => {
//         if (user) getUserAddress();
//     }, [user]);




//     /* ================= UI (UNCHANGED) ================= */
//     return (
//         <div className="flex flex-col md:flex-row mt-16 gap-10">
//             {/* LEFT */}
//             <div className="flex-1 max-w-4xl">
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm font-medium pb-3">
//                     <p>Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.map((product, index) => (
//                     <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-t border-gray-200">
//                         <div className="flex items-center gap-4">
//                             <div
//                                 onClick={() => {
//                                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//                                     scrollTo(0, 0);
//                                 }}
//                                 className="cursor-pointer w-24 h-24 border border-gray-200 rounded-lg bg-white flex items-center justify-center"
//                             >
//                                 <img src={product.image[0]} className="h-full object-cover" />
//                             </div>

//                             <div>
//                                 <p className="font-medium text-gray-700">{product.name}</p>
//                                 <p className="text-sm text-gray-400">Weight: {product.weight || "N/A"}</p>
//                                 <div className="flex items-center mt-1">
//                                     <p className="text-sm">Qty:</p>
//                                     <select
//                                         value={product.quantity}
//                                         onChange={e => updateCartItem(product._id, Number(e.target.value))}
//                                         className="ml-2 text-sm border border-gray-200 rounded px-1 outline-none"
//                                     >
//                                         {Array(10).fill("").map((_, i) => (
//                                             <option key={i} value={i + 1}>{i + 1}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         <p className="text-center font-medium text-gray-700">
//                             {currency}{product.offerPrice * product.quantity}
//                         </p>

//                         <button onClick={() => removeFromCart(product._id)} className="mx-auto opacity-70 hover:opacity-100">
//                             <img src={assets.remove_icon} className="w-5" />
//                         </button>
//                     </div>
//                 ))}

//                 <button
//                     onClick={() => { navigate("/products"); scrollTo(0, 0); }}
//                     className="flex items-center mt-8 gap-2 text-primary font-medium"
//                 >
//                     <img src={assets.arrow_right_icon_colored} className="w-4" />
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* RIGHT */}
//             <div className="max-w-[360px] w-full bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
//                 <h2 className="text-lg font-medium mb-4">Order Summary</h2>

//                 {/* ADDRESS */}
//                 <p className="text-xs text-gray-400 uppercase">Delivery Address</p>
//                 <p className="text-gray-600 text-sm mt-1">
//                     {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : "No address"}
//                 </p>

//                 <button onClick={() => setShowAddress(!showAddress)} className="text-primary text-xs mt-1">
//                     Change
//                 </button>

//                 {/* location button  */}
//                 <button
//                     onClick={getCurrentLocation}
//                     className="text-primary text-xs mt-1 block"
//                 >
//                     📍 Use my current location
//                 </button>

//                 {userLocation && (
//                     <p className="text-green-600 text-xs mt-1">
//                         Location added successfully
//                     </p>
//                 )}


//                 {showAddress && (
//                     <div className="border border-gray-200 mt-2 rounded bg-white">
//                         {addresses.map(a => (
//                             <p
//                                 key={a._id}
//                                 onClick={() => {
//                                     setSelectedAddress(a);
//                                     setShowAddress(false);
//                                 }}
//                                 className="p-2 text-sm hover:bg-gray-50 cursor-pointer"
//                             >
//                                 {a.street}, {a.city}
//                             </p>
//                         ))}
//                         <p onClick={() => navigate("/add-address")} className="p-2 text-primary text-sm cursor-pointer">
//                             Add address
//                         </p>
//                     </div>
//                 )}

//                 {/* PAYMENT */}
//                 <p className="text-xs text-gray-400 uppercase mt-5">Payment</p>
//                 <select
//                     onChange={e => setPaymentOption(e.target.value)}
//                     className="w-full border border-gray-200 rounded px-3 py-2 mt-1 text-sm outline-none"
//                 >
//                     <option value="COD">Cash On Delivery</option>
//                     <option value="UPI">UPI (Razorpay)</option>
//                 </select>

//                 {/* COUPON */}
//                 <div className="flex gap-2 mt-4">
//                     <input
//                         value={coupon}
//                         onChange={e => setCoupon(e.target.value)}
//                         placeholder="Coupon code"
//                         className="border border-gray-200 rounded px-3 py-2 w-full text-sm outline-none"
//                         disabled={discount > 0}
//                     />

//                     {discount > 0 ? (
//                         <button onClick={removeCoupon} className="bg-gray-200 px-4 rounded text-sm">Remove</button>
//                     ) : (
//                         <button onClick={applyCoupon} className="bg-primary text-white px-4 rounded text-sm">Apply</button>
//                     )}
//                 </div>

//                 <div className="mt-5 space-y-2 text-sm text-gray-600">
//                     <p className="flex justify-between"><span>Price</span><span>{currency}{cartAmount}</span></p>
//                     <p className="flex justify-between">
//                         <span>Shipping</span>
//                         <span>{deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `${currency}${deliveryCharge}`}</span>
//                     </p>
//                     {discount > 0 && (
//                         <p className="flex justify-between text-green-600">
//                             <span>Discount</span><span>-{currency}{discount}</span>
//                         </p>
//                     )}
//                     <p className="flex justify-between font-semibold text-base pt-2">
//                         <span>Total</span><span>{currency}{finalTotal}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={placeOrder}
//                     className="w-full py-3 mt-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition"
//                 >
//                     {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Cart;



























import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        updateCartItem,
        navigate,
        getCartAmount,
        axios,
        user,
        setCartItems,
        setShowUserLogin   // 👈 ADD THIS
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const [userLocation, setUserLocation] = useState(null);

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);

    // ✅ NEW STATE (ONLY ADDITION)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isLocating, setIsLocating] = useState(false); // 👈 ADD THIS

    const cartAmount = getCartAmount();
    const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0;

    // ✅ Custom confirm)
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    /* ================= COUPON ================= */
    useEffect(() => {
        if (!coupon) return;

        if (coupon.toLowerCase() === "save10") {
            setDiscount(Math.floor(cartAmount * 0.10));
        } else if (coupon.toLowerCase() === "off50") {
            setDiscount(50);
        }
    }, [cartAmount]);

    const applyCoupon = () => {
        if (coupon.toLowerCase() === "save10") {
            setDiscount(Math.floor(cartAmount * 0.10));
            toast.success("SAVE10 applied");
        } else if (coupon.toLowerCase() === "off50") {
            setDiscount(50);
            toast.success("OFF50 applied");
        } else {
            setDiscount(0);
            toast.error("Invalid coupon");
        }
    };

    const removeCoupon = () => {
        setCoupon("");
        setDiscount(0);
        toast("Coupon removed");
    };

    const finalTotal = cartAmount + deliveryCharge - discount;

    /* ================= CART ================= */
    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find(item => item._id === key);
            if (product) {
                tempArray.push({ ...product, quantity: cartItems[key] });
            }
        }
        setCartArray(tempArray);
    };

    /* ================= ADDRESS ================= */
    const getUserAddress = async () => {
        try {
            const { data } = await axios.get("/api/address/get");
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    /* ================= ADDRESS DELETE ================= */
    // const deleteAddress = async (id) => {
    //     if (!confirm("Delete this address?")) return
    //     try {
    //         const { data } = await axios.delete(`/api/address/delete/${id}`)

    //         if (data.success) {
    //             toast.success("Address deleted")
    //             setAddresses(prev => prev.filter(a => a._id !== id))
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    /* ================= ADDRESS SET AS DEFAULT ================= */
    const setDefaultAddress = async (id) => {
        try {
            const { data } = await axios.put(`/api/address/default/${id}`)
            if (data.success) {
                toast.success("Default address updated")
                getUserAddress()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /* =================  CONFIRM DELETE ADDRESS ================= */
    const confirmDeleteAddress = async () => {
        try {
            const { data } = await axios.delete(`/api/address/delete/${deleteId}`);
            if (data.success) {
                toast.success("Address deleted");
                setAddresses(prev => prev.filter(a => a._id !== deleteId));
            }
        } catch (error) {
            toast.error(error.message);
        }
        setShowConfirm(false);
    };

    /* ================= User se Location lo ================= */
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Location not supported");
            return;
        }

        setIsLocating(true); // 🔄 loader start

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                toast.success("Location captured 📍");
                setIsLocating(false); // 🛑 loader stop
            },
            () => {
                toast.error("Location permission denied");
                setIsLocating(false); // 🛑 loader stop
            }
        );
    };


    /* ================= RAZORPAY UPI ================= */
    const handleUpiPayment = async () => {

        if (!user) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }

        if (!selectedAddress) {
            toast.error("Add address first");
            navigate("/add-address");
            return;
        }

        try {

            // 🔥 CREATE ORDER (UPI)
            const { data } = await axios.post(
                "/api/payment/create-upi-order",
                {
                    userId: user._id,   // 👈 IMPORTANT
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id,
                    coupon,
                    location: userLocation || null
                },
                {
                    withCredentials: true   // 👈 COOKIE FIX
                }
            );

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            // 🔥 RAZORPAY POPUP
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                order_id: data.razorpayOrder.id,
                amount: data.razorpayOrder.amount,
                currency: "INR",
                name: "DesiBazar",
                description: "Order Payment",
                method: {
                    upi: true,
                    card: false,
                    netbanking: false,
                    wallet: false
                },

                handler: async function (response) {

                    try {

                        const verify = await axios.post(
                            "/api/payment/verify-upi",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: data.orderId
                            },
                            {
                                withCredentials: true   // 👈 COOKIE FIX AGAIN
                            }
                        );

                        if (verify.data.success) {
                            toast.success("Payment Successful 🎉");
                            setCartItems({});
                            navigate("/my-orders");
                        } else {
                            toast.error("Payment verification failed");
                        }

                    } catch (err) {
                        toast.error("Payment verify error");
                    }
                },

                theme: { color: "#16a34a" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.log(error);
            toast.error("UPI failed");
        }
    };


    /* ================= PLACE ORDER COD ================= */
    const placeOrder = async () => {
        if (isPlacingOrder) return;

        if (!user) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }

        if (!selectedAddress) {
            toast.error("Please add address first");
            navigate("/add-address");
            return;
        }

        setIsPlacingOrder(true);

        try {
            if (paymentOption === "COD") {
                const { data } = await axios.post("/api/order/cod", {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id,
                    coupon,
                    location: userLocation || null
                });

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate("/my-orders");
                } else {
                    toast.error(data.message);
                }
            } else {
                await handleUpiPayment();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsPlacingOrder(false);
        }
    };


    useEffect(() => {
        if (products.length > 0) getCart();
    }, [products, cartItems]);

    useEffect(() => {
        if (user) getUserAddress();
    }, [user]);

    /* ================= UI (UNCHANGED) ================= */
    return (
        <>
            <div className="flex flex-col md:flex-row mt-16 gap-10">

                {/* LEFT */}
                <div className="flex-1 max-w-4xl">
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm font-medium pb-3">
                        <p>Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div
                                    onClick={() => {
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                        scrollTo(0, 0);
                                    }}
                                    className="cursor-pointer w-24 h-24 border border-gray-200 rounded-lg bg-white flex items-center justify-center"
                                >
                                    <img src={product.image[0]} className="h-full object-cover" />
                                </div>

                                <div>
                                    <p className="font-medium text-gray-700">{product.name}</p>
                                    <p className="text-sm text-gray-400">Weight: {product.weight || "N/A"}</p>
                                    <div className="flex items-center mt-1">
                                        <p className="text-sm"></p>
                                        <div className="flex items-center gap-2 mt-1">

                                            <p className="text-sm">Qty:</p>

                                            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        product.quantity > 1 &&
                                                        updateCartItem(product._id, product.quantity - 1)
                                                    }
                                                    className="px-2 py-0.5 text-sm bg-gray-100 hover:bg-gray-200"
                                                >
                                                    −
                                                </button>

                                                <div className="px-3 py-0.5 text-sm font-medium bg-white min-w-[28px] text-center">
                                                    {product.quantity}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        product.quantity < 5 &&
                                                        updateCartItem(product._id, product.quantity + 1)
                                                    }
                                                    className="px-2 py-0.5 text-sm bg-gray-100 hover:bg-gray-200"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center font-medium text-gray-700">
                                {currency}{product.offerPrice * product.quantity}
                            </p>

                            <button onClick={() => removeFromCart(product._id)} className="mx-auto opacity-70 hover:opacity-100">
                                <img src={assets.remove_icon} className="w-5" />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => { navigate("/products"); scrollTo(0, 0); }}
                        className="flex items-center mt-8 gap-2 text-primary font-medium"
                    >
                        <img src={assets.arrow_right_icon_colored} className="w-4" />
                        Continue Shopping
                    </button>
                </div>

                {/* RIGHT */}
                <div className="max-w-[360px] w-full bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>





                    <p className="text-xs text-gray-400 uppercase">Delivery Address</p>

                    <div className="mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-700 leading-snug">
                            {selectedAddress
                                ? `${selectedAddress.street}, ${selectedAddress.city}`
                                : "No address selected"}
                        </p>

                        <div className="flex gap-2 mt-3">
                            {/* CHANGE BUTTON */}

                            <button
                                onClick={() => {
                                    if (!user) {
                                        toast.error("Please login first");
                                        setShowUserLogin(true);
                                        return;
                                    }
                                    setShowAddress(!showAddress);
                                }}

                                className="text-xs px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition font-medium"
                            >
                                Add/Change
                            </button>


                            <button
                                onClick={getCurrentLocation}
                                disabled={isLocating}
                                className="text-xs px-3 py-1.5 rounded-md bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition font-medium flex items-center gap-2 disabled:opacity-60"
                            >
                                {isLocating && (
                                    <span className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                                )}

                                {isLocating ? "Getting location..." : "📍 Share Current Location"}
                            </button>

                        </div>
                    </div>

                    {userLocation && (
                        <p className="text-green-600 text-xs mt-1">
                            Location added successfully
                        </p>
                    )}


                    {showAddress && (
                        <div className="border border-gray-200 mt-2 rounded bg-white">

                            {addresses.map(a => (
                                <div
                                    key={a._id}
                                    className="p-3 border-b flex justify-between items-center"
                                >

                                    <div
                                        onClick={() => {
                                            setSelectedAddress(a)
                                            setShowAddress(false)
                                        }}
                                        className="cursor-pointer"
                                    >

                                        <p className="text-sm font-medium">
                                            {a.street}, {a.city}
                                        </p>

                                        {a.isDefault && (
                                            <span className="text-xs text-green-600 font-medium">
                                                Default
                                            </span>
                                        )}

                                    </div>

                                    <div className="flex gap-3">

                                        {!a.isDefault && (
                                            <button
                                                onClick={() => setDefaultAddress(a._id)}
                                                className="text-xs text-blue-600"
                                            >
                                                Set Default
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                setDeleteId(a._id)
                                                setShowConfirm(true)
                                            }}
                                            className="text-xs text-red-500"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            ))}

                            <button
                                onClick={() => navigate("/add-address")}
                                className="w-full text-left px-3 py-2 text-sm text-primary bg-primary/9 hover:bg-primary/14 rounded-md transition font-medium"
                            >
                                + Add New Address
                            </button>

                        </div>
                    )}



                    <p className="text-xs text-gray-400 uppercase mt-5">Payment</p>
                    <select
                        onChange={e => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 mt-1 text-sm outline-none"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="UPI">UPI (Razorpay)</option>
                    </select>

                    <div className="flex gap-2 mt-4">
                        <input
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                            placeholder="Coupon code"
                            className="border border-gray-200 rounded px-3 py-2 w-full text-sm outline-none"
                            disabled={discount > 0}
                        />

                        {discount > 0 ? (
                            <button onClick={removeCoupon} className="bg-gray-200 px-4 rounded text-sm">Remove</button>
                        ) : (
                            <button onClick={applyCoupon} className="bg-primary text-white px-4 rounded text-sm">Apply</button>
                        )}
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                        <p className="flex justify-between"><span>Price</span><span>{currency}{cartAmount}</span></p>
                        <p className="flex justify-between">
                            <span>Shipping</span>
                            <span>{deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `${currency}${deliveryCharge}`}</span>
                        </p>
                        {discount > 0 && (
                            <p className="flex justify-between text-green-600">
                                <span>Discount</span><span>-{currency}{discount}</span>
                            </p>
                        )}
                        <p className="flex justify-between font-semibold text-base pt-2">
                            <span>Total</span><span>{currency}{finalTotal}</span>
                        </p>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={isPlacingOrder}
                        className="w-full py-3 mt-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isPlacingOrder
                            ? "Placing Order..."
                            : paymentOption === "COD"
                                ? "Place Order"
                                : "Proceed to Pay"}
                    </button>
                </div>

            </div>

            {showConfirm && (
                <ConfirmModal
                    message="Delete this address?"
                    onConfirm={confirmDeleteAddress}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

        </>
    );
};

export default Cart;

