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


// ADD PRODUCT
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
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
        res.json({success: true, products})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// SINGLE
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)

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

