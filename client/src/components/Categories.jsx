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















import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { slugify } from '../utils/slugify'

const Categories = () => {

  const { navigate } = useAppContext()

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
    </div>
  )
}

export default Categories