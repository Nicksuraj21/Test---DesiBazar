// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets, dummyOrders } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {
//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if(data.success){
//                 setOrders(data.orders)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };


//     useEffect(()=>{
//         fetchOrders();
//     },[])


//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//     <div className="md:p-10 p-4 space-y-4">
//             <h2 className="text-lg font-medium">Orders List</h2>
//             {orders.map((order, index) => (
//                 <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//                     <div className="flex gap-5 max-w-80">
//                         <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
//                         <div>
//                             {order.items.map((item, index) => (
//                                 <div key={index} className="flex flex-col">
//                                     <p className="font-medium">
//                                         {item.product.name}{" "} 
//                                         <span className="text-primary">x {item.quantity}</span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="text-sm md:text-base text-black/60">
//                         <p className='text-black/80'>
//                         {order.address.firstName} {order.address.lastName}</p>

//                         <p>{order.address.street}, {order.address.city}</p>
//                         <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
//                         <p></p>
//                         <p>{order.address.phone}</p>
//                     </div>

//                     <p className="font-medium text-lg my-auto">
//                     {currency}{order.amount}</p>

//                     <div className="flex flex-col text-sm md:text-base text-black/60">
//                         <p>Method: {order.paymentType}</p>
//                         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                         <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </div>
//   )
// }

// export default Orders









// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         const { data } = await axios.get('/api/order/seller');
//         if(data.success){
//             setOrders(data.orders)
//         }
//     };

//     useEffect(()=>{
//         fetchOrders();
//     },[])

//     const changeStatus = async (orderId, status)=>{
//         const { data } = await axios.post('/api/order/status',{
//             orderId,
//             status
//         })

//         if(data.success){
//             toast.success("Status Updated")
//             fetchOrders()
//         }
//     }

//   return (
//     <div className='p-10'>
//         <h2 className='text-xl font-bold mb-5'>Orders</h2>

//         {orders.map((order)=>(
//             <div key={order._id} className='border p-5 mb-5 rounded flex justify-between'>

//                 <div>
//                     {order.items.map((item, i)=>(
//                         <p key={i}>{item.product.name} x {item.quantity}</p>
//                     ))}
//                 </div>

//                 <div>
//                     <p>{currency}{order.amount}</p>
//                     <p>{order.paymentType}</p>

//                     <select
//                         value={order.status}
//                         onChange={(e)=> changeStatus(order._id, e.target.value)}
//                         className='border p-2 mt-2'
//                     >
//                         <option>Pending</option>
//                         <option>Packed</option>
//                         <option>Shipped</option>
//                         <option>Out for delivery</option>
//                         <option>Delivered</option>
//                     </select>

//                 </div>

//             </div>
//         ))}
//     </div>
//   )
// }

// export default Orders

















// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {
//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if(data.success){
//                 setOrders(data.orders)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(()=>{
//         fetchOrders();
//     },[])

//     // ⭐ STATUS CHANGE
//     const changeStatus = async (orderId, status)=>{
//         try {
//             const { data } = await axios.post('/api/order/status',{
//                 orderId,
//                 status
//             })

//             if(data.success){
//                 toast.success("Status updated")
//                 fetchOrders()
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//     <div className="md:p-10 p-4 space-y-4">
//             <h2 className="text-lg font-medium">Orders List</h2>

//             {orders.map((order) => (
//                 <div key={order._id} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//                     {/* LEFT */}
//                     <div className="flex gap-5 max-w-80">
//                         <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
//                         <div>
//                             {order.items.map((item, index) => (
//                                 <div key={index} className="flex flex-col">
//                                     <p className="font-medium">
//                                         {item.product.name}
//                                         <span className="text-primary"> x {item.quantity}</span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* ADDRESS */}
//                     <div className="text-sm md:text-base text-black/60">
//                         <p className='text-black/80'>
//                         {order.address.firstName} {order.address.lastName}</p>

//                         <p>{order.address.street}, {order.address.city}</p>
//                         <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
//                         <p>{order.address.phone}</p>
//                     </div>

//                     {/* AMOUNT */}
//                     <p className="font-medium text-lg my-auto">
//                     {currency}{order.amount}</p>

//                     {/* RIGHT INFO */}
//                     <div className="flex flex-col text-sm md:text-base text-black/60">
//                         <p>Method: {order.paymentType}</p>
//                         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                         <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>

