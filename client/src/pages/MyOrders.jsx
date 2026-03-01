// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { dummyOrders } from '../assets/assets'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const {currency, axios, user} = useAppContext()

//     const fetchMyOrders = async ()=>{
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if(data.success){
//                 setMyOrders(data.orders)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//     if(!user) return;

//     fetchMyOrders();

//     // auto refresh every 5 sec
//     const interval = setInterval(()=>{
//         fetchMyOrders();
//     },5000);

//     return ()=> clearInterval(interval);

// },[user])

//   return (
//     <div className='mt-16 pb-16'>
//         <div className='flex flex-col items-end w-max mb-8'>
//             <p className='text-2xl font-medium uppercase'>My orders</p>
//             <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>
//         {myOrders.map((order, index)=>(
//             <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
//                 <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//                     <span>OrderId : {order._id}</span>
//                     <span>Payment : {order.paymentType}</span>
//                     <span>Total Amount : {currency}{order.amount}</span>
//                 </p>
//                 {order.items.map((item, index)=>(
//                     <div key={index}
//                     className={`relative bg-white text-gray-500/70 ${
//                 order.items.length !== index + 1 && "border-b"
//               } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

//                       <div className='flex items-center mb-4 md:mb-0'>
//                         <div className='bg-primary/10 p-4 rounded-lg'>
//                          <img src={item.product.image[0]} alt="" className='w-16 h-16' />
//                          </div>
//                          <div className='ml-4'>
//                             <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                             <p>Category: {item.product.category}</p>
//                          </div>
//                        </div>

//                     <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                         <p>Quantity: {item.quantity || "1"}</p>
//                         <p>Status: {order.status}</p>
//                         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <p className='text-primary text-lg font-medium'>
//                         Amount: {currency}{item.product.offerPrice * item.quantity}
//                     </p>

//                     </div>
//                 ))}
//             </div>
//         ))}

//     </div>
//   )
// }

// export default MyOrders






// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const {currency, axios, user} = useAppContext()

//     const fetchMyOrders = async ()=>{
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if(data.success){
//                 setMyOrders(data.orders)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//         if(!user) return;

//         fetchMyOrders();

//         const interval = setInterval(()=>{
//             fetchMyOrders();
//         },5000);

//         return ()=> clearInterval(interval);

//     },[user])

//     // ⭐ STATUS COLOR FUNCTION
//     const getStatusColor = (status)=>{
//         if(status === "Pending") return "bg-gray-200 text-gray-700";
//         if(status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if(status === "Shipped") return "bg-blue-200 text-blue-800";
//         if(status === "Out for delivery") return "bg-purple-200 text-purple-800";
//         if(status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//   return (
//     <div className='mt-16 pb-16'>
//         <div className='flex flex-col items-end w-max mb-8'>
//             <p className='text-2xl font-medium uppercase'>My orders</p>
//             <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>

//         {myOrders.map((order, index)=>(
//             <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>

//                 <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//                     <span>OrderId : {order._id}</span>
//                     <span>Payment : {order.paymentType}</span>
//                     <span>Total Amount : {currency}{order.amount}</span>
//                 </p>

//                 {order.items.map((item, index)=>(
//                     <div key={index}
//                     className={`relative bg-white text-gray-500/70 ${
//                         order.items.length !== index + 1 && "border-b"
//                     } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

//                       {/* PRODUCT */}
//                       <div className='flex items-center mb-4 md:mb-0'>
//                         <div className='bg-primary/10 p-4 rounded-lg'>
//                          <img src={item.product.image[0]} alt="" className='w-16 h-16' />
//                          </div>
//                          <div className='ml-4'>
//                             <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                             <p>Category: {item.product.category}</p>
//                          </div>
//                        </div>

//                     {/* INFO */}
//                     <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                         <p>Quantity: {item.quantity || "1"}</p>

//                         {/* ⭐ STATUS BADGE */}
//                         <p className='flex items-center gap-2'>
//                           Status:
//                           <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </p>

//                         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                     </div>

//                     {/* PRICE */}
//                     <p className='text-primary text-lg font-medium'>
//                         Amount: {currency}{item.product.offerPrice * item.quantity}
//                     </p>

//                     </div>
//                 ))}
//             </div>
//         ))}

//     </div>
//   )
// }

// export default MyOrders





















// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const {currency, axios, user} = useAppContext()

//     const fetchMyOrders = async ()=>{
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if(data.success){
//                 setMyOrders(data.orders)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//         if(!user) return;

//         fetchMyOrders();

//         const interval = setInterval(()=>{
//             fetchMyOrders();
//         },5000);

//         return ()=> clearInterval(interval);

//     },[user])

//     // ⭐ STATUS COLOR
//     const getStatusColor = (status)=>{
//         if(status === "Order Placed") return "bg-gray-200 text-gray-700";
//         if(status === "Pending") return "bg-gray-200 text-gray-700";
//         if(status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if(status === "Shipped") return "bg-blue-200 text-blue-800";
//         if(status === "Out for delivery") return "bg-purple-200 text-purple-800";
//         if(status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//     // ⭐ DATE + TIME FORMAT
//     const formatDateTime = (date)=>{
//         return new Date(date).toLocaleString("en-IN", {
//             day:"2-digit",
//             month:"short",
//             year:"numeric",
//             hour:"2-digit",
//             minute:"2-digit"
//         });
//     }

//   return (
//     <div className='mt-16 pb-16'>
//         <div className='flex flex-col items-end w-max mb-8'>
//             <p className='text-2xl font-medium uppercase'>My orders</p>
//             <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>

//         {myOrders.map((order, index)=>(
//             <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>

//                 <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//                     <span>OrderId : {order._id}</span>
//                     <span>Payment : {order.paymentType}</span>
//                     <span>Total Amount : {currency}{order.amount}</span>
//                 </p>

//                 {order.items.map((item, index)=>(
//                     <div key={index}
//                     className={`relative bg-white text-gray-500/70 ${
//                         order.items.length !== index + 1 && "border-b"
//                     } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

//                       {/* PRODUCT */}
//                       <div className='flex items-center mb-4 md:mb-0'>
//                         <div className='bg-primary/10 p-4 rounded-lg'>
//                          <img src={item.product.image[0]} alt="" className='w-16 h-16' />
//                          </div>
//                          <div className='ml-4'>
//                             <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                             <p>Category: {item.product.category}</p>
//                          </div>
//                        </div>

//                     {/* INFO */}
//                     <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                         <p>Quantity: {item.quantity || "1"}</p>

//                         <p className='flex items-center gap-2'>
//                           Status:
//                           <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </p>

//                         {/* ⭐ TIME */}
//                         <p>Date: {formatDateTime(order.createdAt)}</p>
//                     </div>

//                     <p className='text-primary text-lg font-medium'>
//                         Amount: {currency}{item.product.offerPrice * item.quantity}
//                     </p>

//                     </div>
//                 ))}
//             </div>
//         ))}

//     </div>
//   )
// }

// export default MyOrders



























// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const {currency, axios, user} = useAppContext()

//     const fetchMyOrders = async ()=>{
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if(data.success){
//                 setMyOrders(data.orders)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//         if(!user) return;

//         fetchMyOrders();

//         const interval = setInterval(()=>{
//             fetchMyOrders();
//         },5000);

//         return ()=> clearInterval(interval);

//     },[user])

//     // STATUS COLOR
//     const getStatusColor = (status)=>{
//         if(status === "Order Placed") return "bg-gray-200 text-gray-700";
//         if(status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if(status === "Out for delivery") return "bg-blue-200 text-blue-800";
//         if(status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//     // DATE + TIME
//     const formatDateTime = (date)=>{
//         return new Date(date).toLocaleString("en-IN", {
//             day:"2-digit",
//             month:"short",
//             year:"numeric",
//             hour:"2-digit",
//             minute:"2-digit"
//         });
//     }

//   return (
//     <div className='mt-16 pb-16'>
//         <div className='flex flex-col items-end w-max mb-8'>
//             <p className='text-2xl font-medium uppercase'>My orders</p>
//             <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>

//         {myOrders.map((order, index)=>(
//             <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>

//                 {/* HEADER */}
//                 <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//                     <span>OrderId : {order._id}</span>
//                     <span>Payment : {order.paymentType}</span>
//                     <span>Total Amount : {currency}{order.amount}</span>
//                 </p>

//                 {/* ITEMS */}
//                 {order.items.map((item, index)=>(
//                     <div key={index}
//                     className={`relative bg-white text-gray-500/70 ${
//                         order.items.length !== index + 1 && "border-b"
//                     } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

//                       {/* PRODUCT */}
//                       <div className='flex items-center mb-4 md:mb-0'>
//                         <div className='bg-primary/10 p-4 rounded-lg'>
//                          <img src={item.product.image[0]} alt="" className='w-16 h-16' />
//                          </div>
//                          <div className='ml-4'>
//                             <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                             <p>Category: {item.product.category}</p>
//                          </div>
//                        </div>

//                     {/* INFO */}
//                     <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                         <p>Quantity: {item.quantity || "1"}</p>

//                         <p className='flex items-center gap-2'>
//                           Status:
//                           <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </p>

//                         <p>Date: {formatDateTime(order.createdAt)}</p>
//                     </div>

//                     {/* RIGHT SIDE QUICK UI */}
//                     <div className="text-right">
//                         {order.status !== "Delivered" ? (
//                           <>
//                             <p className="text-sm text-gray-500">Quick delivery</p>
//                             <p className="font-medium text-green-600">
//                               30 mins ⚡
//                             </p>
//                           </>
//                         ) : (
//                           <p className="text-green-600 font-medium">
//                             Delivered ⚡
//                           </p>
//                         )}
//                     </div>

//                     </div>
//                 ))}
//             </div>
//         ))}

//     </div>
//   )
// }

// export default MyOrders





























// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0) // for live timer
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) {
//                 setMyOrders(data.orders)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;

//         fetchMyOrders();

//         const interval = setInterval(() => {
//             fetchMyOrders();
//         }, 5000);

//         return () => clearInterval(interval);

//     }, [user])

//     // live timer tick
//     useEffect(() => {
//         const t = setInterval(() => {
//             setTick(prev => prev + 1)
//         }, 1000)

//         return () => clearInterval(t)
//     }, [])

//     // STATUS COLOR
//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700";
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800";
//         if (status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//     // DATE FORMAT
//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit"
//         });
//     }

//     // MAIN TIMER LOGIC
//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         // when delivered → freeze time
//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created

//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)

//             return `Delivered in ${mins}m ${secs}s`
//         }

//         // countdown 30 min
//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)

//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)

//         return `${mins}m ${secs}s`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map((order, index) => (
//                 <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>

//                     {/* HEADER */}
//                     <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//                         <span>Order #{order._id.slice(-6)}</span>
//                         <span>Payment : {order.paymentType}</span>
//                         <span>Total Amount : {currency}{order.amount}</span>
//                     </p>

//                     {/* ITEMS */}
//                     {order.items.map((item, index) => (
//                         <div key={index}
//                             className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b"
//                                 } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

//                             {/* PRODUCT */}
//                             <div className='flex items-center mb-4 md:mb-0'>
//                                 <div className='bg-primary/10 p-4 rounded-lg'>
//                                     <img src={item.product.image[0]} alt="" className='w-16 h-16' />
//                                 </div>
//                                 <div className='ml-4'>
//                                     <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                                     <p>Category: {item.product.category}</p>
//                                 </div>
//                             </div>

//                             {/* INFO */}
//                             <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                                 <p>Quantity: {item.quantity || "1"}</p>

//                                 <p className='flex items-center gap-2'>
//                                     Status:
//                                     <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
//                                         {order.status}
//                                     </span>
//                                 </p>

//                                 <p>Date: {formatDateTime(order.createdAt)}</p>
//                             </div>

//                             {/* TIMER UI */}
//                             <div className="w-[160px] flex justify-end">

//                                 {order.status !== "Delivered" ? (
//                                     <p className="font-medium text-green-600 tabular-nums text-right whitespace-nowrap">
//                                         Arriving in {getDeliveryTimeText(order)} ⚡
//                                     </p>
//                                 ) : (
//                                     <p className="font-medium text-green-600 tabular-nums text-right whitespace-nowrap">
//                                         {getDeliveryTimeText(order)} ⚡
//                                     </p>
//                                 )}

//                             </div>



//                         </div>
//                     ))}
//                 </div>
//             ))}

//         </div>
//     )
// }

// export default MyOrders



















































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0)
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) setMyOrders(data.orders)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;
//         fetchMyOrders();

//         const interval = setInterval(fetchMyOrders, 5000)
//         return () => clearInterval(interval)

//     }, [user])

//     useEffect(() => {
//         const t = setInterval(() => setTick(p => p + 1), 1000)
//         return () => clearInterval(t)
//     }, [])

//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//         if (status === "Delivered") return "bg-green-200 text-green-800"
//         return "bg-gray-200"
//     }

//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//         })
//     }

//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created
//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)
//             return `Delivered in ${mins}m ${secs}s`
//         }

//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)

//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)

//         return `${mins}m ${secs}s`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map(order => (

//                 <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

//                     {/* HEADER */}
//                     <div className='flex justify-between text-gray-500 mb-4'>
//                         <p>Order #{order._id.slice(-6)}</p>
//                         <p>Payment: {order.paymentType}</p>
//                         <p>Total: {currency}{order.amount}</p>
//                     </div>

//                     {/* ITEMS LIST */}
//                     <div className="space-y-4">

//                         {order.items.map((item, i) => (
//                             <div key={i} className="flex justify-between items-center">

//                                 {/* LEFT */}
//                                 <div className="flex items-center gap-4">
//                                     <div className="bg-primary/10 p-3 rounded-lg">
//                                         <img src={item.product.image[0]} className="w-14 h-14"/>
//                                     </div>

//                                     <div>
//                                         <p className="font-medium">{item.product.name}</p>
//                                         <p className="text-sm text-gray-500">
//                                             Qty: {item.quantity}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* RIGHT INFO */}
//                                 <div className="text-sm text-right">
//                                     <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
//                                         {order.status}
//                                     </span>
//                                     <p className="text-gray-500">
//                                         {formatDateTime(order.createdAt)}
//                                     </p>
//                                 </div>

//                             </div>
//                         ))}

//                     </div>

//                     {/* TIMER */}
//                     <div className="flex justify-end mt-5">
//                         <p className="font-semibold text-green-600 tabular-nums">
//                             {order.status === "Delivered"
//                                 ? getDeliveryTimeText(order)
//                                 : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                         </p>
//                     </div>

//                 </div>

//             ))}

//         </div>
//     )
// }

// export default MyOrders


































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0)
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) setMyOrders(data.orders)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;
//         fetchMyOrders();
//         const interval = setInterval(fetchMyOrders, 5000)
//         return () => clearInterval(interval)
//     }, [user])

