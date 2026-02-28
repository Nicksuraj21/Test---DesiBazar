// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {type: String, required: true },
//     description: {type: Array, required: true},
//     price: {type: Number, required: true },
//     offerPrice: {type: Number, required: true },
//     image: {type: Array, required: true },
//     category: {type: String, required: true },
//     inStock: {type: Boolean, default: true },
// }, { timestamps: true})

// const Product = mongoose.models.product || mongoose.model('product', productSchema)

// export default Product

















// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({

//   name: { type: String, required: true },
//   category: { type: String, required: true },

//   price: { type: Number, required: true },
//   offerPrice: { type: Number, required: true },

//   image: { type: Array, required: true },
//   description: { type: Array, required: true },

//   inStock: { type: Boolean, default: true },

//   // 🔴 NEW FIELD
//   bestSeller: { type: Boolean, default: false }

// },{timestamps:true})

// const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
// export default Product;






















// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {type: String, required: true },
//     description: {type: Array, required: true},
//     price: {type: Number, required: true },
//     offerPrice: {type: Number, required: true },
//     image: {type: Array, required: true },
//     category: {type: String, required: true },
//     inStock: {type: Boolean, default: true },

//     // 🔴 BEST SELLER FIELD
//     bestSeller: { type: Boolean, default: false }

// }, { timestamps: true})

// const Product = mongoose.models.product || mongoose.model('product', productSchema);

// export default Product;











import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    weight: { type: String },  // ✅ required hata diya - added new for weight
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    // 🔴 BEST SELLER FIELD
    bestSeller: { type: Boolean, default: false }

}, { timestamps: true })

const Product =
  mongoose.models.product ||
  mongoose.model('product', productSchema);

export default Product;