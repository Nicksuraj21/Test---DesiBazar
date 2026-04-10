// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";


// const ProductCard = ({ product }) => {
//     const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()


//     return product && (
//         <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full"
//         >
//             <div className="group cursor-pointer flex items-center justify-center px-2">
//                 <img className="group-hover:scale-105 transition w-24 md:w-32"
//                     src={product.image[0]} alt={product.name} />
//             </div>
//             <div className="text-gray-500/60 text-sm">
//                 <p>{product.category}</p>
//                 <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
//                 <div className="flex items-center gap-0.5">
//                     {Array(5).fill('').map((_, i) => (
//                         <img key={i} className="md:w-3.5 w-3"src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
//                     ))}
//                     {/* <p>(4)</p> */}
//                 </div>
//                 <div className="flex items-end justify-between mt-3">
//                     <p className="md:text-xl text-base font-medium text-primary">
//                         {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
//                     </p>
//                     <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
//                         {!cartItems[product._id] ? (
//                             <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" onClick={() => addToCart(product._id)} >
//                                 <img src={assets.cart_icon} alt="cart_icon" />
//                                 Add
//                             </button>
//                         ) : (
//                             <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
//                                 <button onClick={() => { removeFromCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
//                                     -
//                                 </button>
//                                 <span className="w-5 text-center">{cartItems[product._id]}</span>
//                                 <button onClick={() => { addToCart(product._id) }} className="cursor-pointer text-md px-2 h-full" >
//                                     +
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

























// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//     const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

//     return (
//         product && (
//             <div
//                 onClick={() => {
//                     navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//                     scrollTo(0, 0);
//                 }}
//                 className="border border-gray-200 rounded-xl p-3 bg-white w-full hover:shadow-md transition"
//             >
//                 {/* IMAGE */}
//                 <div className="flex items-center justify-center h-[90px]">
//                     <img
//                         className="max-h-[80px] object-contain hover:scale-105 transition"
//                         src={product.image[0]}
//                         alt={product.name}
//                     />
//                 </div>

//                 {/* INFO */}
//                 <div className="mt-2 text-sm">
//                     <p className="text-gray-400 text-xs">{product.category}</p>
//                     <p className="font-medium text-gray-800 truncate">{product.name}</p>

//                     {/* PRICE */}
//                     <div className="flex items-center justify-between mt-2">
//                         <p className="font-semibold text-primary text-sm">
//                             {currency}{product.offerPrice}
//                             <span className="line-through text-gray-400 text-xs ml-1">
//                                 {currency}{product.price}
//                             </span>
//                         </p>

//                         {/* CART BUTTON */}
//                         <div onClick={(e) => e.stopPropagation()}>
//                             {!cartItems[product._id] ? (
//                                 <button
//                                     onClick={() => addToCart(product._id)}
//                                     className="bg-primary text-white text-xs px-2 py-[4px] rounded-md hover:bg-primary/90"
//                                 >
//                                     Add
//                                 </button>
//                             ) : (
//                                 <div className="flex items-center gap-1 bg-primary/15 rounded-md px-1 py-[2px]">
//                                     <button
//                                         onClick={() => removeFromCart(product._id)}
//                                         className="px-1 text-sm"
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xs w-4 text-center">
//                                         {cartItems[product._id]}
//                                     </span>
//                                     <button
//                                         onClick={() => addToCart(product._id)}
//                                         className="px-1 text-sm"
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default ProductCard;





























// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

//   return (
//     product && (
//       <div
//         onClick={() => {
//           navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-200 rounded-xl p-4 bg-white w-full 
//         hover:shadow-md transition flex flex-col justify-between"
//       >
//         {/* IMAGE */}
//         <div className="flex items-center justify-center h-[95px] mb-2">
//           <img
//             className="max-h-[80px] object-contain hover:scale-105 transition"
//             src={product.image[0]}
//             alt={product.name}
//           />
//         </div>

//         {/* INFO */}
//         <div className="text-sm flex flex-col flex-grow">
//           <p className="text-gray-400 text-xs">{product.category}</p>
//           <p className="font-medium text-gray-800 truncate">{product.name}</p>

