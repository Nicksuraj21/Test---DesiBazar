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





















import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    /* bg-gray-200 ek placeholder ka kaam karega jab tak image load nahi hoti */
    <div className='relative w-full bg-gray-200 overflow-hidden'>
      
      {/* Desktop Banner: 
          aspect-[16/6] reserve karega space (aap ise image size ke according change kar sakte hain)
          object-cover ensure karega ki image stretch na ho
      */}
      <img 
        src={assets.main_banner_bg} 
        alt="banner" 
        className='w-full hidden md:block aspect-[16/6] lg:aspect-[16/5] object-cover transition-opacity duration-500'
        loading="eager" 
      />

      {/* Mobile Banner: 
          aspect-[4/5] ya [1/1] mobile layout ke liye space reserve karega
      */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className='w-full md:hidden aspect-[4/5] object-cover transition-opacity duration-500'
        loading="eager"
      />

      {/* Content Overlay */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
          Freshness pe trust, savings ho mast! 
        </h1>

        <div className='flex items-center mt-6 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Shop now
            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