//     useEffect(() => {
//         const t = setInterval(() => setTick(p => p + 1), 1000)
//         return () => clearInterval(t)
//     }, [])

//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//         if (status === "Delivered") return "bg-green-200 text-green-800"
//         return "bg-gray-200"
//     }

//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//         })
//     }

//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created
//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)
//             return `Delivered in ${mins}m ${secs}s`
//         }

//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)
//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)
//         return `${mins}m ${secs}s`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map(order => (

//                 <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

//                     {/* HEADER */}
//                     <div className="mb-4">

//                         {/* top row */}
//                         <div className="flex justify-between items-center">

//                             <p className="text-gray-500 font-medium">
//                                 Order #{order._id.slice(-6)}
//                             </p>

//                             {/* PAYMENT BADGE */}
//                             <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">
//                                 {order.paymentType}
//                             </span>

//                         </div>

//                         {/* TOTAL HIGHLIGHT */}
//                         <p className="mt-1 text-lg font-semibold text-green-400">
//                             Total {currency}{order.amount}
//                         </p>

//                     </div>

//                     {/* STATUS + DATE ONCE */}
//                     <div className="flex justify-between items-center mb-4">
//                         <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
//                             {order.status}
//                         </span>
//                         <p className="text-sm text-gray-500">
//                             {formatDateTime(order.createdAt)}
//                         </p>
//                     </div>

