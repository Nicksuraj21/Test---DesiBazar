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






























import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {

  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // useEffect(() => {
  //   fetchOrders()
  // }, [])
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 4000); // auto refresh every 4 sec
    return () => clearInterval(interval);
  }, []);


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
    return "bg-gray-200"
  }

  // 📍 GOOGLE MAP OPEN
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
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >

            {/* LEFT */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-500 font-medium">
                Order ID: #{order._id.slice(-6)}
              </p>

              <div className="flex gap-4">
                <img className="w-12 h-12" src={assets.box_icon} />

                <div>
                  {order.items.map((item, index) => (
                    <p key={index} className="font-medium">
                      {item.product.name}
                      <span className="text-primary"> x {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="text-sm text-black/70">
              <p className='font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>{order.address.city}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* AMOUNT */}
            <div className="text-center">
              <p className="font-medium text-lg">
                {currency}{order.amount}
              </p>
              <p className="text-xs text-gray-500">
                {formatDateTime(order.createdAt)}
              </p>
            </div>

            {/* STATUS + TRACK */}
            <div className="flex flex-col items-end gap-2">

              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>

              <select
                value={order.status}
                onChange={(e) => changeStatus(order._id, e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              >
                <option>Order Placed</option>
                <option>Packed</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
              </select>

              <p className="text-xs text-gray-500">
                {order.paymentType} • {order.isPaid ? "Paid" : "COD"}
              </p>

              {/* 📍 TRACK ON MAP */}
              {order.location?.lat && order.location?.lng && (
                <button
                  onClick={() => openMap(order.location)}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                >
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































































