// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { Link, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductDetails = () => {

//     const {products, navigate, currency, addToCart} = useAppContext()
//     const {id} = useParams()
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [thumbnail, setThumbnail] = useState(null);

//     const product = products.find((item)=> item._id === id);

//     useEffect(()=>{
//         if(products.length > 0){
//             let productsCopy = products.slice();
//             productsCopy = productsCopy.filter((item)=> product.category === item.category)
//             setRelatedProducts(productsCopy.slice(0,5))
//         }
//     },[products])

//     useEffect(()=>{
//         setThumbnail(product?.image[0] ? product.image[0] : null)
//     },[product])


//     return product && (
//         <div className="mt-12">
//             <p>
//                 <Link to={"/"}>Home</Link> /
//                 <Link to={"/products"}> Products</Link> /
//                 <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
//                 <span className="text-primary"> {product.name}</span>
//             </p>

//             <div className="flex flex-col md:flex-row gap-16 mt-4">
//                 <div className="flex gap-3">
//                     <div className="flex flex-col gap-3">
//                         {product.image.map((image, index) => (
//                             <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
//                                 <img src={image} alt={`Thumbnail ${index + 1}`} />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
//                         <img src={thumbnail} alt="Selected product" />
//                     </div>
//                 </div>

//                 <div className="text-sm w-full md:w-1/2">
//                     <h1 className="text-3xl font-medium">{product.name}</h1>

//                     <div className="flex items-center gap-0.5 mt-1">
//                         {Array(5).fill('').map((_, i) => (
//                           <img src={i<4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4 w-3.5"/>

//                         ))}
//                         <p className="text-base ml-2">(4)</p>
//                     </div>

//                     <div className="mt-6">
//                         <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
//                         <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
//                         <span className="text-gray-500/70">(inclusive of all taxes)</span>
//                     </div>

//                     <p className="text-base font-medium mt-6">About Product</p>
//                     <ul className="list-disc ml-4 text-gray-500/70">
//                         {product.description.map((desc, index) => (
//                             <li key={index}>{desc}</li>
//                         ))}
//                     </ul>

//                     <div className="flex items-center mt-10 gap-4 text-base">
//                         <button onClick={()=> addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
//                             Add to Cart
//                         </button>
//                         <button onClick={()=> {addToCart(product._id); navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
//                             Buy now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {/* ---------- related products -------------- */}
//             <div className="flex flex-col items-center mt-20">
//                 <div className="flex flex-col items-center w-max">
//                     <p className="text-3xl font-medium">Related Products</p>
//                     <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
//                     {relatedProducts.filter((product)=>product.inStock).map((product, index)=>(
//                         <ProductCard key={index} product={product}/>
//                     ))}
//                 </div>
//                 <button onClick={()=> {navigate('/products'); scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition">See more</button>
//             </div>
//         </div>
//     );
// };


// export default ProductDetails






































// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { Link, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductDetails = () => {

//     const { products, navigate, currency, addToCart } = useAppContext()
//     const { id } = useParams()

//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [recommendedProducts, setRecommendedProducts] = useState([]);
//     const [trendingProducts, setTrendingProducts] = useState([]);
//     const [thumbnail, setThumbnail] = useState(null);

//     const product = products.find((item) => item._id === id);

//     // RELATED PRODUCTS
//     useEffect(() => {
//         if (products.length > 0 && product) {

//             let related = products.filter(
//                 (item) => item.category === product.category && item._id !== product._id
//             )

//             related = related.sort(() => 0.5 - Math.random())

//             setRelatedProducts(related.slice(0, 8))
//         }
//     }, [products, product])



//     // CUSTOMERS ALSO BOUGHT
//     useEffect(() => {

//         if (products.length > 0 && product) {

//             const minPrice = product.offerPrice * 0.7
//             const maxPrice = product.offerPrice * 1.3

//             const relatedIds = relatedProducts.map(p => p._id)

//             let recommended = products.filter(item =>
//                 item._id !== product._id &&
//                 item.offerPrice >= minPrice &&
//                 item.offerPrice <= maxPrice &&
//                 !relatedIds.includes(item._id)
//             )

//             // fallback if nothing found
//             if (recommended.length === 0) {
//                 recommended = products.filter(item =>
//                     item._id !== product._id &&
//                     item.category === product.category &&
//                     !relatedIds.includes(item._id)
//                 )
//             }

//             recommended = recommended.sort(() => 0.5 - Math.random())