//           {/* ⭐ STARS */}
//           <div className="flex items-center gap-1 mt-1">
//             {Array(5)
//               .fill("")
//               .map((_, i) => (
//                 <img
//                   key={i}
//                   className="w-3.5"
//                   src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                   alt=""
//                 />
//               ))}
//             <span className="text-xs text-gray-400 ml-1">(4)</span>
//           </div>

//           {/* PRICE + CART */}
//           <div className="flex items-center justify-between mt-3 gap-2">

//             {/* PRICE */}
//             <p className="font-semibold text-primary text-sm whitespace-nowrap">
//               {currency}{product.offerPrice}
//               <span className="line-through text-gray-400 text-xs ml-1">
//                 {currency}{product.price}
//               </span>
//             </p>

//             {/* CART BUTTON */}
//             <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
//               {!cartItems[product._id] ? (
//                 <button
//                   onClick={() => addToCart(product._id)}
//                   className="bg-primary text-white text-xs px-3 py-[5px] rounded-md hover:bg-primary/90"
//                 >
//                   Add
//                 </button>
//               ) : (
//                 <div className="flex items-center gap-1 bg-primary/15 rounded-md px-2 py-[3px]">
//                   <button onClick={() => removeFromCart(product._id)} className="px-1 text-sm">-</button>
//                   <span className="text-xs w-4 text-center">{cartItems[product._id]}</span>
//                   <button onClick={() => addToCart(product._id)} className="px-1 text-sm">+</button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductCard;






















// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

//   return (
//     product && (
//       <div
//         onClick={() => {
//           navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-200 rounded-xl p-3 bg-white w-full 
//         hover:shadow-md transition flex flex-col justify-between"
//       >
//         {/* IMAGE */}
//         <div className="flex items-center justify-center h-[90px] mb-2">
//           <img
//             className="max-h-[75px] object-contain hover:scale-105 transition"
//             src={product.image[0]}
//             alt={product.name}
//           />
//         </div>

//         {/* INFO */}
//         <div className="text-sm flex flex-col flex-grow">
//           <p className="text-gray-400 text-xs">{product.category}</p>
//           <p className="font-medium text-gray-800 truncate">{product.name}</p>

//           {/* ⭐ STARS */}
//           <div className="flex items-center gap-1 mt-1">
//             {Array(5).fill("").map((_, i) => (
//               <img
//                 key={i}
//                 className="w-3"
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                 alt=""
//               />
//             ))}
//             <span className="text-[11px] text-gray-400 ml-1"></span>
//           </div>

//           {/* PRICE + CART */}
//           <div className="flex items-center justify-between mt-3 gap-2 w-full">

//             {/* PRICE */}
//             <p className="font-semibold text-primary text-sm whitespace-nowrap">
//               {currency}{product.offerPrice}
//               <span className="line-through text-gray-400 text-xs ml-1">
//                 {currency}{product.price}
//               </span>
//             </p>

//             {/* CART BUTTON */}
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="flex-shrink-0"
//             >
//               {!cartItems[product._id] ? (
//                 <button
//                   onClick={() => addToCart(product._id)}
//                   className="bg-primary text-white text-xs px-2 py-[4px] rounded-md"
//                 >
//                   Add
//                 </button>
//               ) : (
//                 <div className="flex items-center bg-primary/15 rounded-md px-1 py-[2px] gap-1 min-w-[68px] justify-between">
//                   <button
//                     onClick={() => removeFromCart(product._id)}
//                     className="px-1 text-sm leading-none"
//                   >
//                     -
//                   </button>

//                   <span className="text-xs w-4 text-center">
//                     {cartItems[product._id]}
//                   </span>

//                   <button
//                     onClick={() => addToCart(product._id)}
//                     className="px-1 text-sm leading-none"
//                   >
//                     +
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductCard;






















// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

//   return (
//     product && (
//       <div
//         onClick={() => {
//           if (!product.inStock) return;   // ❌ out of stock pe open bhi na ho
//           navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-200 rounded-xl p-3 bg-white w-full 
//         hover:shadow-md transition flex flex-col justify-between"
//       >