//                     {/* ITEMS */}
//                     <div className="space-y-3">

//                         {order.items.map((item, i) => (
//                             <div key={i} className="flex items-center gap-3">

//                                 {/* SMALL IMAGE */}
//                                 <div className="bg-primary/10 p-2 rounded-lg">
//                                     <img src={item.product.image[0]} className="w-12 h-12" />
//                                 </div>

//                                 <div className="flex-1">
//                                     <p className="font-medium text-sm">{item.product.name}</p>

//                                 </div>

//                             </div>
//                         ))}

//                     </div>

//                     {/* TIMER */}
//                     <div className="flex justify-end mt-5">
//                         <p className="font-semibold text-green-600 tabular-nums">
//                             {order.status === "Delivered"
//                                 ? getDeliveryTimeText(order)
//                                 : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                         </p>
//                     </div>

//                 </div>

//             ))}

//         </div>
//     )
// }

// export default MyOrders



































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0)
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) setMyOrders(data.orders)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;
//         fetchMyOrders();
//         const interval = setInterval(fetchMyOrders, 5000)
//         return () => clearInterval(interval)
//     }, [user])

//     useEffect(() => {
//         const t = setInterval(() => setTick(p => p + 1), 1000)
//         return () => clearInterval(t)
//     }, [])

//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//         if (status === "Delivered") return "bg-green-200 text-green-800"
//         return "bg-gray-200"
//     }

