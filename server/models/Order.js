// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     userId: {type: String, required: true, ref: 'user'},
//     items: [{
//         product: {type: String, required: true, ref: 'product'},
//         quantity: {type: Number, required: true}
//     }],
//     amount: {type: Number, required: true},
//     address: {type: String, required: true, ref: 'address'},
//     status: {type: String, default: 'Order Placed'},
//     paymentType: {type: String, required: true},
//     isPaid: {type: Boolean, required: true, default: false},
// },{ timestamps: true })

// const Order = mongoose.models.order || mongoose.model('order', orderSchema)

// export default Order






// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     userId: {type: String, required: true, ref: 'user'},

//     items: [{
//         product: {type: String, required: true, ref: 'product'},
//         quantity: {type: Number, required: true}
//     }],

//     amount: {type: Number, required: true},

//     address: {type: String, required: true, ref: 'address'},

//     status: {type: String, default: 'Order Placed'},


//     paymentType: {type: String, required: true},

//     isPaid: {type: Boolean, required: true, default: false},

// },{ timestamps: true })

// const Order = mongoose.models.order || mongoose.model('order', orderSchema)

// export default Order






// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//     userId: {type: String, required: true, ref: 'user'},

//     items: [{
//         product: {type: String, required: true, ref: 'product'},
//         quantity: {type: Number, required: true},
//         price: {type: Number, required: true}
//     }],

//     subtotal: { type: Number, default: 0 },
//     deliveryCharge: { type: Number, default: 0 },
//     tax: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },

//     amount: {type: Number, required: true},
//     address: {type: String, required: true, ref: 'address'},
//     status: {type: String, default: 'Order Placed'},
//     paymentType: {type: String, required: true},
//     isPaid: {type: Boolean, required: true, default: false},

// },{ timestamps: true })

// const Order = mongoose.models.order || mongoose.model('order', orderSchema)

// export default Order















// ------------------Updated models/Order.js (UPI Ready)------------------


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },

    items: [{
        product: { type: String, required: true, ref: 'product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],

    subtotal: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },

    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: 'address' },

    status: { type: String, default: 'Order Placed' },

    // COD | UPI
    paymentType: { type: String, required: true },

    // Existing (used already in code)
    isPaid: { type: Boolean, required: true, default: false },

    // 🔥 Razorpay / UPI fields (NEW)
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    paymentStatus: {
        type: String,
        enum: [
            'Pending',
            'Paid',
            'Failed',
            'Refund Initiated',
            'Refunded'
        ],
        default: 'Pending'
    },

    refundId: {
        type: String
    },

    location: {
        lat: Number,
        lng: Number
    }

}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;

