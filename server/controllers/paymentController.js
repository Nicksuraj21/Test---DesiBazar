// import razorpay from "../configs/razorpay.js";
// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// // ==============================
// // CREATE RAZORPAY UPI ORDER
// // ==============================
// export const createUpiOrder = async (req, res) => {
//   try {
//     const { userId, items, address, coupon } = req.body;

//     if (!address || !items || items.length === 0) {
//       return res.json({ success: false, message: "Invalid data" });
//     }

//     let subtotal = 0;
//     let itemsWithPrice = [];

//     // 🔒 Price calculation backend-only (secure)
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.json({ success: false, message: "Product not found" });
//       }

//       const price = product.offerPrice;
//       subtotal += price * item.quantity;

//       itemsWithPrice.push({
//         product: item.product,
//         quantity: item.quantity,
//         price: price,
//       });
//     }

//     const deliveryCharge = subtotal < 100 ? 40 : 0;

//     let discount = 0;
//     if (coupon) {
//       if (coupon.toLowerCase() === "save10") {
//         discount = Math.floor(subtotal * 0.1);
//       } else if (coupon.toLowerCase() === "off50") {
//         discount = 50;
//       }
//     }

//     const amount = subtotal + deliveryCharge - discount;


//     // 🧾 Create Razorpay Order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: "upi_rcpt_" + Date.now(),
//     });

//     // 🗂 Save order in DB (Pending)
//     const order = await Order.create({
//       userId,
//       items: itemsWithPrice,
//       subtotal,
//       deliveryCharge,
//       tax: 0,
//       discount,
//       amount,
//       address,
//       paymentType: "UPI",
//       paymentStatus: "Pending",
//       isPaid: false,
//       razorpayOrderId: razorpayOrder.id,
//       status: "Order Placed",
//     });

//     return res.json({
//       success: true,
//       orderId: order._id,
//       razorpayOrder,
//     });

//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };


























// import razorpay from "../configs/razorpay.js";
// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import crypto from "crypto";

// // ==============================
// // CREATE RAZORPAY UPI ORDER
// // ==============================
// export const createUpiOrder = async (req, res) => {
//   try {


//     // 🧩 Order not placed without location validation 👇
//     // if (
//     //   !req.body.location ||
//     //   typeof req.body.location.lat !== "number" ||
//     //   typeof req.body.location.lng !== "number"
//     // ) {
//     //   return res.json({
//     //     success: false,
//     //     message: "Valid delivery location required"
//     //   });
//     // }


//     // ✅ OPTIONAL location validation
//     const location = req.body.location;

//     if (location) {
//       if (
//         typeof location.lat !== "number" ||
//         typeof location.lng !== "number"
//       ) {
//         return res.json({
//           success: false,
//           message: "Invalid delivery location"
//         });
//       }
//     }




//     const { userId, items, address, coupon } = req.body;

//     if (!address || !items || items.length === 0) {
//       return res.json({ success: false, message: "Invalid data" });
//     }

//     let subtotal = 0;
//     let itemsWithPrice = [];

//     // 🔒 Secure price calculation (backend only)
//     for (const item of items) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return res.json({ success: false, message: "Product not found" });
//       }

//       const price = product.offerPrice;
//       subtotal += price * item.quantity;

//       itemsWithPrice.push({
//         product: item.product,
//         quantity: item.quantity,
//         price: price,
//       });
//     }

//     const deliveryCharge = subtotal < 100 ? 40 : 0;

//     let discount = 0;
//     if (coupon) {
//       if (coupon.toLowerCase() === "save10") {
//         discount = Math.floor(subtotal * 0.1);
//       } else if (coupon.toLowerCase() === "off50") {
//         discount = 50;
//       }
//     }

//     const amount = subtotal + deliveryCharge - discount;

//     // 🧾 Create Razorpay Order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: "upi_rcpt_" + Date.now(),
//     });

//     // 🗂 Save order (Pending)
//     const order = await Order.create({
//       userId,
//       items: itemsWithPrice,
//       subtotal,
//       deliveryCharge,
//       tax: 0,
//       discount,
//       amount,
//       address,
//       paymentType: "UPI",
//       paymentStatus: "Pending",
//       isPaid: false,
//       razorpayOrderId: razorpayOrder.id,
//       status: "Order Placed",

//       location: req.body.location   // 👈 ADD THIS
//     });

//     return res.json({
//       success: true,
//       orderId: order._id,
//       razorpayOrder,
//     });

//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ==============================
// // VERIFY RAZORPAY UPI PAYMENT
// // ==============================
// export const verifyUpiPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !orderId
//     ) {
//       return res.json({ success: false, message: "Missing payment data" });
//     }

//     // 🔐 Signature verification
//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // ✅ Mark order as PAID
//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         isPaid: true,
//         paymentStatus: "Paid",
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature,
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.json({ success: false, message: "Order not found" });
//     }

//     // 🧹 Clear cart
//     await User.findByIdAndUpdate(order.userId, {
//       cartItems: {},
//     });

//     return res.json({
//       success: true,
//       message: "Payment verified successfully",
//       order,
//     });