//         {/* IMAGE */}
//         <div className="flex items-center justify-center h-[90px] mb-2 relative">
//           <img
//             className={`max-h-[75px] object-contain transition ${
//               !product.inStock ? "opacity-50" : "hover:scale-105"
//             }`}
//             src={product.image[0]}
//             alt={product.name}
//           />

//           {/* 🔴 OUT OF STOCK BADGE */}
//           {!product.inStock && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                 Out of Stock
//               </span>
//             </div>
//           )}
//         </div>

//         {/* INFO */}
//         <div className="text-sm flex flex-col flex-grow">
//           <p className="text-gray-400 text-xs">{product.category}</p>
//           <p className="font-medium text-gray-800 truncate">{product.name}</p>

//           {/* ⭐ STARS */}
//           <div className="flex items-center gap-1 mt-1">
//             {Array(5).fill("").map((_, i) => (
//               <img
//                 key={i}
//                 className="w-3"
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                 alt=""
//               />
//             ))}
//           </div>

//           {/* PRICE + CART */}
//           <div className="flex items-center justify-between mt-3 gap-2 w-full">

//             {/* PRICE */}
//             <p className="font-semibold text-primary text-sm whitespace-nowrap">
//               {currency}{product.offerPrice}
//               <span className="line-through text-gray-400 text-xs ml-1">
//                 {currency}{product.price}
//               </span>
//             </p>

//             {/* CART BUTTON */}
//             <div onClick={(e) => e.stopPropagation()}>

//               {/* 🔴 OUT OF STOCK BUTTON */}
//               {!product.inStock ? (
//                 <button
//                   disabled
//                   className="bg-gray-400 text-white text-xs px-2 py-[4px] rounded-md cursor-not-allowed"
//                 >
//                   Out of Stock
//                 </button>
//               ) : !cartItems[product._id] ? (
//                 <button
//                   onClick={() => addToCart(product._id)}
//                   className="bg-primary text-white text-xs px-2 py-[4px] rounded-md"
//                 >
//                   Add
//                 </button>
//               ) : (
//                 <div className="flex items-center bg-primary/15 rounded-md px-1 py-[2px] gap-1 min-w-[68px] justify-between">
//                   <button
//                     onClick={() => removeFromCart(product._id)}
//                     className="px-1 text-sm"
//                   >
//                     -
//                   </button>

//                   <span className="text-xs w-4 text-center">
//                     {cartItems[product._id]}
//                   </span>

//                   <button
//                     onClick={() => addToCart(product._id)}
//                     className="px-1 text-sm"
//                   >
//                     +
//                   </button>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductCard;

































// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product }) => {
//   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

//   return (
//     product && (
//       <div
//         onClick={() => {
//           navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
//           scrollTo(0, 0);
//         }}
//         className="border border-gray-200 rounded-xl p-3 bg-white w-full 
//         hover:shadow-md transition flex flex-col justify-between"
//       >

//         {/* IMAGE */}
//         <div className="flex items-center justify-center h-[90px] mb-2 relative">
//           <img
//             className={`max-h-[75px] object-contain ${
//               !product.inStock ? "opacity-50" : "hover:scale-105 transition"
//             }`}
//             src={product.image[0]}
//             alt={product.name}
//           />

//           {!product.inStock && (
//             <span className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded">
//               Out of Stock
//             </span>
//           )}
//         </div>

//         {/* INFO */}
//         <div className="text-sm flex flex-col flex-grow">
//           <p className="text-gray-400 text-xs">{product.category}</p>
//           <p className="font-medium text-gray-800 truncate">{product.name}</p>

//           <div className="flex items-center gap-1 mt-1">
//             {Array(5).fill("").map((_, i) => (
//               <img
//                 key={i}
//                 className="w-3"
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                 alt=""
//               />
//             ))}
//           </div>

//           {/* PRICE + CART */}
//           <div className="flex items-center justify-between mt-3 gap-2 w-full">