//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//         })
//     }

//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created
//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)
//             return `Delivered in ${mins}m ${secs}s`
//         }

//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)
//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)
//         return `${mins}m ${secs}s`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map(order => (

//                 <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

//                     {/* HEADER */}
//                     <div className="mb-4">

//                         <div className="flex justify-between items-center">
//                             <p className="text-gray-500 font-medium">
//                                 Order #{order._id.slice(-6)}
//                             </p>

//                             <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">
//                                 {order.paymentType}
//                             </span>
//                         </div>

//                         <p className="mt-1 text-lg font-semibold text-green-400">
//                             Total {currency}{order.amount}
//                         </p>
//                     </div>

//                     {/* STATUS */}
//                     <div className="flex justify-between items-center mb-4">
//                         <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
//                             {order.status}
//                         </span>
//                         <p className="text-sm text-gray-500">
//                             {formatDateTime(order.createdAt)}
//                         </p>
//                     </div>

//                     {/* ITEMS */}
//                     <div className="space-y-3">
//                         {order.items.map((item, i) => (
//                             <div key={i} className="flex items-center gap-3">

//                                 <div className="bg-primary/10 p-2 rounded-lg">
//                                     <img src={item.product.image[0]} className="w-12 h-12" />
//                                 </div>

//                                 <div className="flex-1 flex justify-between items-center">
//                                     <p className="font-medium text-sm">
//                                         {item.product.name} × {item.quantity}
//                                     </p>

//                                     {/* PRICE */}
//                                     <p className="font-semibold text-gray-700">
//                                         {currency}{item.price * item.quantity}
//                                     </p>
//                                 </div>

//                             </div>
//                         ))}
//                     </div>

//                     {/* CHARGES BREAKDOWN */}
//                     <div className="mt-5 border-t pt-4 space-y-1 text-sm">

//                         <div className="flex justify-between">
//                             <p>Subtotal</p>
//                             <p>{currency}{order.subtotal || order.amount}</p>
//                         </div>

