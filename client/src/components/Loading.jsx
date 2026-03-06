// import React, { useEffect } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { useLocation } from 'react-router-dom'

// const Loading = () => {

//     const { navigate } = useAppContext()
//     let { search } = useLocation()
//     const query = new URLSearchParams(search)
//     const nextUrl = query.get('next');

//     useEffect(()=>{
//         if(nextUrl){
//             setTimeout(()=>{
//                 navigate(`/${nextUrl}`)
//             },5000)
//         }
//     },[nextUrl])

//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'></div>
//     </div>
//   )
// }

// export default Loading






import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50 transition-opacity duration-200">
      <div className='animate-spin rounded-full h-24 w-24 border-5 border-gray-300 border-t-primary'></div>
    </div>
  );
};

export default Loading;