//             <p className="font-semibold text-primary text-sm whitespace-nowrap">
//               {currency}{product.offerPrice}
//               <span className="line-through text-gray-400 text-xs ml-1">
//                 {currency}{product.price}
//               </span>
//             </p>

//             <div onClick={(e) => e.stopPropagation()}>
//               {!product.inStock ? (
//                 <button
//                   disabled
//                   className="bg-gray-400 text-white text-xs px-2 py-[4px] rounded-md cursor-not-allowed"
//                 >
//                   Out
//                 </button>
//               ) : !cartItems[product._id] ? (
//                 <button
//                   onClick={() => addToCart(product._id)}
//                   className="bg-primary text-white text-xs px-2 py-[4px] rounded-md"
//                 >
//                   Add
//                 </button>
//               ) : (
//                 <div className="flex items-center bg-primary/15 rounded-md px-1 py-[2px] gap-1 min-w-[68px] justify-between">
//                   <button onClick={() => removeFromCart(product._id)}>-</button>
//                   <span className="text-xs">{cartItems[product._id]}</span>
//                   <button onClick={() => addToCart(product._id)}>+</button>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ProductCard;

























import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { buildProductDetailPath } from "../utils/slugify";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate, products } = useAppContext();

  if (!product) return null;

  const qty = cartItems[product._id] || 0;
  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  return (
    <div
      onClick={() => {
        navigate(buildProductDetailPath(product.category, product.name, product._id, products));
        scrollTo(0, 0);
      }}
      className="group flex w-full cursor-pointer flex-col justify-between rounded-2xl border border-emerald-100/70 bg-white/90 p-3 shadow-md shadow-emerald-900/[0.04] backdrop-blur-[2px] transition duration-200 hover:border-emerald-200/90 hover:shadow-xl hover:shadow-emerald-900/[0.08]"
    >
      {/* IMAGE AREA */}
      <div className="relative flex items-center justify-center h-[110px] mb-2">

        {/* discount badge */}
        {discount > 0 && (
          <span className="absolute top-0 left-0 bg-green-600 text-white 
          text-[10px] px-2 py-[2px] rounded-br-md font-semibold">
            {discount}% OFF
          </span>
        )}

        {/* image */}
        <img
          src={product.image[0]}
          alt={product.name}
          className={`max-h-[90px] object-contain transition duration-200
          ${product.inStock ? "group-hover:scale-105" : "opacity-40"}`}
        />

        {/* out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-grow text-sm">
        <p className="text-gray-400 text-[8px] mb-[2px]">{product.category}</p>

       <p className="font-semibold text-gray-800 line-clamp-2 leading-[1.15] min-h-[22px]">
          {product.name}
        </p>

        {/* rating */}
        <div className="flex items-center gap-[2px] mt-[2px]">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-3"
              />
            ))}
          <span className="text-[10px] text-gray-500 ml-1"></span>
        </div>

        {/* PRICE + CART */}
        <div className="flex items-end justify-between mt-2">

          {/* price */}
          <div className="flex flex-col">
            <p className="font-bold text-[15px] text-gray-900">
              {currency}
              {product.offerPrice}
            </p>

            <p className="text-gray-400 text-xs line-through">
              {currency}
              {product.price}
            </p>
          </div>

          {/* CART BUTTON */}
          <div onClick={(e) => e.stopPropagation()}>
            {!product.inStock ? (
              <button
                disabled
                className="bg-gray-300 text-gray-600 text-xs px-3 py-[5px] rounded-lg"
              >
                Out
              </button>
            ) : qty === 0 ? (
              <button
                onClick={() => addToCart(product._id)}
                className="bg-primary text-white text-xs px-4 py-[6px] 
                rounded-lg font-semibold shadow-sm active:scale-95"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center bg-primary rounded-lg text-white 
              px-2 py-[4px] gap-2 shadow-sm">

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-lg px-1"
                >
                  −
                </button>

                <span className="text-xs font-semibold w-4 text-center">
                  {qty}
                </span>

                <button
                  onClick={() => addToCart(product._id)}
                  className="text-lg px-1"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