//                         {order.deliveryCharge > 0 && (
//                             <div className="flex justify-between">
//                                 <p>Delivery</p>
//                                 <p>{currency}{order.deliveryCharge}</p>
//                             </div>
//                         )}

//                         {order.tax > 0 && (
//                             <div className="flex justify-between">
//                                 <p>Tax</p>
//                                 <p>{currency}{order.tax}</p>
//                             </div>
//                         )}

//                         {order.discount > 0 && (
//                             <div className="flex justify-between text-green-600">
//                                 <p>Discount</p>
//                                 <p>-{currency}{order.discount}</p>
//                             </div>
//                         )}

//                         <div className="flex justify-between font-semibold pt-2">
//                             <p>Total</p>
//                             <p>{currency}{order.amount}</p>
//                         </div>

//                     </div>

//                     {/* TIMER */}
//                     <div className="flex justify-end mt-5">
//                         <p className="font-semibold text-green-600 tabular-nums">
//                             {order.status === "Delivered"
//                                 ? getDeliveryTimeText(order)
//                                 : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                         </p>
//                     </div>

//                 </div>

//             ))}
//         </div>
//     )
// }

// export default MyOrders

































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0)
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) setMyOrders(data.orders)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;
//         fetchMyOrders();
//         const interval = setInterval(fetchMyOrders, 5000)
//         return () => clearInterval(interval)
//     }, [user])

//     useEffect(() => {
//         const t = setInterval(() => setTick(p => p + 1), 1000)
//         return () => clearInterval(t)
//     }, [])

//     // 🟢 CANCEL ORDER
//     const cancelOrder = async (orderId) => {
//         if (!confirm("Cancel this order?")) return

//         try {
//             const { data } = await axios.post('/api/order/cancel', { orderId })
//             if (data.success) {
//                 fetchMyOrders()
//             } else {
//                 alert(data.message)
//             }
//         } catch (error) {
//             alert(error.message)
//         }
//     }

//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//         if (status === "Delivered") return "bg-green-200 text-green-800"
//         if (status === "Cancelled") return "bg-red-200 text-red-700"
//         return "bg-gray-200"
//     }

//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//         })
//     }

//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created
//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)
//             return `Delivered in ${mins}m ${secs}s`
//         }

//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)
//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)
//         return `${mins}m ${secs}s`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map(order => {

//                 const created = new Date(order.createdAt).getTime()
//                 const now = Date.now()
//                 const canCancel =
//                     order.paymentType === "COD" &&
//                     order.status === "Order Placed" &&
//                     now - created <= 5 * 60 * 1000

//                 return (

//                     <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

//                         {/* HEADER */}
//                         <div className="mb-4">

//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-500 font-medium">
//                                     Order #{order._id.slice(-6)}
//                                 </p>

//                                 <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">
//                                     {order.paymentType}
//                                 </span>
//                             </div>

//                             <p className="mt-1 text-lg font-semibold text-green-400">
//                                 Total {currency}{order.amount}
//                             </p>
//                         </div>

//                         {/* STATUS */}
//                         <div className="flex justify-between items-center mb-4">
//                             <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
//                                 {order.status}
//                             </span>
//                             <p className="text-sm text-gray-500">
//                                 {formatDateTime(order.createdAt)}
//                             </p>
//                         </div>

//                         {/* ITEMS */}
//                         <div className="space-y-3">
//                             {order.items.map((item, i) => (
//                                 <div key={i} className="flex items-center gap-3">

//                                     <div className="bg-primary/10 p-2 rounded-lg">
//                                         <img src={item.product.image[0]} className="w-12 h-12" />
//                                     </div>

//                                     <div className="flex-1 flex justify-between items-center">
//                                         <p className="font-medium text-sm">
//                                             {item.product.name} × {item.quantity}
//                                         </p>

//                                         <p className="font-semibold text-gray-700">
//                                             {currency}{item.price * item.quantity}
//                                         </p>
//                                     </div>

//                                 </div>
//                             ))}
//                         </div>

//                         {/* CHARGES */}
//                         <div className="mt-5 border-t pt-4 space-y-1 text-sm">

//                             <div className="flex justify-between">
//                                 <p>Subtotal</p>
//                                 <p>{currency}{order.subtotal || order.amount}</p>
//                             </div>

//                             {order.deliveryCharge > 0 && (
//                                 <div className="flex justify-between">
//                                     <p>Delivery</p>
//                                     <p>{currency}{order.deliveryCharge}</p>
//                                 </div>
//                             )}

//                             {order.discount > 0 && (
//                                 <div className="flex justify-between text-green-600">
//                                     <p>Discount</p>
//                                     <p>-{currency}{order.discount}</p>
//                                 </div>
//                             )}

//                             <div className="flex justify-between font-semibold pt-2">
//                                 <p>Total</p>
//                                 <p>{currency}{order.amount}</p>
//                             </div>
//                         </div>

//                         {/* TIMER */}
//                         <div className="flex justify-between items-center mt-5">

