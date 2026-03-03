// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const MainBanner = () => {
//   return (
//     <div className='relative'>
//       <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block'/>
//       <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden'/>

//       <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
//         <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'
//         >Freshness pe trust, savings ho mast! </h1>


//       <div className='flex items-center mt-6 font-medium'>
//         <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
//         Shop now
//         <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
//         </Link>

//         <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
//         Explore deals
//         <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
//         </Link>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default MainBanner





















// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const MainBanner = () => {
//   return (
//     /* bg-gray-200 ek placeholder ka kaam karega jab tak image load nahi hoti */
//     <div className='relative w-full bg-gray-200 overflow-hidden'>

//       {/* Desktop Banner: 
//           aspect-[16/6] reserve karega space (aap ise image size ke according change kar sakte hain)
//           object-cover ensure karega ki image stretch na ho
//       */}
//       <img 
//         src={assets.main_banner_bg} 
//         alt="banner" 
//         className='w-full hidden md:block aspect-[16/6] lg:aspect-[16/5] object-cover transition-opacity duration-500'
//         loading="eager" 
//       />

//       {/* Mobile Banner: 
//           aspect-[4/5] ya [1/1] mobile layout ke liye space reserve karega
//       */}
//       <img 
//         src={assets.main_banner_bg_sm} 
//         alt="banner" 
//         className='w-full md:hidden aspect-[4/5] object-cover transition-opacity duration-500'
//         loading="eager"
//       />

//       {/* Content Overlay */}
//       <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
//         <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
//           Freshness pe trust, savings ho mast! 
//         </h1>

//         <div className='flex items-center mt-6 font-medium'>
//           <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
//             Shop now
//             <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
//           </Link>

//           <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
//             Explore deals
//             <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainBanner



















// import React, { useEffect, useState } from "react"
// import { assets } from "../assets/assets"

// const MainBanner = () => {

//   const banners = [
//     assets.baner1,
//     assets.baner2,
//     assets.baner3,
//   ]

//   const [current, setCurrent] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="w-full overflow-hidden">

//       {/* Slider */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {banners.map((banner, index) => (
//           <img
//             key={index}
//             src={banner}
//             alt="banner"
//             className="w-full flex-shrink-0 h-[180px] md:h-[300px] lg:h-[400px] object-cover"
//           />
//         ))}
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-2 mt-2">
//         {banners.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-2 w-2 rounded-full cursor-pointer ${
//               current === index ? "bg-black" : "bg-gray-400"
//             }`}
//           ></div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default MainBanner




















// import React, { useEffect, useRef, useState } from "react"
// import { assets } from "../assets/assets"

// const MainBanner = () => {

//   const originalBanners = [
//     assets.baner1,
//     assets.baner2,
//     assets.baner3,
//   ]

//   // Clone first & last
//   const banners = [
//     originalBanners[originalBanners.length - 1],
//     ...originalBanners,
//     originalBanners[0],
//   ]

//   const [current, setCurrent] = useState(1)
//   const [transition, setTransition] = useState(true)
//   const sliderRef = useRef(null)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => prev + 1)
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   useEffect(() => {
//     if (current === banners.length - 1) {
//       setTimeout(() => {
//         setTransition(false)
//         setCurrent(1)
//       }, 700)
//     }

//     if (current === 0) {
//       setTimeout(() => {
//         setTransition(false)
//         setCurrent(banners.length - 2)
//       }, 700)
//     }

//     setTimeout(() => {
//       setTransition(true)
//     }, 50)

//   }, [current, banners.length])

//   return (
//     <div className="w-full mt-6 md:mt-8">

//       <div className="relative w-full overflow-hidden">

//         <div
//           ref={sliderRef}
//           className="flex"
//           style={{
//             transform: `translateX(-${current * 100}%)`,
//             transition: transition ? "transform 0.7s ease-in-out" : "none"
//           }}
//         >
//           {banners.map((banner, index) => (
//             <img
//               key={index}
//               src={banner}
//               alt="banner"
//               className="w-full flex-shrink-0 
//                max-h-[280px] 
//                md:max-h-[420px] 
//                lg:max-h-[550px] 
//                object-contain"
//             />
//           ))}
//         </div>

//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-1.5 mt-3">
//         {originalBanners.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrent(index + 1)}
//             className={`h-2 w-2 rounded-full cursor-pointer transition ${
//               current === index + 1 ? "bg-black scale-110" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>

//     </div>
//   )
// }

// export default MainBanner

























import React, { useEffect, useRef, useState } from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

const MainBanner = () => {

  const originalBanners = [
    assets.baner1,
    assets.baner2,
    assets.baner3,
    assets.baner4,
  ]

  const banners = [
    originalBanners[originalBanners.length - 1],
    ...originalBanners,
    originalBanners[0],
  ]

  const [current, setCurrent] = useState(1)
  const [transition, setTransition] = useState(true)
  const sliderRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (current === banners.length - 1) {
      setTimeout(() => {
        setTransition(false)
        setCurrent(1)
      }, 700)
    }

    if (current === 0) {
      setTimeout(() => {
        setTransition(false)
        setCurrent(banners.length - 2)
      }, 700)
    }

    setTimeout(() => {
      setTransition(true)
    }, 50)

  }, [current, banners.length])

  return (
    <div className="w-full mt-6 md:mt-8">

     <div className="relative w-full overflow-hidden">

  <div
    ref={sliderRef}
    className="flex"
    style={{
      transform: `translateX(-${current * 100}%)`,
      transition: transition ? "transform 0.7s ease-in-out" : "none"
    }}
  >
    {banners.map((banner, index) => (
      <div
        key={index}
        className="w-full flex-shrink-0 aspect-[16/7]"
      >
        <img
          src={banner}
          alt="banner"
          loading="eager"
          className="w-full h-full object-contain"
        />
      </div>
    ))}
  </div>

</div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {originalBanners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index + 1)}
            className={`h-2 w-2 rounded-full cursor-pointer transition ${current === index + 1 ? "bg-black scale-110" : "bg-gray-400"
              }`}
          />
        ))}
      </div>

      {/* 🔥 Shop Now Button */}
      {/* Hero Text Section */}
      <div className="flex flex-col items-center text-center mt-8 px-4">
        <h2 className="font-bold text-gray-800 leading-tight
               text-3xl min-[390px]:text-4xl
               md:text-5xl lg:text-6xl
               max-w-4xl text-center mx-auto">

          Freshness pe trust,
          <br />
          savings ho mast!

        </h2>

        <div className="flex items-center gap-4 mt-6">

          <Link
            to="/products"
            className="px-5 py-2 md:px-8 md:py-3
               bg-primary hover:bg-primary-dull
               text-white rounded-md
               transition duration-300
               font-medium shadow-sm hover:shadow-md
               text-sm md:text-base"
          >
            Shop now
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-1.5
               text-gray-700
               font-medium text-sm md:text-base
               hover:gap-2 transition-all duration-300"
          >
            Explore deals
            <span className="text-base md:text-lg">→</span>
          </Link>

        </div>
      </div>

    </div>
  )
}

export default MainBanner