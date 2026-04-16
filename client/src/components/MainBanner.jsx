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
































// import React, { useEffect, useRef, useState } from "react"
// import { assets } from "../assets/assets"
// import { Link } from "react-router-dom"

// const MainBanner = () => {

//   const originalBanners = [
//     assets.baner1,
//     assets.baner2,
//     assets.baner3,
//     assets.baner4,
//   ]

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
//             <div
//               key={index}
//               className="w-full flex-shrink-0 aspect-[9/4]"
//             >
//               <img
//                 src={banner}
//                 alt="banner"
//                 loading="eager"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-1.5 mt-3">
//         {originalBanners.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrent(index + 1)}
//             className={`h-2 w-2 rounded-full cursor-pointer transition ${current === index + 1 ? "bg-black scale-110" : "bg-gray-400"
//               }`}
//           />
//         ))}
//       </div>

//       {/* 🔥 Shop Now Button */}
//       {/* Hero Text Section */}
//       <div className="flex flex-col items-center text-center mt-8 px-4">
//         <h2 className="font-bold text-gray-800 leading-tight
//                text-3xl min-[390px]:text-4xl
//                md:text-5xl lg:text-6xl
//                max-w-4xl text-center mx-auto">

//           Freshness pe trust,
//           <br />
//           savings ho mast!

//         </h2>

//         <div className="flex items-center gap-4 mt-6">

//           <Link
//             to="/products"
//             className="px-5 py-2 md:px-8 md:py-3
//                bg-primary hover:bg-primary-dull
//                text-white rounded-md
//                transition duration-300
//                font-medium shadow-sm hover:shadow-md
//                text-sm md:text-base"
//           >
//             Shop now
//           </Link>

//           <Link
//             to="/products"
//             className="flex items-center gap-1.5
//                text-gray-700
//                font-medium text-sm md:text-base
//                hover:gap-2 transition-all duration-300"
//           >
//             Explore deals
//             <span className="text-base md:text-lg">→</span>
//           </Link>

//         </div>
//       </div>

//     </div>
//   )
// }

// export default MainBanner




























import React, { useEffect, useRef, useState } from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const OUT_OF_SERVICE_BANNER = "/outofservice.png"

const MainBanner = () => {

  const { storeAcceptingOrders } = useAppContext()

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
  const [loadedImages, setLoadedImages] = useState({})

  const sliderRef = useRef(null)

  useEffect(() => {
    if (storeAcceptingOrders !== true) return
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [storeAcceptingOrders])

  useEffect(() => {
    if (storeAcceptingOrders !== true) return

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

  }, [current, banners.length, storeAcceptingOrders])

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }))
  }

  /* Match dot highlight when showing clone slides at edges */
  const activeDotIndex =
    current === 0
      ? originalBanners.length - 1
      : current === banners.length - 1
        ? 0
        : current - 1

  return (
    <div className="w-full mt-6 md:mt-8">

      <div
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[1.75rem] shadow-[0_12px_40px_-12px_rgba(5,150,105,0.25),0_4px_24px_-8px_rgba(15,23,42,0.12)] ring-1 ring-white/50"
      >

        {storeAcceptingOrders === null ? (
          <div
            className="relative flex w-full aspect-[9/4] items-center justify-center bg-gray-100"
            aria-busy="true"
            aria-label="Loading banner"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          </div>
        ) : storeAcceptingOrders ? (
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
                className="relative w-full flex-shrink-0 aspect-[9/4]"
              >

                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  </div>
                )}

                <img
                  src={banner}
                  alt="banner"
                  loading="eager"
                  onLoad={() => handleImageLoad(index)}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full aspect-[9/4] bg-slate-100">
            <img
              src={OUT_OF_SERVICE_BANNER}
              alt="DesiBazar is temporarily not accepting new orders online"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        )}

      </div>

      {storeAcceptingOrders === true && (
        <div className="mt-3 flex justify-center" role="tablist" aria-label="Banner slides">
          <div className="flex items-center gap-2.5 rounded-full bg-white/55 px-2.5 py-1.5 shadow-sm shadow-emerald-900/5 backdrop-blur-sm">
            {originalBanners.map((_, index) => {
              const isActive = activeDotIndex === index
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => setCurrent(index + 1)}
                  className={`rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive
                      ? "h-1.5 w-4 bg-primary/90 shadow-[0_0_0_3px_rgba(5,150,105,0.12)]"
                      : "h-1.5 w-1.5 bg-slate-300/90 hover:bg-slate-400"
                  }`}
                />
              )
            })}
          </div>
        </div>
      )}

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