//             setRecommendedProducts(recommended.slice(0, 6))
//         }

//     }, [products, product, relatedProducts])



//     // TRENDING PRODUCTS
//     useEffect(() => {

//         if (products.length > 0) {

//             let trending = [...products]

//             trending = trending.sort(() => 0.5 - Math.random())

//             setTrendingProducts(trending.slice(0, 6))
//         }

//     }, [products])



//     useEffect(() => {
//         setThumbnail(product?.image[0] ? product.image[0] : null)
//     }, [product])



//     return product && (
//         <div className="mt-12">

//             <p>
//                 <Link to={"/"}>Home</Link> /
//                 <Link to={"/products"}> Products</Link> /
//                 <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
//                 <span className="text-primary"> {product.name}</span>
//             </p>



//             <div className="flex flex-col md:flex-row gap-16 mt-4">

//                 <div className="flex gap-3">

//                     <div className="flex flex-col gap-3">
//                         {product.image.map((image, index) => (
//                             <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
//                                 <img src={image} alt="" />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
//                         <img src={thumbnail} alt="" />
//                     </div>

//                 </div>



//                 <div className="text-sm w-full md:w-1/2">

//                     <h1 className="text-3xl font-medium">{product.name}</h1>

//                     <div className="flex items-center gap-0.5 mt-1">
//                         {Array(5).fill('').map((_, i) => (
//                             <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4 w-3.5" />
//                         ))}
//                     </div>



//                     <div className="mt-6">
//                         <p className="text-gray-500/70 line-through">
//                             MRP: {currency}{product.price}
//                         </p>

//                         <p className="text-2xl font-medium">
//                             MRP: {currency}{product.offerPrice}
//                         </p>

//                         <span className="text-gray-500/70">(inclusive of all taxes)</span>
//                     </div>



//                     <p className="text-base font-medium mt-6">About Product</p>

//                     <ul className="list-disc ml-4 text-gray-500/70">
//                         {product.description.map((desc, index) => (
//                             <li key={index}>{desc}</li>
//                         ))}
//                     </ul>



//                     <div className="flex items-center mt-10 gap-4 text-base">

//                         {!product.inStock ? (

//                             <button
//                                 disabled
//                                 className="w-full py-3.5 font-medium bg-gray-300 text-white cursor-not-allowed"
//                             >
//                                 Out of Stock
//                             </button>

//                         ) : (

//                             <>
//                                 <button
//                                     onClick={() => addToCart(product._id)}
//                                     className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
//                                     Add to Cart
//                                 </button>

//                                 <button
//                                     onClick={() => { addToCart(product._id); navigate("/cart") }}
//                                     className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
//                                     Buy now
//                                 </button>
//                             </>

//                         )}

//                     </div>

//                 </div>

//             </div>



//             {/* RELATED PRODUCTS */}

//             <div className="flex flex-col items-center mt-20">

//                 <div className="flex flex-col items-center w-max">
//                     <p className="text-3xl font-medium">Related Products</p>
//                     <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
//                     {relatedProducts.map((product, index) => (
//                         <ProductCard key={index} product={product} />
//                     ))}
//                 </div>

//             </div>



//             {/* CUSTOMERS ALSO BOUGHT */}

//             <div className="flex flex-col items-center mt-20">

//                 <div className="flex flex-col items-center w-max">
//                     <p className="text-3xl font-medium">Customers also bought</p>
//                     <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
//                     {recommendedProducts.map((product, index) => (
//                         <ProductCard key={index} product={product} />
//                     ))}
//                 </div>

//             </div>



//             {/* TRENDING PRODUCTS */}

//             <div className="flex flex-col items-center mt-20">

//                 <div className="flex flex-col items-center w-max">
//                     <p className="text-3xl font-medium">Trending Products</p>
//                     <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
//                     {trendingProducts.map((product, index) => (
//                         <ProductCard key={index} product={product} />
//                     ))}
//                 </div>

//                 <button
//                     onClick={() => { navigate('/products'); scrollTo(0, 0) }}
//                     className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition">
//                     See more
//                 </button>

//             </div>

//         </div>
//     );
// };

// export default ProductDetails;




































import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { extractProductIdFromSlugParam } from "../utils/slugify";

