// import { v2 as cloudinary } from "cloudinary"
// import Product from "../models/Product.js"

// // Add Product : /api/product/add
// export const addProduct = async (req, res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)

//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         await Product.create({...productData, image: imagesUrl})

//         res.json({success: true, message: "Product Added"})

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Get Product : /api/product/list
// export const productList = async (req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Get single Product : /api/product/id
// export const productById = async (req, res)=>{
//     try {
//         const { id } = req.body
//         const product = await Product.findById(id)
//         res.json({success: true, product})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Change Product inStock : /api/product/stock
// export const changeStock = async (req, res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }




























// import { v2 as cloudinary } from "cloudinary"
// import Product from "../models/Product.js"


// // ADD PRODUCT
// export const addProduct = async (req, res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)

//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         await Product.create({...productData, image: imagesUrl})

//         res.json({success: true, message: "Product Added"})

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // LIST PRODUCTS
// export const productList = async (req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // SINGLE PRODUCT
// export const productById = async (req, res)=>{
//     try {
//         const { id } = req.body
//         const product = await Product.findById(id)
//         res.json({success: true, product})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // CHANGE STOCK
// export const changeStock = async (req, res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // 🔴 DELETE PRODUCT
// export const deleteProduct = async (req, res)=>{
//     try {
//         const { id } = req.body

//         await Product.findByIdAndDelete(id)

//         res.json({
//             success: true,
//             message: "Product Deleted Successfully"
//         })

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }




























// import { v2 as cloudinary } from "cloudinary"
// import Product from "../models/Product.js"

// // ADD PRODUCT
// export const addProduct = async (req, res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)
//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         await Product.create({...productData, image: imagesUrl})

//         res.json({success: true, message: "Product Added"})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // LIST
// export const productList = async (req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // SINGLE
// export const productById = async (req, res)=>{
//     try {
//         const { id } = req.body
//         const product = await Product.findById(id)
//         res.json({success: true, product})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // STOCK
// export const changeStock = async (req, res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // DELETE
// export const deleteProduct = async (req, res)=>{
//     try {
//         const { id } = req.body
//         await Product.findByIdAndDelete(id)
//         res.json({ success: true, message: "Product Deleted" })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // 🔴 PRICE UPDATE ONLY
// export const updatePrice = async (req, res)=>{
//     try {
//         const { id, price, offerPrice } = req.body

//         await Product.findByIdAndUpdate(id, { price, offerPrice })

//         res.json({
//             success: true,
//             message: "Price Updated"
//         })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }





















// import { v2 as cloudinary } from "cloudinary"
// import Product from "../models/Product.js"

// // ADD PRODUCT
// export const addProduct = async (req, res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)
//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         await Product.create({...productData, image: imagesUrl})
//         res.json({success: true, message: "Product Added"})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // LIST
// export const productList = async (req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // STOCK
// export const changeStock = async (req, res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // DELETE
// export const deleteProduct = async (req, res)=>{
//     try {
//         const { id } = req.body
//         await Product.findByIdAndDelete(id)
//         res.json({ success: true, message: "Product Deleted" })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// // 🔴 UPDATE BOTH PRICES
// export const updatePrice = async (req, res)=>{
//     try {
//         const { id, price, offerPrice } = req.body

//         await Product.findByIdAndUpdate(id, { price, offerPrice })

//         res.json({
//             success: true,
//             message: "Price Updated"
//         })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }


















































// import { v2 as cloudinary } from "cloudinary"
// import Product from "../models/Product.js"


// // ================= ADD PRODUCT =================
// export const addProduct = async (req, res)=>{
//     try {
//         let productData = JSON.parse(req.body.productData)
//         const images = req.files

//         let imagesUrl = await Promise.all(
//             images.map(async (item)=>{
//                 let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                 return result.secure_url
//             })
//         )

//         await Product.create({...productData, image: imagesUrl})

//         res.json({success: true, message: "Product Added"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // ================= LIST PRODUCTS =================
// export const productList = async (req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // ================= GET SINGLE PRODUCT =================
// export const productById = async (req, res)=>{
//     try {
//         const { id } = req.body
//         const product = await Product.findById(id)

//         res.json({
//             success: true,
//             product
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// // ================= CHANGE STOCK =================
// export const changeStock = async (req, res)=>{
//     try {
//         const { id, inStock } = req.body
//         await Product.findByIdAndUpdate(id, {inStock})
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // ================= DELETE PRODUCT =================
// export const deleteProduct = async (req, res)=>{
//     try {
//         const { id } = req.body
//         await Product.findByIdAndDelete(id)

//         res.json({
//             success: true,
//             message: "Product Deleted Successfully"
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }


// // ================= UPDATE PRICE (MRP + OFFER) =================
// export const updatePrice = async (req, res)=>{
//     try {
//         const { id, price, offerPrice } = req.body

//         await Product.findByIdAndUpdate(id, {
//             price,
//             offerPrice
//         })

//         res.json({
//             success: true,
//             message: "Price Updated"
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }







































import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import Order from "../models/Order.js"
import { mapProductImages } from "../utils/productImageUrls.js"

/** Stored as 432×432 pad (no crop). Omit background: "auto" — can break uploads / delivery. */
const UPLOAD_IMAGE_TRANSFORMATION = [
  { width: 432, height: 432, crop: "pad", fetch_format: "auto", quality: "auto" },
]


// ADD PRODUCT
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                    transformation: UPLOAD_IMAGE_TRANSFORMATION,
                });
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.json({success: true, message: "Product Added"})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// LIST
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        const productsOut = products.map((p) => mapProductImages(p))
        res.json({success: true, products: productsOut})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/** Product IDs ranked by total units ordered (non-cancelled orders). Public for search / marketing. */
export const popularProductIds = async (req, res) => {
    try {
        const rows = await Order.aggregate([
            {
                $match: {
                    status: { $nin: ["Cancelled", "Canceled"] },
                    items: { $exists: true, $ne: [] },
                },
            },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    units: { $sum: { $ifNull: ["$items.quantity", 0] } },
                },
            },
            { $match: { _id: { $ne: null }, units: { $gt: 0 } } },
            { $sort: { units: -1 } },
            { $limit: 40 },
        ]);
        const ids = rows.map((r) => String(r._id));
        res.json({ success: true, ids });
    } catch (error) {
        res.json({ success: false, message: error.message, ids: [] });
    }
};


// SINGLE
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        let product = await Product.findById(id)
        if (product) product = mapProductImages(product)

        res.json({ success: true, product })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// STOCK
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// DELETE
export const deleteProduct = async (req, res)=>{
    try {
        const { id } = req.body
        await Product.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// PRICE UPDATE
export const updatePrice = async (req, res)=>{
    try {
        const { id, price, offerPrice } = req.body

        await Product.findByIdAndUpdate(id, { price, offerPrice })

        res.json({
            success: true,
            message: "Price Updated"
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// 🔴 BEST SELLER TOGGLE
export const toggleBestSeller = async (req,res)=>{
  try {
    const {id, bestSeller} = req.body

    await Product.findByIdAndUpdate(id,{bestSeller})

    res.json({
      success:true,
      message:"Updated"
    })
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