//                         {/* ⭐ STATUS DROPDOWN UI SAME STYLE */}
//                         <select
//                           value={order.status}
//                           onChange={(e)=> changeStatus(order._id, e.target.value)}
//                           className="border mt-2 px-2 py-1 rounded text-black"
//                         >
//                           <option>Pending</option>
//                           <option>Packed</option>
//                           <option>Shipped</option>
//                           <option>Out for delivery</option>
//                           <option>Delivered</option>
//                         </select>
//                     </div>

//                 </div>
//             ))}
//         </div>
//         </div>
//   )
// }

// export default Orders






















// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {
//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if(data.success){
//                 setOrders(data.orders)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(()=>{
//         fetchOrders();
//     },[])

//     const changeStatus = async (orderId, status)=>{
//         try {
//             const { data } = await axios.post('/api/order/status',{
//                 orderId,
//                 status
//             })

//             if(data.success){
//                 toast.success("Status updated")
//                 fetchOrders()
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // ⭐ TIME FORMAT
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
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//     <div className="md:p-10 p-4 space-y-4">
//             <h2 className="text-lg font-medium">Orders List</h2>

//             {orders.map((order) => (
//                 <div key={order._id} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//                     <div className="flex gap-5 max-w-80">
//                         <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
//                         <div>
//                             {order.items.map((item, index) => (
//                                 <div key={index} className="flex flex-col">
//                                     <p className="font-medium">
//                                         {item.product.name}
//                                         <span className="text-primary"> x {item.quantity}</span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="text-sm md:text-base text-black/60">
//                         <p className='text-black/80'>
//                         {order.address.firstName} {order.address.lastName}</p>

//                         <p>{order.address.street}, {order.address.city}</p>
//                         <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
//                         <p>{order.address.phone}</p>
//                     </div>

//                     <p className="font-medium text-lg my-auto">
//                     {currency}{order.amount}</p>

//                     <div className="flex flex-col text-sm md:text-base text-black/60">
//                         <p>Method: {order.paymentType}</p>

//                         {/* ⭐ TIME */}
//                         <p>Date: {formatDateTime(order.createdAt)}</p>

//                         <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>

//                         <select
//                           value={order.status}
//                           onChange={(e)=> changeStatus(order._id, e.target.value)}
//                           className="border mt-2 px-2 py-1 rounded text-black"
//                         >
//                           <option>Order Placed</option>
//                           <option>Packed</option>
//                           <option>Shipped</option>
//                           <option>Out for delivery</option>
//                           <option>Delivered</option>
//                         </select>
//                     </div>

//                 </div>
//             ))}
//         </div>
//         </div>
//   )
// }