//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };


























// import razorpay from "../configs/razorpay.js";
// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import crypto from "crypto";

// // ======================================================
// // CREATE RAZORPAY ORDER (UPI)
// // ======================================================
// export const createUpiOrder = async (req, res) => {
//   try {

//     // 🔥 USER FROM authUser MIDDLEWARE
//     const userId = req.user._id;

//     const { items, address, coupon, location } = req.body;

//     // ---------- GUARDS ----------
//     if (!userId) {
//       return res.json({
//         success: false,
//         message: "Login required"
//       });
//     }

//     if (!address) {
//       return res.json({
//         success: false,
//         message: "Address required"
//       });
//     }

//     if (!items || items.length === 0) {
//       return res.json({
//         success: false,
//         message: "Cart empty"
//       });
//     }

//     // ---------- PRICE CALC ----------
//     let subtotal = 0;
//     let itemsWithPrice = [];

//     for (const item of items) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return res.json({
//           success: false,
//           message: "Product not found"
//         });
//       }

//       const price = product.offerPrice;
//       subtotal += price * item.quantity;

//       itemsWithPrice.push({
//         product: item.product,
//         quantity: item.quantity,
//         price
//       });
//     }

//     const deliveryCharge = subtotal < 100 ? 40 : 0;

//     let discount = 0;
//     if (coupon) {
//       if (coupon.toLowerCase() === "save10") {
//         discount = Math.floor(subtotal * 0.1);
//       }
//       if (coupon.toLowerCase() === "off50") {
//         discount = 50;
//       }
//     }

//     const amount = subtotal + deliveryCharge - discount;

//     // ---------- CREATE RAZORPAY ORDER ----------
//     const razorpayOrder = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "upi_" + Date.now()
//     });

//     // ---------- SAVE ORDER ----------
//     const order = await Order.create({
//       userId,
//       items: itemsWithPrice,
//       subtotal,
//       deliveryCharge,
//       discount,
//       amount,
//       address,
//       paymentType: "UPI",
//       paymentStatus: "Pending",
//       isPaid: false,
//       razorpayOrderId: razorpayOrder.id,
//       status: "Order Placed",
//       location
//     });

//     return res.json({
//       success: true,
//       orderId: order._id,
//       razorpayOrder
//     });

//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// // ======================================================
// // VERIFY PAYMENT
// // ======================================================
// export const verifyUpiPayment = async (req, res) => {
//   try {

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId
//     } = req.body;

//     if (!orderId) {
//       return res.json({
//         success: false,
//         message: "OrderId missing"
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.json({
//         success: false,
//         message: "Payment verification failed"
//       });
//     }

//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         isPaid: true,
//         paymentStatus: "Paid",
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     await User.findByIdAndUpdate(order.userId, {
//       cartItems: {}
//     });

//     return res.json({
//       success: true,
//       message: "Payment success"
//     });

//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };

































import razorpay from "../configs/razorpay.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import crypto from "crypto";

// ==========================================
// CREATE UPI ORDER
// ==========================================
export const createUpiOrder = async (req, res) => {
  try {

    // 🔥 VERY IMPORTANT
    const userId = req.body.userId || req.userId;

    console.log("USER FROM TOKEN:", userId); // debug

    const { items, address, coupon, location } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not logged in"
      });
    }

    if (!address) {
      return res.json({
        success: false,
        message: "Address required"
      });
    }

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Cart empty"
      });
    }

    let subtotal = 0;
    let itemsWithPrice = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({
          success: false,
          message: "Product not found"
        });
      }

      const price = product.offerPrice;
      subtotal += price * item.quantity;

      itemsWithPrice.push({
        product: item.product,
        quantity: item.quantity,
        price
      });
    }

    const deliveryCharge = subtotal < 100 ? 40 : 0;

    let discount = 0;
    if (coupon) {
      if (coupon.toLowerCase() === "save10") {
        discount = Math.floor(subtotal * 0.1);
      }
      if (coupon.toLowerCase() === "off50") {
        discount = 50;
      }
    }

    const amount = subtotal + deliveryCharge - discount;

    // 🔥 CREATE RAZORPAY ORDER
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "upi_" + Date.now()
    });

    // 🔥 SAVE ORDER
    const order = await Order.create({
      userId,   // 👈 NOW THIS WILL WORK
      items: itemsWithPrice,
      subtotal,
      deliveryCharge,
      discount,
      amount,
      address,
      paymentType: "UPI",
      paymentStatus: "Pending",
      isPaid: false,
      razorpayOrderId: razorpayOrder.id,
      status: "Order Placed",
      location
    });

    return res.json({
      success: true,
      orderId: order._id,
      razorpayOrder
    });

  } catch (error) {
    console.log("UPI ERROR:", error);
    return res.json({
      success: false,
      message: error.message
    });
  }
};


// ==========================================
// VERIFY PAYMENT
// ==========================================
export const verifyUpiPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment verification failed"
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid: true,
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id
      },
      { new: true }
    );

    await User.findByIdAndUpdate(order.userId, {
      cartItems: {}
    });

    return res.json({
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message
    });
  }
};