const ProductDetails = () => {

    const { products, navigate, currency, addToCart } = useAppContext()
    const { slug } = useParams()

    const productId = (() => {
        if (slug != null && String(slug).trim() !== "") {
            return extractProductIdFromSlugParam(slug);
        }
        return "";
    })()

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);   // NEW
    const [thumbnail, setThumbnail] = useState(null);

    const product = productId
        ? products.find((item) => item._id === productId)
        : undefined;



    // RELATED PRODUCTS
    useEffect(() => {
        if (products.length > 0 && product) {

            let related = products.filter(
                (item) => item.category === product.category && item._id !== product._id
            )

            related = related.sort(() => 0.5 - Math.random())

            setRelatedProducts(related.slice(0, 8))
        }
    }, [products, product])



    // CUSTOMERS ALSO BOUGHT
    useEffect(() => {

        if (products.length > 0 && product) {

            const minPrice = product.offerPrice * 0.7
            const maxPrice = product.offerPrice * 1.3

            const relatedIds = relatedProducts.map(p => p._id)

            let recommended = products.filter(item =>
                item._id !== product._id &&
                item.offerPrice >= minPrice &&
                item.offerPrice <= maxPrice &&
                !relatedIds.includes(item._id)
            )

            if (recommended.length === 0) {
                recommended = products.filter(item =>
                    item._id !== product._id &&
                    item.category === product.category &&
                    !relatedIds.includes(item._id)
                )
            }

            recommended = recommended.sort(() => 0.5 - Math.random())

            setRecommendedProducts(recommended.slice(0, 6))
        }

    }, [products, product, relatedProducts])



    // TRENDING PRODUCTS
    useEffect(() => {

        if (products.length > 0) {

            let trending = [...products]

            trending = trending.sort(() => 0.5 - Math.random())

            setTrendingProducts(trending.slice(0, 6))
        }

    }, [products])



    // PRODUCT IMAGE
    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null)
    }, [product])




    // SAVE RECENTLY VIEWED (OPTIMIZED)
    useEffect(() => {

        if (!product) return;

        let viewed = JSON.parse(localStorage.getItem("recentProducts")) || [];

        // remove duplicate
        viewed = viewed.filter(item => item._id !== product._id);

        // add new product at top
        viewed.unshift(product);

        // keep only 4 latest
        viewed = viewed.slice(0, 5);

        localStorage.setItem("recentProducts", JSON.stringify(viewed));

        setRecentProducts(viewed);

    }, [product]);



    // LOAD RECENTLY VIEWED
    useEffect(() => {

        const viewed = JSON.parse(localStorage.getItem("recentProducts")) || []

        setRecentProducts(viewed)

    }, [])



    return product && (
        <div className="mt-12">

            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>



            <div className="flex flex-col md:flex-row gap-16 mt-4">

                <div className="flex gap-3">

                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt="" />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="" />
                    </div>

                </div>



                <div className="text-sm w-full md:w-1/2">

                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4 w-3.5" />
                        ))}
                    </div>



                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: {currency}{product.price}
                        </p>

                        <p className="text-2xl font-medium">
                            MRP: {currency}{product.offerPrice}
                        </p>

                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>



                    <p className="text-base font-medium mt-6">About Product</p>

                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>



                    <div className="flex items-center mt-10 gap-4 text-base">

                        {!product.inStock ? (

                            <button
                                disabled
                                className="w-full py-3.5 font-medium bg-gray-300 text-white cursor-not-allowed"
                            >
                                Out of Stock
                            </button>

                        ) : (

                            <>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => { addToCart(product._id); navigate("/cart") }}
                                    className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                                    Buy now
                                </button>
                            </>

                        )}

                    </div>

                </div>

            </div>



            {/* RELATED PRODUCTS */}

            <div className="flex flex-col items-center mt-20">

                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
                    {relatedProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

            </div>



            {/* CUSTOMERS ALSO BOUGHT */}

            <div className="flex flex-col items-center mt-20">

                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Customers also bought</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
                    {recommendedProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

            </div>



            {/* TRENDING PRODUCTS */}

            <div className="flex flex-col items-center mt-20">

                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Trending Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
                    {trendingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

            </div>



            {/* RECENTLY VIEWED */}

            <div className="flex flex-col items-center mt-20">

                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Recently Viewed</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
                    {recentProducts
                        .filter(p => p._id !== product._id)
                        .slice(0, 4)
                        .map((product, index) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>

                <button
                    onClick={() => { navigate('/products'); scrollTo(0, 0) }}
                    className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition">
                    See more
                </button>

            </div>

        </div>
    );
};

export default ProductDetails;