// export default Orders


































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if(data.success){
//                 setOrders(data.orders)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(()=>{
//         fetchOrders();
//     },[])

//     const changeStatus = async (orderId, status)=>{
//         try {
//             const { data } = await axios.post('/api/order/status',{
//                 orderId,
//                 status
//             })

//             if(data.success){
//                 toast.success("Status updated")
//                 fetchOrders()
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // TIME FORMAT
//     const formatDateTime = (date)=>{
//         return new Date(date).toLocaleString("en-IN", {
//             day:"2-digit",
//             month:"short",
//             hour:"2-digit",
//             minute:"2-digit"
//         });
//     }

//     // STATUS COLOR
//     const getStatusColor = (status)=>{
//         if(status === "Order Placed") return "bg-gray-200 text-gray-700";
//         if(status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if(status === "Out for delivery") return "bg-blue-200 text-blue-800";
//         if(status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//       <div className="md:p-10 p-4 space-y-4">
//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div key={order._id} className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//             {/* LEFT */}
//             <div className="flex gap-4">
//               <img className="w-12 h-12" src={assets.box_icon} />

//               <div>
//                 {order.items.map((item, index) => (
//                   <p key={index} className="font-medium">
//                     {item.product.name}
//                     <span className="text-primary"> x {item.quantity}</span>
//                   </p>
//                 ))}
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             {/* AMOUNT */}
//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             {/* STATUS PANEL */}
//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e)=> changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders










































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//     const {currency, axios} = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () =>{
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if(data.success){
//                 setOrders(data.orders)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(()=>{
//         fetchOrders();
//     },[])

//     const changeStatus = async (orderId, status)=>{
//         try {
//             const { data } = await axios.post('/api/order/status',{
//                 orderId,
//                 status
//             })

//             if(data.success){
//                 toast.success("Status updated")
//                 fetchOrders()
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const formatDateTime = (date)=>{
//         return new Date(date).toLocaleString("en-IN", {
//             day:"2-digit",
//             month:"short",
//             hour:"2-digit",
//             minute:"2-digit"
//         });
//     }

//     const getStatusColor = (status)=>{
//         if(status === "Order Placed") return "bg-gray-200 text-gray-700";
//         if(status === "Packed") return "bg-yellow-200 text-yellow-800";
//         if(status === "Out for delivery") return "bg-blue-200 text-blue-800";
//         if(status === "Delivered") return "bg-green-200 text-green-800";
//         return "bg-gray-200";
//     }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//       <div className="md:p-10 p-4 space-y-4">
//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div key={order._id} className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//             {/* LEFT SIDE */}
//             <div className="flex flex-col gap-2">

//               {/* ORDER ID */}
//               <p className="text-xs text-gray-500 font-medium">
//                 Order ID: #{order._id.slice(-6)}
//               </p>

//               <div className="flex gap-4">
//                 <img className="w-12 h-12" src={assets.box_icon} />

//                 <div>
//                   {order.items.map((item, index) => (
//                     <p key={index} className="font-medium">
//                       {item.product.name}
//                       <span className="text-primary"> x {item.quantity}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             {/* AMOUNT */}
//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             {/* STATUS PANEL */}
//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e)=> changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders






























// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//   const { currency, axios } = useAppContext()
//   const [orders, setOrders] = useState([])

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get('/api/order/seller')
//       if (data.success) {
//         setOrders(data.orders)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   // useEffect(() => {
//   //   fetchOrders()
//   // }, [])
//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(() => {
//       fetchOrders();
//     }, 4000); // auto refresh every 4 sec
//     return () => clearInterval(interval);
//   }, []);


//   const changeStatus = async (orderId, status) => {
//     try {
//       const { data } = await axios.post('/api/order/status', {
//         orderId,
//         status
//       })

//       if (data.success) {
//         toast.success("Status updated")
//         fetchOrders()
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit"
//     })
//   }

//   const getStatusColor = (status) => {
//     if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//     if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//     if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//     if (status === "Delivered") return "bg-green-200 text-green-800"
//     return "bg-gray-200"
//   }

//   // 📍 GOOGLE MAP OPEN
//   const openMap = (location) => {
//     if (!location?.lat || !location?.lng) {
//       toast.error("Location not available")
//       return
//     }

//     const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
//     window.open(url, "_blank")
//   }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//       <div className="md:p-10 p-4 space-y-4">
//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
//           >

//             {/* LEFT */}
//             <div className="flex flex-col gap-2">
//               <p className="text-xs text-gray-500 font-medium">
//                 Order ID: #{order._id.slice(-6)}
//               </p>

//               <div className="flex gap-4">
//                 <img className="w-12 h-12" src={assets.box_icon} />

//                 <div>
//                   {order.items.map((item, index) => (
//                     <p key={index} className="font-medium">
//                       {item.product.name}
//                       <span className="text-primary"> x {item.quantity}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             {/* AMOUNT */}
//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             {/* STATUS + TRACK */}
//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e) => changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//               {/* 📍 TRACK ON MAP */}
//               {order.location?.lat && order.location?.lng && (
//                 <button
//                   onClick={() => openMap(order.location)}
//                   className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   📍 Track on Map
//                 </button>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders












































// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//   const { currency, axios } = useAppContext()
//   const [orders, setOrders] = useState([])

//   // ===== DASHBOARD STATE =====
//   const [stats, setStats] = useState({
//     todayEarning: 0,
//     totalOrders: 0,
//     pending: 0,
//     delivered: 0,
//     cod: 0,
//     paid: 0
//   })

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get('/api/order/seller')
//       if (data.success) {
//         const allOrders = data.orders
//         setOrders(allOrders)

//         // ===== DASHBOARD CALCULATION =====
//         const today = new Date().toDateString()

//         let todayEarning = 0
//         let pending = 0
//         let delivered = 0
//         let cod = 0
//         let paid = 0

//         allOrders.forEach(o => {
//           if (new Date(o.createdAt).toDateString() === today && o.status === "Delivered") {
//             todayEarning += o.amount
//           }

//           if (o.status !== "Delivered") pending++
//           if (o.status === "Delivered") delivered++
//           if (o.isPaid) paid++
//           else cod++
//         })

//         setStats({
//           todayEarning,
//           totalOrders: allOrders.length,
//           pending,
//           delivered,
//           cod,
//           paid
//         })
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(() => {
//       fetchOrders();
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const changeStatus = async (orderId, status) => {
//     try {
//       const { data } = await axios.post('/api/order/status', {
//         orderId,
//         status
//       })

//       if (data.success) {
//         toast.success("Status updated")
//         fetchOrders()
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit"
//     })
//   }

//   const getStatusColor = (status) => {
//     if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//     if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//     if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//     if (status === "Delivered") return "bg-green-200 text-green-800"
//     return "bg-gray-200"
//   }

//   const openMap = (location) => {
//     if (!location?.lat || !location?.lng) {
//       toast.error("Location not available")
//       return
//     }

//     const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
//     window.open(url, "_blank")
//   }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//       <div className="md:p-10 p-4 space-y-4">

//         {/* ===== DASHBOARD ===== */}
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-3">

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Today Earning</p>
//             <p className="text-lg font-bold text-green-600">
//               {currency}{stats.todayEarning}
//             </p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Total Orders</p>
//             <p className="text-lg font-bold">{stats.totalOrders}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Cancelled</p>
//             <p className="text-lg font-bold text-orange-500">{stats.pending}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Delivered</p>
//             <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Paid</p>
//             <p className="text-lg font-bold">{stats.paid}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">COD</p>
//             <p className="text-lg font-bold">{stats.cod}</p>
//           </div>

//         </div>

//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
//           >

//             <div className="flex flex-col gap-2">
//               <p className="text-xs text-gray-500 font-medium">
//                 Order ID: #{order._id.slice(-6)}
//               </p>

//               <div className="flex gap-4">
//                 <img className="w-12 h-12" src={assets.box_icon} />

//                 <div>
//                   {order.items.map((item, index) => (
//                     <p key={index} className="font-medium">
//                       {item.product.name}
//                       <span className="text-primary"> x {item.quantity}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e) => changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//               {order.location?.lat && order.location?.lng && (
//                 <button
//                   onClick={() => openMap(order.location)}
//                   className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   📍 Track on Map
//                 </button>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders


























































// import React, { useEffect, useRef, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//   const { currency, axios } = useAppContext()

//   const [orders, setOrders] = useState([])
//   const [lastCount, setLastCount] = useState(0)

//   const audioRef = useRef(null)

//   const [stats, setStats] = useState({
//     todayEarning: 0,
//     totalOrders: 0,
//     pending: 0,
//     delivered: 0
//   })

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get('/api/order/seller')

//       if (data.success) {
//         const allOrders = data.orders

//         // 🔔 NEW ORDER DETECT
//         if (lastCount && allOrders.length > lastCount) {
//           audioRef.current?.play()
//           toast.success("🛒 New order received")
//         }

//         setLastCount(allOrders.length)
//         setOrders(allOrders)

//         // ===== STATS =====
//         const today = new Date().toDateString()

//         let todayEarning = 0
//         let pending = 0
//         let delivered = 0

//         allOrders.forEach(o => {
//           if (new Date(o.createdAt).toDateString() === today && o.status === "Delivered") {
//             todayEarning += o.amount
//           }

//           if (o.status === "Delivered") delivered++
//           else pending++
//         })

//         setStats({
//           todayEarning,
//           totalOrders: allOrders.length,
//           pending,
//           delivered
//         })
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchOrders()
//     const interval = setInterval(fetchOrders, 4000)
//     return () => clearInterval(interval)
//   }, [])

//   const changeStatus = async (orderId, status) => {
//     try {
//       const { data } = await axios.post('/api/order/status', {
//         orderId,
//         status
//       })

//       if (data.success) {
//         toast.success("Status updated")
//         fetchOrders()
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit"
//     })
//   }

//   const getStatusColor = (status) => {
//     if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//     if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//     if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//     if (status === "Delivered") return "bg-green-200 text-green-800"
//     return "bg-gray-200"
//   }

//   const openMap = (location) => {
//     if (!location?.lat || !location?.lng) {
//       toast.error("Location not available")
//       return
//     }

//     const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
//     window.open(url, "_blank")
//   }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>

//       {/* 🔔 SOUND */}
//       <audio ref={audioRef} src="/new-order.mp3" preload="auto" />

//       <div className="md:p-10 p-4 space-y-4">

//         {/* ===== DASHBOARD ===== */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Today Earning</p>
//             <p className="text-lg font-bold text-green-600">
//               {currency}{stats.todayEarning}
//             </p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Total Orders</p>
//             <p className="text-lg font-bold">{stats.totalOrders}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Pending</p>
//             <p className="text-lg font-bold text-orange-500">{stats.pending}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Delivered</p>
//             <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
//           </div>

//         </div>

//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
//           >

//             <div className="flex flex-col gap-2">
//               <p className="text-xs text-gray-500 font-medium">
//                 Order ID: #{order._id.slice(-6)}
//               </p>

//               <div className="flex gap-4">
//                 <img className="w-12 h-12" src={assets.box_icon} />

//                 <div>
//                   {order.items.map((item, index) => (
//                     <p key={index} className="font-medium">
//                       {item.product.name}
//                       <span className="text-primary"> x {item.quantity}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e) => changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//               {order.location?.lat && order.location?.lng && (
//                 <button
//                   onClick={() => openMap(order.location)}
//                   className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   📍 Track on Map
//                 </button>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders






































// import React, { useEffect, useRef, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {

//   const { currency, axios } = useAppContext()

//   const [orders, setOrders] = useState([])
//   const [lastCount, setLastCount] = useState(0)

//   const [filter, setFilter] = useState("today")   // 🔥 FILTER STATE

//   const audioRef = useRef(null)

//   const [stats, setStats] = useState({
//     todayEarning: 0,
//     totalOrders: 0,
//     pending: 0,
//     delivered: 0
//   })

//   const calculateStats = (allOrders, type) => {

//     const today = new Date()
//     const yesterday = new Date()
//     yesterday.setDate(today.getDate() - 1)

//     let earning = 0
//     let pending = 0
//     let delivered = 0
//     let total = 0

//     allOrders.forEach(o => {
//       const orderDate = new Date(o.createdAt)

//       let match = false

//       if (type === "today") {
//         match = orderDate.toDateString() === today.toDateString()
//       }
//       else if (type === "yesterday") {
//         match = orderDate.toDateString() === yesterday.toDateString()
//       }
//       else if (type === "lifetime") {
//         match = true
//       }

//       if (!match) return

//       total++

//       if (o.status === "Delivered") {
//         delivered++
//         earning += o.amount
//       } else {
//         pending++
//       }
//     })

//     setStats({
//       todayEarning: earning,
//       totalOrders: total,
//       pending,
//       delivered
//     })
//   }

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get('/api/order/seller')

//       if (data.success) {
//         const allOrders = data.orders

//         // 🔔 NEW ORDER DETECT
//         if (lastCount && allOrders.length > lastCount) {
//           audioRef.current?.play().catch(()=>{})
//           toast.success("🛒 New order received")
//         }

//         setLastCount(allOrders.length)
//         setOrders(allOrders)

//         calculateStats(allOrders, filter)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchOrders()
//     const interval = setInterval(fetchOrders, 4000)
//     return () => clearInterval(interval)
//   }, [])

//   // 🔥 RE-CALCULATE WHEN FILTER CHANGE
//   useEffect(() => {
//     calculateStats(orders, filter)
//   }, [filter])

//   const changeStatus = async (orderId, status) => {
//     try {
//       const { data } = await axios.post('/api/order/status', {
//         orderId,
//         status
//       })

//       if (data.success) {
//         toast.success("Status updated")
//         fetchOrders()
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const formatDateTime = (date) => {
//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit"
//     })
//   }

//   const getStatusColor = (status) => {
//     if (status === "Order Placed") return "bg-gray-200 text-gray-700"
//     if (status === "Packed") return "bg-yellow-200 text-yellow-800"
//     if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
//     if (status === "Delivered") return "bg-green-200 text-green-800"
//     return "bg-gray-200"
//   }

//   const openMap = (location) => {
//     if (!location?.lat || !location?.lng) {
//       toast.error("Location not available")
//       return
//     }

//     const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
//     window.open(url, "_blank")
//   }

//   return (
//     <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>

//       <audio ref={audioRef} src="/new-order.mp3" preload="auto" />

//       <div className="md:p-10 p-4 space-y-4">

//         {/* 🔥 FILTER BUTTONS */}
//         <div className="flex gap-2">
//           <button
//             onClick={()=>setFilter("today")}
//             className={`px-4 py-1 rounded ${filter==="today" ? "bg-primary text-white":"bg-gray-200"}`}>
//             Today
//           </button>

//           <button
//             onClick={()=>setFilter("yesterday")}
//             className={`px-4 py-1 rounded ${filter==="yesterday" ? "bg-primary text-white":"bg-gray-200"}`}>
//             Yesterday
//           </button>

//           <button
//             onClick={()=>setFilter("lifetime")}
//             className={`px-4 py-1 rounded ${filter==="lifetime" ? "bg-primary text-white":"bg-gray-200"}`}>
//             Lifetime
//           </button>
//         </div>

//         {/* ===== DASHBOARD ===== */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Earning</p>
//             <p className="text-lg font-bold text-green-600">
//               {currency}{stats.todayEarning}
//             </p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Total Orders</p>
//             <p className="text-lg font-bold">{stats.totalOrders}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Pending</p>
//             <p className="text-lg font-bold text-orange-500">{stats.pending}</p>
//           </div>

//           <div className="bg-white shadow p-4 rounded">
//             <p className="text-xs text-gray-500">Delivered</p>
//             <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
//           </div>

//         </div>

//         <h2 className="text-lg font-medium">Orders List</h2>

//         {orders.map((order) => (
//           <div key={order._id}
//             className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

//             <div className="flex flex-col gap-2">
//               <p className="text-xs text-gray-500 font-medium">
//                 Order ID: #{order._id.slice(-6)}
//               </p>

//               <div className="flex gap-4">
//                 <img className="w-12 h-12" src={assets.box_icon} />

//                 <div>
//                   {order.items.map((item, index) => (
//                     <p key={index} className="font-medium">
//                       {item.product.name}
//                       <span className="text-primary"> x {item.quantity}</span>
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="text-sm text-black/70">
//               <p className='font-medium'>
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <p>{order.address.street}</p>
//               <p>{order.address.city}</p>
//               <p>{order.address.phone}</p>
//             </div>

//             <div className="text-center">
//               <p className="font-medium text-lg">
//                 {currency}{order.amount}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {formatDateTime(order.createdAt)}
//               </p>
//             </div>

//             <div className="flex flex-col items-end gap-2">

//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//                 {order.status}
//               </span>

//               <select
//                 value={order.status}
//                 onChange={(e) => changeStatus(order._id, e.target.value)}
//                 className="border px-2 py-1 rounded text-sm"
//               >
//                 <option>Order Placed</option>
//                 <option>Packed</option>
//                 <option>Out for delivery</option>
//                 <option>Delivered</option>
//               </select>

//               <p className="text-xs text-gray-500">
//                 {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
//               </p>

//               {order.location?.lat && order.location?.lng && (
//                 <button
//                   onClick={() => openMap(order.location)}
//                   className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
//                   📍 Track on Map
//                 </button>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders

































import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {

  const { currency, axios } = useAppContext()

  const [orders, setOrders] = useState([])
  const [lastCount, setLastCount] = useState(0)

  const [filter, setFilter] = useState("today")

  const audioRef = useRef(null)

  const [stats, setStats] = useState({
    todayEarning: 0,
    totalOrders: 0,
    pending: 0,
    delivered: 0,
    canceled: 0
  })

  // =========================
  // CALCULATE DASHBOARD STATS
  // =========================
  const calculateStats = (allOrders, type) => {

    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    let earning = 0
    let pending = 0
    let delivered = 0
    let canceled = 0
    let total = 0

    allOrders.forEach(o => {
      const orderDate = new Date(o.createdAt)

      let match = false

      if (type === "today") {
        match = orderDate.toDateString() === today.toDateString()
      }
      else if (type === "yesterday") {
        match = orderDate.toDateString() === yesterday.toDateString()
      }
      else if (type === "lifetime") {
        match = true
      }

      if (!match) return

      total++

      if (o.status === "Delivered") {
        delivered++
        earning += o.amount
      }
      else if (o.status === "Cancelled" || o.status === "Canceled") {
        canceled++
      }
      else {
        pending++
      }
    })

    setStats({
      todayEarning: earning,
      totalOrders: total,
      pending,
      delivered,
      canceled
    })
  }

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller')

      if (data.success) {
        const allOrders = data.orders

        // 🔔 NEW ORDER SOUND
        if (lastCount && allOrders.length > lastCount) {
          audioRef.current?.play().catch(() => { })
          toast.success("🛒 New order received")
        }

        setLastCount(allOrders.length)
        setOrders(allOrders)

        calculateStats(allOrders, filter)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    calculateStats(orders, filter)
  }, [filter, orders])


  // =========================
  // STATUS CHANGE
  // =========================
  const changeStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post('/api/order/status', {
        orderId,
        status
      })

      if (data.success) {
        toast.success("Status updated")
        fetchOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusColor = (status) => {
    if (status === "Order Placed") return "bg-gray-200 text-gray-700"
    if (status === "Packed") return "bg-yellow-200 text-yellow-800"
    if (status === "Out for delivery") return "bg-blue-200 text-blue-800"
    if (status === "Delivered") return "bg-green-200 text-green-800"
    if (status === "Cancelled" || status === "Canceled") return "bg-red-200 text-red-700"
    return "bg-gray-200"
  }

  const openMap = (location) => {
    if (!location?.lat || !location?.lng) {
      toast.error("Location not available")
      return
    }

    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
    window.open(url, "_blank")
  }

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>

      <audio ref={audioRef} src="/new-order.mp3" preload="auto" />

      <div className="md:p-10 p-4 space-y-4">

        {/* FILTER */}
        <div className="flex gap-2">
          <button onClick={() => setFilter("today")}
            className={`px-4 py-1 rounded ${filter === "today" ? "bg-primary text-white" : "bg-gray-200"}`}>
            Today
          </button>

          <button onClick={() => setFilter("yesterday")}
            className={`px-4 py-1 rounded ${filter === "yesterday" ? "bg-primary text-white" : "bg-gray-200"}`}>
            Yesterday
          </button>

          <button onClick={() => setFilter("lifetime")}
            className={`px-4 py-1 rounded ${filter === "lifetime" ? "bg-primary text-white" : "bg-gray-200"}`}>
            Lifetime
          </button>
        </div>

        {/* DASHBOARD */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

          <div className="bg-white shadow p-4 rounded">
            <p className="text-xs text-gray-500">Earning</p>
            <p className="text-lg font-bold text-green-600">
              {currency}{stats.todayEarning}
            </p>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <p className="text-xs text-gray-500">Total Orders</p>
            <p className="text-lg font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-lg font-bold text-orange-500">{stats.pending}</p>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <p className="text-xs text-gray-500">Delivered</p>
            <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <p className="text-xs text-gray-500">Canceled</p>
            <p className="text-lg font-bold text-red-600">{stats.canceled}</p>
          </div>

        </div>

        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order) => (
          <div key={order._id}
            className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-500 font-medium">
                Order ID: #{order._id.slice(-6)}
              </p>

              <div className="flex gap-4">
                <img className="w-12 h-12" src={assets.box_icon} />

                <div>
                  {(order.items || []).map((item, index) => (
                    <p key={index} className="font-medium">
                      {item.product?.name || "Deleted Product"}
                      <span className="text-primary"> x {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm text-black/70">
              <p className='font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>{order.address.city}</p>
              <p>{order.address.phone}</p>
            </div>

            <div className="text-center">
              <p className="font-medium text-lg">
                {currency}{order.amount}
              </p>
              <p className="text-xs text-gray-500">
                {formatDateTime(order.createdAt)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">

              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>

              <select
                value={order.status}
                onChange={(e) => changeStatus(order._id, e.target.value)}
                disabled={order.status === "Cancelled" || order.status === "Canceled"}
                className={`border px-2 py-1 rounded text-sm 
                ${(order.status === "Cancelled" || order.status === "Canceled")
                    ? "bg-gray-200 cursor-not-allowed"
                    : ""}`}
              >
                <option>Order Placed</option>
                <option>Packed</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <p className="text-xs text-gray-500">
                {order.paymentType} • {
                  order.paymentType === "COD"
                    ? "Pay on Delivery"
                    : order.paymentStatus
                }
              </p>

              {order.location?.lat && order.location?.lng && (
                <button
                  onClick={() => openMap(order.location)}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                  📍 Track on Map
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