//                             {/* <p className="font-semibold text-green-600 tabular-nums">
//                             {order.status === "Delivered"
//                                 ? getDeliveryTimeText(order)
//                                 : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                         </p> */}
//                             {order.status !== "Cancelled" && (
//                                 <p className="font-semibold text-green-600 tabular-nums">
//                                     {order.status === "Delivered"
//                                         ? getDeliveryTimeText(order)
//                                         : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                                 </p>
//                             )}


//                             {/* CANCEL BUTTON */}
//                             {canCancel && (
//                                 <button
//                                     onClick={() => cancelOrder(order._id)}
//                                     className="text-red-500 text-sm font-medium hover:underline"
//                                 >
//                                     Cancel Order
//                                 </button>
//                             )}

//                         </div>

//                     </div>

//                 )
//             })}

//         </div>
//     )
// }

// export default MyOrders












































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const [tick, setTick] = useState(0)
//     const { currency, axios, user } = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/user')
//             if (data.success) setMyOrders(data.orders)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) return;
//         fetchMyOrders();
//         const interval = setInterval(fetchMyOrders, 5000)
//         return () => clearInterval(interval)
//     }, [user])

//     useEffect(() => {
//         const t = setInterval(() => setTick(p => p + 1), 1000)
//         return () => clearInterval(t)
//     }, [])

//     // CANCEL ORDER
//     const cancelOrder = async (orderId) => {
//         if (!confirm("Cancel this order?")) return

//         try {
//             const { data } = await axios.post('/api/order/cancel', { orderId })
//             if (data.success) {
//                 fetchMyOrders()
//             } else {
//                 alert(data.message)
//             }
//         } catch (error) {
//             alert(error.message)
//         }
//     }

//     const getStatusColor = (status) => {
//         if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//         if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//         if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//         if (status === "Delivered") return "bg-green-200 text-green-800"
//         if (status === "Cancelled") return "bg-red-200 text-red-700"
//         return "bg-gray-200"
//     }

//     const formatDateTime = (date) => {
//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//         })
//     }

//     // DELIVERY TIMER
//     const getDeliveryTimeText = (order) => {
//         const created = new Date(order.createdAt).getTime()
//         const now = new Date().getTime()

//         if (order.status === "Delivered") {
//             const deliveredAt = new Date(order.updatedAt).getTime()
//             const diff = deliveredAt - created
//             const mins = Math.floor(diff / 60000)
//             const secs = Math.floor((diff % 60000) / 1000)
//             return `Delivered in ${mins}m ${secs}s`
//         }

//         const total = 30 * 60 * 1000
//         const diff = total - (now - created)
//         if (diff <= 0) return "Arriving now"

//         const mins = Math.floor(diff / 60000)
//         const secs = Math.floor((diff % 60000) / 1000)
//         return `${mins}m ${secs}s`
//     }

//     // 🔥 CANCEL COUNTDOWN
//     const getCancelCountdown = (order)=>{
//         const created = new Date(order.createdAt).getTime()
//         const now = Date.now()
//         const diff = 2*60*1000 - (now - created)

//         if(diff <= 0) return null

//         const m = Math.floor(diff/60000)
//         const s = Math.floor((diff%60000)/1000)

//         return `${m}:${s.toString().padStart(2,'0')}`
//     }

//     return (
//         <div className='mt-16 pb-16'>
//             <div className='flex flex-col items-end w-max mb-8'>
//                 <p className='text-2xl font-medium uppercase'>My orders</p>
//                 <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//             </div>

//             {myOrders.map(order => {

//                 const created = new Date(order.createdAt).getTime()
//                 const now = Date.now()

//                 const canCancel =
//                     order.paymentType === "COD" &&
//                     order.status === "Order Placed" &&
//                     now - created <= 2 * 60 * 1000

//                 const cancelCountdown = getCancelCountdown(order)

//                 return (

//                     <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

//                         {/* HEADER */}
//                         <div className="mb-4">
//                             <div className="flex justify-between items-center">
//                                 <p className="text-gray-500 font-medium">
//                                     Order #{order._id.slice(-6)}
//                                 </p>

//                                 <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">
//                                     {order.paymentType}
//                                 </span>
//                             </div>

//                             <p className="mt-1 text-lg font-semibold text-green-400">
//                                 Total {currency}{order.amount}
//                             </p>
//                         </div>

//                         {/* STATUS */}
//                         <div className="flex justify-between items-center mb-4">
//                             <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
//                                 {order.status}
//                             </span>
//                             <p className="text-sm text-gray-500">
//                                 {formatDateTime(order.createdAt)}
//                             </p>
//                         </div>

//                         {/* ITEMS */}
//                         <div className="space-y-3">
//                             {order.items.map((item, i) => (
//                                 <div key={i} className="flex items-center gap-3">
//                                     <div className="bg-primary/10 p-2 rounded-lg">
//                                         <img src={item.product.image[0]} className="w-12 h-12" />
//                                     </div>

