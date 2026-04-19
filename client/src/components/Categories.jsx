// import React from 'react'
// import { categories } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'

// const Categories = () => {

//     const {navigate} = useAppContext()

//   return (
//     <div className='mt-16'>
//       <p className='text-2xl md:text-3xl font-medium'>Categories</p>
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>

//         {categories.map((category, index)=>(
//             <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
//             style={{backgroundColor: category.bgColor}}
//             onClick={()=>{
//                 navigate(`/products/${category.path.toLowerCase()}`);
//                 scrollTo(0,0)
//             }}
//             >
//                 <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28'/>
//                 {/* <p className='text-sm font-medium'>{category.text}</p> */}
//             </div>
                    
//         ))}

        
//       </div>
//     </div>
//   )
// }

// export default Categories















import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { slugify } from '../utils/slugify'

function ShopperAvatar({ imageUrl, className = '' }) {
  const [broken, setBroken] = useState(false)
  useEffect(() => {
    setBroken(false)
  }, [imageUrl])
  const url = imageUrl && String(imageUrl).trim() && !broken ? String(imageUrl).trim() : assets.profile_icon
  return (
    <img
      src={url}
      alt=""
      className={className}
      onError={() => setBroken(true)}
    />
  )
}

const Categories = () => {

  const { navigate, axios, currency } = useAppContext()
  const [topBuyers, setTopBuyers] = useState([])
  const [topBuyersMonthLabel, setTopBuyersMonthLabel] = useState("")
  const [topBuyersLoading, setTopBuyersLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setTopBuyersLoading(true)
        const { data } = await axios.get('/api/order/public/top-buyers')
        if (!cancelled && data.success && Array.isArray(data.buyers)) {
          setTopBuyers(data.buyers)
          setTopBuyersMonthLabel(data.monthLabel || "")
        }
      } catch {
        if (!cancelled) {
          setTopBuyers([])
          setTopBuyersMonthLabel("")
        }
      } finally {
        if (!cancelled) setTopBuyersLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [axios])

  return (
    <div className='mt-6 md:mt-16'>

      <p className='text-xl md:text-3xl font-medium'>
        Categories
      </p>

      <div className='
        grid
        grid-cols-3
        md:grid-cols-5
        lg:grid-cols-6
        xl:grid-cols-7
        mt-4 md:mt-6
        gap-1 md:gap-6   /* 🔥 Mobile gap aur kam */
      '>

        {categories.map((category, index) => (
          <div
            key={index}
            className='
              group cursor-pointer
              p-2 md:py-5 md:px-3   /* 🔥 Mobile padding kam */
              rounded-xl
              flex justify-center items-center
              aspect-square        /* 🔥 Perfect square card */
              transition
            '
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${slugify(category.path)}`);
              scrollTo(0, 0)
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className='
                w-24 md:max-w-28   /* 🔥 Image bada */
                group-hover:scale-105
                transition
              '
            />
          </div>
        ))}

      </div>

      <section
        className="mt-8 md:mt-12 rounded-2xl border border-emerald-100/90 bg-gradient-to-b from-white via-white to-emerald-50/40 p-5 shadow-md ring-1 ring-emerald-100/50 md:p-6"
        aria-labelledby="star-shoppers-heading"
      >
        <h2
          id="star-shoppers-heading"
          className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 md:gap-2.5 md:text-xl"
        >
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-white shadow-sm shadow-amber-500/20 ring-1 ring-white/50 md:h-8 md:w-8"
            aria-hidden
          >
            <Star className="h-3.5 w-3.5 fill-white/95 text-white md:h-4 md:w-4" strokeWidth={1.35} />
          </span>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Star shoppers
          </span>
        </h2>
        <p className="mt-1 text-xs text-slate-600 md:text-sm">
          Top 3 Customers by Spend 
          {topBuyersMonthLabel ? (
            <span className="text-slate-500"> — {topBuyersMonthLabel}</span>
          ) : null}
        </p>

        <p className="mt-1 text-xs text-slate-600 md:text-sm">
          Top 1 - Spender wins 50 free points at month-end.
        </p>

        {topBuyersLoading ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex animate-pulse flex-row items-center gap-3 rounded-xl border border-slate-100 bg-white/90 px-3 py-3.5 sm:flex-col sm:items-center sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:gap-4 lg:px-4 lg:py-4"
              >
                <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200 md:h-[4.5rem] md:w-[4.5rem]" />
                <div className="min-w-0 flex-1 space-y-2 sm:mt-3 sm:w-full sm:px-1 lg:mt-0 lg:flex-none lg:px-0">
                  <div className="h-3 w-[78%] max-w-[9rem] rounded-md bg-slate-200 sm:mx-auto lg:mx-0" />
                  <div className="h-2.5 w-full max-w-[7rem] rounded-md bg-slate-100 sm:mx-auto lg:mx-0" />
                  <div className="h-2.5 w-16 rounded-md bg-slate-100/80 sm:hidden lg:block" />
                </div>
                <div className="hidden h-10 w-16 shrink-0 rounded-md bg-slate-100 sm:block lg:hidden" />
                <div className="h-10 w-16 shrink-0 rounded-md bg-slate-100 sm:hidden lg:block" />
              </div>
            ))}
          </div>
        ) : topBuyers.length === 0 ? (
          <p className="mt-5 text-sm text-slate-500">No delivered orders this month yet.</p>
        ) : (
          <ul className="mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 md:gap-4">
            {topBuyers.map((buyer, idx) => (
              <li
                key={`${buyer.name}-${buyer.maskedEmail}-${idx}`}
                className="group flex h-full flex-row items-center gap-3 rounded-xl border border-slate-200/80 bg-white/95 px-3 py-3.5 shadow-sm transition hover:border-primary/30 hover:shadow-md sm:flex-col sm:items-center sm:px-4 sm:py-4 sm:text-center md:gap-4 lg:flex-row lg:items-center lg:gap-4 lg:px-4 lg:py-4 lg:text-left"
              >
                <div className="relative shrink-0">
                  <ShopperAvatar
                    imageUrl={buyer.profileImage}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-emerald-100/80 md:h-[4.5rem] md:w-[4.5rem]"
                  />
                  <span className="absolute -bottom-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold leading-none text-white shadow-sm ring-1 ring-white md:text-[10px]">
                    {idx + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1 sm:mt-1 sm:w-full lg:mt-0">
                  <p
                    className="truncate text-sm font-semibold text-slate-900 sm:line-clamp-2 sm:whitespace-normal sm:break-words sm:px-0.5 md:text-base lg:truncate lg:px-0"
                    title={buyer.name}
                  >
                    {buyer.name}
                  </p>
                  <p
                    className="mt-0.5 truncate text-xs text-slate-500 sm:line-clamp-2 sm:whitespace-normal sm:break-all sm:px-0.5 md:text-[13px] lg:truncate lg:px-0"
                    title={buyer.maskedEmail}
                  >
                    {buyer.maskedEmail}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600 sm:hidden md:text-sm lg:block">
                    <span className="text-slate-400">Orders</span>{" "}
                    <span className="tabular-nums text-slate-800">{buyer.orderCount}</span>
                  </p>
                </div>
                <div className="hidden w-full flex-row items-end justify-between gap-3 border-t border-slate-100 pt-3 text-sm sm:flex lg:hidden">
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Orders</p>
                    <p className="font-semibold tabular-nums text-slate-800">{buyer.orderCount}</p>
                  </div>
                  <div className="min-w-0 shrink-0 text-right">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Total</p>
                    <p className="text-base font-bold tabular-nums leading-tight text-primary md:text-lg">
                      {currency}
                      {buyer.totalSpent}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right sm:hidden lg:block">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 md:text-[11px]">
                    Total
                  </p>
                  <p className="text-sm font-bold tabular-nums text-primary md:text-base">
                    {currency}
                    {buyer.totalSpent}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Categories