//                                     <div className="flex-1 flex justify-between items-center">
//                                         <p className="font-medium text-sm">
//                                             {item.product.name} × {item.quantity}
//                                         </p>

//                                         <p className="font-semibold text-gray-700">
//                                             {currency}{item.price * item.quantity}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* CHARGES */}
//                         <div className="mt-5 border-t pt-4 space-y-1 text-sm">

//                             <div className="flex justify-between">
//                                 <p>Subtotal</p>
//                                 <p>{currency}{order.subtotal || order.amount}</p>
//                             </div>

//                             {order.deliveryCharge > 0 && (
//                                 <div className="flex justify-between">
//                                     <p>Delivery</p>
//                                     <p>{currency}{order.deliveryCharge}</p>
//                                 </div>
//                             )}

//                             {order.discount > 0 && (
//                                 <div className="flex justify-between text-green-600">
//                                     <p>Discount</p>
//                                     <p>-{currency}{order.discount}</p>
//                                 </div>
//                             )}

//                             <div className="flex justify-between font-semibold pt-2">
//                                 <p>Total</p>
//                                 <p>{currency}{order.amount}</p>
//                             </div>
//                         </div>

//                         {/* TIMER + CANCEL */}
//                         <div className="flex justify-between items-center mt-5">

//                             {/* CANCEL COUNTDOWN */}
//                             {order.status === "Order Placed" && cancelCountdown && (
//                                 <p className="text-orange-500 text-sm font-semibold">
//                                     Cancel within {cancelCountdown}
//                                 </p>
//                             )}

//                             {/* DELIVERY TIMER */}
//                             {order.status !== "Cancelled" && order.status !== "Order Placed" && (
//                                 <p className="font-semibold text-green-600 tabular-nums">
//                                     {order.status === "Delivered"
//                                         ? getDeliveryTimeText(order)
//                                         : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
//                                 </p>
//                             )}

//                             {/* CANCEL BUTTON */}
//                             {canCancel && (
//                                 <button
//                                     onClick={() => cancelOrder(order._id)}
//                                     className="text-red-500 text-sm font-medium hover:underline"
//                                 >
//                                     Cancel Order
//                                 </button>
//                             )}

//                         </div>

//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default MyOrders




































import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const CANCEL_WINDOW = 2 * 60 * 1000 // 2 minutes

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    const [tick, setTick] = useState(0)
    const { currency, axios, user } = useAppContext()

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user')
            if (data.success) setMyOrders(data.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchMyOrders();
        const interval = setInterval(fetchMyOrders, 5000)
        return () => clearInterval(interval)
    }, [user])

    // ⏱️ 1 sec tick for instant UI update
    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 1000)
        return () => clearInterval(t)
    }, [])

    // 🧠 FRONTEND EFFECTIVE STATUS
    const getEffectiveStatus = (order) => {
        if (order.status === "Order Placed") {
            const created = new Date(order.createdAt).getTime()
            if (Date.now() - created >= CANCEL_WINDOW) {
                return "Packed"
            }
        }
        return order.status
    }

    // CANCEL ORDER
    const cancelOrder = async (orderId) => {
        if (!confirm("Cancel this order?")) return

        try {
            const { data } = await axios.post('/api/order/cancel', { orderId })
            if (data.success) {
                fetchMyOrders()
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getStatusColor = (status) => {
        if (status === "Order Placed") return "bg-gray-200 text-gray-700"
        if (status === "Packed") return "bg-yellow-200 text-yellow-800"
        if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
        if (status === "Delivered") return "bg-green-200 text-green-800"
        if (status === "Cancelled") return "bg-red-200 text-red-700"
        return "bg-gray-200"
    }

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    // DELIVERY TIMER
    const getDeliveryTimeText = (order) => {
        const created = new Date(order.createdAt).getTime()
        const now = Date.now()

        if (order.status === "Delivered") {
            const deliveredAt = new Date(order.updatedAt).getTime()
            const diff = deliveredAt - created
            const mins = Math.floor(diff / 60000)
            const secs = Math.floor((diff % 60000) / 1000)
            return `Delivered in ${mins}m ${secs}s`
        }

        const total = 30 * 60 * 1000
        const diff = total - (now - created)
        if (diff <= 0) return "Arriving now"

        const mins = Math.floor(diff / 60000)
        const secs = Math.floor((diff % 60000) / 1000)
        return `${mins}m ${secs}s`
    }

    // 🔥 CANCEL COUNTDOWN
    const getCancelCountdown = (order) => {
        const created = new Date(order.createdAt).getTime()
        const diff = CANCEL_WINDOW - (Date.now() - created)

        if (diff <= 0) return null

        const m = Math.floor(diff / 60000)
        const s = Math.floor((diff % 60000) / 1000)

        return `${m}:${s.toString().padStart(2, '0')}`
    }

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {myOrders.map(order => {

                const created = new Date(order.createdAt).getTime()
                const now = Date.now()

                const effectiveStatus = getEffectiveStatus(order)

                const canCancel =
                    effectiveStatus === "Order Placed" &&
                    now - created <= CANCEL_WINDOW

                const cancelCountdown = getCancelCountdown(order)

                return (

                    <div key={order._id} className='border rounded-lg mb-8 p-5 max-w-4xl'>

                        {/* HEADER */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 font-medium">
                                    Order #{order._id.slice(-6)}
                                </p>

                                <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">
                                    {order.paymentType}
                                </span>
                            </div>

                            <p className="mt-1 text-lg font-semibold text-green-400">
                                Total {currency}{order.amount}
                            </p>
                        </div>

                        {/* STATUS */}
                        <div className="flex justify-between items-center mb-4">
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(effectiveStatus)}`}>
                                {effectiveStatus}
                            </span>
                            <p className="text-sm text-gray-500">
                                {formatDateTime(order.createdAt)}
                            </p>
                        </div>

                        {/* ITEMS */}
                        <div className="space-y-3">
                            {(order.items || []).map((item, i) => {

                                const product = item.product

                                return (
                                    <div key={i} className="flex items-center gap-3">

                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <img
                                                src={product?.image?.[0] || "/placeholder.png"}
                                                className="w-12 h-12"
                                            />
                                        </div>

                                        <div className="flex-1 flex justify-between items-center">
                                            <p className="font-medium text-sm">
                                                {product?.name || "Deleted Product"} × {item.quantity}
                                            </p>

                                            <p className="font-semibold text-gray-700">
                                                {currency}{item.price * item.quantity}
                                            </p>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                        {/* CHARGES */}
                        <div className="mt-5 border-t pt-4 space-y-1 text-sm">

                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{currency}{order.subtotal || order.amount}</p>
                            </div>

                            {order.deliveryCharge > 0 && (
                                <div className="flex justify-between">
                                    <p>Delivery</p>
                                    <p>{currency}{order.deliveryCharge}</p>
                                </div>
                            )}

                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <p>Discount</p>
                                    <p>-{currency}{order.discount}</p>
                                </div>
                            )}

                            <div className="flex justify-between font-semibold pt-2">
                                <p>Total</p>
                                <p>{currency}{order.amount}</p>
                            </div>
                        </div>

                        {/* TIMER + CANCEL */}
                        <div className="flex justify-between items-center mt-5">

                            {/* CANCEL COUNTDOWN */}
                            {effectiveStatus === "Order Placed" && cancelCountdown && (
                                <p className="text-orange-500 text-sm font-semibold">
                                    Cancel within {cancelCountdown}
                                </p>
                            )}

                            {/* DELIVERY TIMER */}
                            {effectiveStatus !== "Cancelled" && effectiveStatus !== "Order Placed" && (
                                <p className="font-semibold text-green-600 tabular-nums">
                                    {effectiveStatus === "Delivered"
                                        ? getDeliveryTimeText(order)
                                        : `Arriving in ${getDeliveryTimeText(order)} ⚡`}
                                </p>
                            )}



                            {/* Refund Progress */}
                            {(order.paymentStatus === "Refund Initiated" ||
                                order.paymentStatus === "Refunded") && (

                                    <div className="mt-4 w-full md:w-1/2 mx-auto pb-6">

                                        <div className="relative">

                                            {/* Base Line (Slim) */}
                                            <div className="h-[3px] bg-gray-300 rounded-full"></div>

                                            {/* Progress Line */}
                                            <div
                                                className={`h-[3px] bg-green-500 rounded-full absolute top-0 left-0 transition-all duration-500
        ${order.paymentStatus === "Refund Initiated"
                                                        ? "w-1/2"   // Half
                                                        : "w-full"  // Full
                                                    }`}
                                            ></div>

                                            {/* Circles */}
                                            <div className="absolute -top-[8px] left-0 w-full flex justify-between">

                                                {/* Step 1 */}
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]
            ${order.paymentStatus === "Refund Initiated" ||
                                                                order.paymentStatus === "Refunded"
                                                                ? "bg-green-500"
                                                                : "bg-gray-400"
                                                            }`}
                                                    >
                                                        {(order.paymentStatus === "Refund Initiated" ||
                                                            order.paymentStatus === "Refunded") && "✓"}
                                                    </div>
                                                    <span className="text-[10px] mt-2 text-gray-600">
                                                        Initiated
                                                    </span>
                                                </div>

                                                {/* Step 2 */}
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]
            ${order.paymentStatus === "Refunded"
                                                                ? "bg-green-600"
                                                                : "bg-gray-400"
                                                            }`}
                                                    >
                                                        {order.paymentStatus === "Refunded" && "✓"}
                                                    </div>
                                                    <span className="text-[10px] mt-2 text-gray-600">
                                                        Refunded
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )}









                            {/* CANCEL BUTTON */}
                            {canCancel && (
                                <button
                                    onClick={() => cancelOrder(order._id)}
                                    className="text-red-500 text-sm font-medium hover:underline"
                                >
                                    Cancel Order
                                </button>
                            )}

                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default MyOrders
