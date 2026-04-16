// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe"
// import User from "../models/User.js"

// // Place Order COD : /api/order/cod
// export const placeOrderCOD = async (req, res)=>{
//     try {
//         const { userId, items, address } = req.body;
//         if(!address || items.length === 0){
//             return res.json({success: false, message: "Invalid data"})
//         }
//         // Calculate Amount Using Items
//         let amount = await items.reduce(async (acc, item)=>{
//             const product = await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         // Add Tax Charge (2%)
//         amount += Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "COD",
//         });

//         return res.json({success: true, message: "Order Placed Successfully" })
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }

// // Place Order Stripe : /api/order/stripe
// export const placeOrderStripe = async (req, res)=>{
//     try {
//         const { userId, items, address } = req.body;
//         const {origin} = req.headers;

//         if(!address || items.length === 0){
//             return res.json({success: false, message: "Invalid data"})
//         }

//         let productData = [];

//         // Calculate Amount Using Items
//         let amount = await items.reduce(async (acc, item)=>{
//             const product = await Product.findById(item.product);
//             productData.push({
//                 name: product.name,
//                 price: product.offerPrice,
//                 quantity: item.quantity,
//             });
//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         // Add Tax Charge (2%)
//         amount += Math.floor(amount * 0.02);

//        const order =  await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "Online",
//         });

//     // Stripe Gateway Initialize    
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     // create line items for stripe

//      const line_items = productData.map((item)=>{
//         return {
//             price_data: {
//                 currency: "usd",
//                 product_data:{
//                     name: item.name,
//                 },
//                 unit_amount: Math.floor(item.price + item.price * 0.02)  * 100
//             },
//             quantity: item.quantity,
//         }
//      })

//      // create session
//      const session = await stripeInstance.checkout.sessions.create({
//         line_items,
//         mode: "payment",
//         success_url: `${origin}/loader?next=my-orders`,
//         cancel_url: `${origin}/cart`,
//         metadata: {
//             orderId: order._id.toString(),
//             userId,
//         }
//      })

//         return res.json({success: true, url: session.url });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }
// // Stripe Webhooks to Verify Payments Action : /stripe
// export const stripeWebhooks = async (request, response)=>{
//     // Stripe Gateway Initialize
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const sig = request.headers["stripe-signature"];
//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     // Handle the event
//     switch (event.type) {
//         case "payment_intent.succeeded":{
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             // Getting Session Metadata
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId, userId } = session.data[0].metadata;
//             // Mark Payment as Paid
//             await Order.findByIdAndUpdate(orderId, {isPaid: true})
//             // Clear user cart
//             await User.findByIdAndUpdate(userId, {cartItems: {}});
//             break;
//         }
//         case "payment_intent.payment_failed": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             // Getting Session Metadata
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId } = session.data[0].metadata;
//             await Order.findByIdAndDelete(orderId);
//             break;
//         }


//         default:
//             console.error(`Unhandled event type ${event.type}`)
//             break;
//     }
//     response.json({received: true});
// }


// // Get Orders by User ID : /api/order/user
// export const getUserOrders = async (req, res)=>{
//     try {
//         const { userId } = req.body;
//         const orders = await Order.find({
//             userId,
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         }).populate("items.product address").sort({createdAt: -1});
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // Get All Orders ( for seller / admin) : /api/order/seller
// export const getAllOrders = async (req, res)=>{
//     try {
//         const orders = await Order.find({
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         }).populate("items.product address").sort({createdAt: -1});
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }





































// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe"
// import User from "../models/User.js"

// // PLACE COD
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         // let amount = await items.reduce(async (acc, item)=>{
//         //     const product = await Product.findById(item.product);
//         //     return (await acc) + product.offerPrice * item.quantity;
//         // }, 0)

//         // amount += Math.floor(amount * 0.02);

//         // await Order.create({
//         //     userId,
//         //     items,
//         //     amount,
//         //     address,
//         //     paymentType: "COD",
//         //     status: "Order Placed"
//         // });


//         // let orderItems = [];
//         // let amount = 0;

//         // for (const item of items) {
//         //     const product = await Product.findById(item.product);

//         //     orderItems.push({
//         //         product: item.product,
//         //         quantity: item.quantity,
//         //         price: product.offerPrice   // ⭐ price snapshot
//         //     });

//         //     amount += product.offerPrice * item.quantity;
//         // }

//         // amount += Math.floor(amount * 0.02);

//         // await Order.create({
//         //     userId,
//         //     items: orderItems,
//         //     amount,
//         //     address,
//         //     paymentType: "COD",
//         //     status: "Order Placed"
//         // });


//         let orderItems = [];
//         let itemsTotal = 0;

//         for (const item of items) {
//             const product = await Product.findById(item.product);

//             orderItems.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: product.offerPrice
//             });

//             itemsTotal += product.offerPrice * item.quantity;
//         }

//         // charges
//         const deliveryCharge = 40;   // change if needed
//         const tax = Math.floor(itemsTotal * 0.02);

//         const amount = itemsTotal + deliveryCharge + tax;

//         await Order.create({
//             userId,
//             items: orderItems,
//             itemsTotal,
//             deliveryCharge,
//             tax,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed"
//         });


//         return res.json({ success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // PLACE STRIPE
// export const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         const { origin } = req.headers;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let productData = [];

//         let amount = await items.reduce(async (acc, item) => {
//             const product = await Product.findById(item.product);

//             productData.push({
//                 name: product.name,
//                 price: product.offerPrice,
//                 quantity: item.quantity,
//             });

//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         amount += Math.floor(amount * 0.02);

//         // const order = await Order.create({
//         //     userId,
//         //     items,
//         //     amount,
//         //     address,
//         //     paymentType: "Online",
//         //     status: "Order Placed"
//         // });


//         let orderItems = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);

//             orderItems.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: product.offerPrice
//             });
//         }

//         // const order = await Order.create({
//         //     userId,
//         //     items: orderItems,
//         //     amount,
//         //     address,
//         //     paymentType: "Online",
//         //     status: "Order Placed"
//         // });


//         const deliveryCharge = 40;
//         const tax = Math.floor(amount * 0.02);
//         const finalAmount = amount + deliveryCharge + tax;

//         const order = await Order.create({
//             userId,
//             items: orderItems,
//             itemsTotal: amount,
//             deliveryCharge,
//             tax,
//             amount: finalAmount,
//             address,
//             paymentType: "Online",
//             status: "Order Placed"
//         });


//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = productData.map((item) => {
//             return {
//                 price_data: {
//                     currency: "usd",
//                     product_data: { name: item.name },
//                     unit_amount: Math.floor(item.price + item.price * 0.02) * 100
//                 },
//                 quantity: item.quantity,
//             }
//         })

//         const session = await stripeInstance.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${origin}/loader?next=my-orders`,
//             cancel_url: `${origin}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 userId,
//             }
//         })

//         return res.json({ success: true, url: session.url });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // STRIPE WEBHOOK
// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     switch (event.type) {

//         case "payment_intent.succeeded": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId, userId } = session.data[0].metadata;

//             await Order.findByIdAndUpdate(orderId, { isPaid: true })
//             await User.findByIdAndUpdate(userId, { cartItems: {} });

//             break;
//         }

//         case "payment_intent.payment_failed": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId } = session.data[0].metadata;

//             await Order.findByIdAndDelete(orderId);

//             break;
//         }

//         default:
//             console.log("Unhandled event");
//     }

//     response.json({ received: true });
// }


// // USER ORDERS
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // SELLER ORDERS
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // ⭐ STATUS UPDATE
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId, { status });

//         res.json({
//             success: true,
//             message: "Status updated"
//         })

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }































// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe"
// import User from "../models/User.js"

// // PLACE COD
// export const placeOrderCOD = async (req, res)=>{
//     try {
//         const { userId, items, address } = req.body;

//         if(!address || items.length === 0){
//             return res.json({success: false, message: "Invalid data"})
//         }

//         let amount = await items.reduce(async (acc, item)=>{
//             const product = await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         amount += Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed"
//         });

//         return res.json({success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // PLACE STRIPE
// export const placeOrderStripe = async (req, res)=>{
//     try {
//         const { userId, items, address } = req.body;
//         const {origin} = req.headers;

//         if(!address || items.length === 0){
//             return res.json({success: false, message: "Invalid data"})
//         }

//         let productData = [];

//         let amount = await items.reduce(async (acc, item)=>{
//             const product = await Product.findById(item.product);

//             productData.push({
//                 name: product.name,
//                 price: product.offerPrice,
//                 quantity: item.quantity,
//             });

//             return (await acc) + product.offerPrice * item.quantity;
//         }, 0)

//         amount += Math.floor(amount * 0.02);

//         const order =  await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "Online",
//             status: "Order Placed"
//         });

//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = productData.map((item)=>{
//             return {
//                 price_data: {
//                     currency: "usd",
//                     product_data:{ name: item.name },
//                     unit_amount: Math.floor(item.price + item.price * 0.02) * 100
//                 },
//                 quantity: item.quantity,
//             }
//         })

//         const session = await stripeInstance.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${origin}/loader?next=my-orders`,
//             cancel_url: `${origin}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 userId,
//             }
//         })

//         return res.json({success: true, url: session.url });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // STRIPE WEBHOOK
// export const stripeWebhooks = async (request, response)=>{
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     switch (event.type) {

//         case "payment_intent.succeeded":{
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId, userId } = session.data[0].metadata;

//             await Order.findByIdAndUpdate(orderId, {isPaid: true})
//             await User.findByIdAndUpdate(userId, {cartItems: {}});

//             break;
//         }

//         case "payment_intent.payment_failed":{
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId } = session.data[0].metadata;

//             await Order.findByIdAndDelete(orderId);

//             break;
//         }

//         default:
//             console.log("Unhandled event");
//     }

//     response.json({received: true});
// }


// // USER ORDERS
// export const getUserOrders = async (req, res)=>{
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         })
//         .populate("items.product address")
//         .sort({createdAt: -1});

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // SELLER ORDERS
// export const getAllOrders = async (req, res)=>{
//     try {
//         const orders = await Order.find({
//             $or: [{paymentType: "COD"}, {isPaid: true}]
//         })
//         .populate("items.product address")
//         .sort({createdAt: -1});

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // ⭐ STATUS UPDATE
// export const updateOrderStatus = async (req,res)=>{
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId,{status});

//         res.json({
//             success:true,
//             message:"Status updated"
//         })

//     } catch (error) {
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }






















// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe";
// import User from "../models/User.js";


// // ==============================
// // PLACE ORDER COD
// // ==============================
// export const placeOrderCOD = async (req, res) => {
//     try {
//         // const { userId, items, address } = req.body;
//         const { userId, items, address, coupon } = req.body;


//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);

//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });
//         }

//         // const deliveryCharge = 0;
//         // const tax = Math.floor(subtotal * 0.02);
//         // const discount = 0;
//         const deliveryCharge = subtotal < 100 ? 40 : 0;
//         const tax = 0;
//         let discount = 0;

//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;


//         await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax,
//             discount,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed"
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // PLACE ORDER STRIPE
// // ==============================
// export const placeOrderStripe = async (req, res) => {
//     try {
//         // const { userId, items, address } = req.body;
//         const { userId, items, address, coupon } = req.body;

//         const { origin } = req.headers;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let productData = [];
//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);

//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });

//             productData.push({
//                 name: product.name,
//                 price: price,
//                 quantity: item.quantity,
//             });
//         }

//         // const deliveryCharge = 0;
//         const deliveryCharge = subtotal < 100 ? 40 : 0;
//         const tax = 0;
//         let discount = 0;

//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;


//         const order = await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax,
//             discount,
//             amount,
//             address,
//             paymentType: "Online",
//             status: "Order Placed"
//         });

//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = productData.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: { name: item.name },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity,
//         }));

//         const session = await stripeInstance.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${origin}/loader?next=my-orders`,
//             cancel_url: `${origin}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 userId,
//             }
//         });

//         return res.json({ success: true, url: session.url });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // STRIPE WEBHOOK
// // ==============================
// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     switch (event.type) {

//         case "payment_intent.succeeded": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId, userId } = session.data[0].metadata;

//             await Order.findByIdAndUpdate(orderId, { isPaid: true })
//             await User.findByIdAndUpdate(userId, { cartItems: {} });

//             break;
//         }

//         case "payment_intent.payment_failed": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId } = session.data[0].metadata;

//             await Order.findByIdAndDelete(orderId);

//             break;
//         }

//         default:
//             console.log("Unhandled event");
//     }

//     response.json({ received: true });
// }



// // ==============================
// // USER ORDERS
// // ==============================
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // ALL ORDERS (ADMIN)
// // ==============================
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // UPDATE STATUS
// // ==============================
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId, { status });

//         res.json({
//             success: true,
//             message: "Status updated"
//         })

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }







































// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe";
// import User from "../models/User.js";


// // ==============================
// // PLACE ORDER COD
// // ==============================
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address, coupon } = req.body;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });
//         }

//         const deliveryCharge = subtotal < 100 ? 40 : 0;
//         const tax = 0;

//         let discount = 0;
//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;

//         await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax,
//             discount,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed"
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // PLACE ORDER STRIPE
// // ==============================
// export const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, address, coupon } = req.body;
//         const { origin } = req.headers;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let productData = [];
//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });

//             productData.push({
//                 name: product.name,
//                 price: price,
//                 quantity: item.quantity,
//             });
//         }

//         const deliveryCharge = subtotal < 100 ? 40 : 0;
//         const tax = 0;

//         let discount = 0;
//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;

//         const order = await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax,
//             discount,
//             amount,
//             address,
//             paymentType: "Online",
//             status: "Order Placed"
//         });

//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = productData.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: { name: item.name },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity,
//         }));

//         const session = await stripeInstance.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${origin}/loader?next=my-orders`,
//             cancel_url: `${origin}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 userId,
//             }
//         });

//         return res.json({ success: true, url: session.url });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // STRIPE WEBHOOK
// // ==============================
// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     switch (event.type) {

//         case "payment_intent.succeeded": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId, userId } = session.data[0].metadata;

//             await Order.findByIdAndUpdate(orderId, { isPaid: true })
//             await User.findByIdAndUpdate(userId, { cartItems: {} });

//             break;
//         }

//         case "payment_intent.payment_failed": {
//             const paymentIntent = event.data.object;
//             const paymentIntentId = paymentIntent.id;

//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             const { orderId } = session.data[0].metadata;

//             await Order.findByIdAndDelete(orderId);

//             break;
//         }

//         default:
//             console.log("Unhandled event");
//     }

//     response.json({ received: true });
// }



// // ==============================
// // USER ORDERS
// // ==============================
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // SELLER ORDERS
// // ==============================
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// // ==============================
// // UPDATE STATUS (ADMIN)
// // ==============================
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId, { status });

//         res.json({
//             success: true,
//             message: "Status updated"
//         })

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }



// // ==============================
// // CANCEL ORDER (5 MIN LIMIT)
// // ==============================
// export const cancelOrder = async (req, res)=>{
//     try {
//         const { orderId } = req.body;

//         const order = await Order.findById(orderId);
//         if(!order) return res.json({success:false, message:"Order not found"});

//         if(order.paymentType !== "COD"){
//             return res.json({success:false, message:"Only COD cancel allowed"});
//         }

//         if(order.status === "Delivered" || order.status === "Cancelled"){
//             return res.json({success:false, message:"Cannot cancel"});
//         }

//         const created = new Date(order.createdAt).getTime();
//         const now = Date.now();
//         const diff = now - created;

//         if(diff > 5 * 60 * 1000){
//             return res.json({
//                 success:false,
//                 message:"Cancel time expired (5 min)"
//             });
//         }

//         order.status = "Cancelled";
//         await order.save();

//         res.json({
//             success:true,
//             message:"Order cancelled"
//         });

//     } catch (error) {
//         res.json({success:false, message:error.message});
//     }
// }



















































// -------------------------with all strip----------------------------------------------------



// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe";
// import User from "../models/User.js";


// // ==============================
// // AUTO PACK AFTER 2 MIN
// // ==============================
// export const autoPackOrders = async () => {
//     try {
//         const fiveMinAgo = new Date(Date.now() - 2 * 60 * 1000);

//         await Order.updateMany(
//             {
//                 status: "Order Placed",
//                 createdAt: { $lte: fiveMinAgo }
//             },
//             { status: "Packed" }
//         );

//     } catch (error) {
//         console.log("Auto pack error:", error.message);
//     }
// };


// // ==============================
// // PLACE ORDER COD
// // ==============================
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address, coupon } = req.body;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });
//         }

//         const deliveryCharge = subtotal < 100 ? 40 : 0;

//         let discount = 0;
//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;

//         await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax:0,
//             discount,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed"
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // PLACE ORDER STRIPE
// // ==============================
// export const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, address, coupon } = req.body;
//         const { origin } = req.headers;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let subtotal = 0;
//         let itemsWithPrice = [];
//         let productData = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });

//             productData.push({
//                 name: product.name,
//                 price: price,
//                 quantity: item.quantity,
//             });
//         }

//         const deliveryCharge = subtotal < 100 ? 40 : 0;

//         let discount = 0;
//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;

//         const order = await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax:0,
//             discount,
//             amount,
//             address,
//             paymentType: "Online",
//             status: "Order Placed"
//         });

//         const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//         const line_items = productData.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: { name: item.name },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity,
//         }));

//         const session = await stripeInstance.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${origin}/loader?next=my-orders`,
//             cancel_url: `${origin}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 userId,
//             }
//         });

//         return res.json({ success: true, url: session.url });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // STRIPE WEBHOOK
// // ==============================
// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

//     // 🟢 PAYMENT SUCCESS
//     if (event.type === "checkout.session.completed") {

//         const session = event.data.object;
//         const { orderId, userId } = session.metadata;

//         await Order.findByIdAndUpdate(orderId, {
//             isPaid: true
//         });

//         await User.findByIdAndUpdate(userId, { cartItems: {} });
//     }

//     // 🔴 PAYMENT FAIL / EXPIRE
//     if (event.type === "checkout.session.expired") {

//         const session = event.data.object;
//         const { orderId } = session.metadata;

//         await Order.findByIdAndDelete(orderId);
//     }

//     response.json({ received: true });
// };



// // ==============================
// // USER ORDERS
// // ==============================
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // CANCEL ORDER
// // ==============================
// export const cancelOrder = async (req, res)=>{
//     try {
//         const { orderId } = req.body;

//         const order = await Order.findById(orderId);
//         if(!order) return res.json({success:false, message:"Order not found"});

//         if(order.paymentType !== "COD"){
//             return res.json({success:false, message:"Only COD cancel allowed"});
//         }

//         if(order.status !== "Order Placed"){
//             return res.json({success:false, message:"Cannot cancel"});
//         }

//         const created = new Date(order.createdAt).getTime();
//         const now = Date.now();

//         if(now - created > 2*60*1000){
//             return res.json({success:false, message:"Cancel time expired"});
//         }

//         order.status = "Cancelled";
//         await order.save();

//         res.json({success:true, message:"Order cancelled"});

//     } catch (error) {
//         res.json({success:false, message:error.message});
//     }
// }



// // ==============================
// // SELLER ORDERS (ADMIN)
// // ==============================
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//         .populate("items.product address")
//         .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };






// // ==============================
// // ADMIN STATUS UPDATE
// // ==============================
// export const updateOrderStatus = async (req, res)=>{
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId,{ status });

//         res.json({
//             success:true,
//             message:"Status updated"
//         });

//     } catch (error) {
//         res.json({
//             success:false,
//             message:error.message
//         });
//     }
// };








































// -------------------without strip --------------------------------



// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";


// // ==============================
// // AUTO PACK AFTER 2 MIN
// // ==============================
// export const autoPackOrders = async () => {
//     try {
//         const fiveMinAgo = new Date(Date.now() - 2 * 60 * 1000);

//         await Order.updateMany(
//             {
//                 status: "Order Placed",
//                 createdAt: { $lte: fiveMinAgo }
//             },
//             { status: "Packed" }
//         );

//     } catch (error) {
//         console.log("Auto pack error:", error.message);
//     }
// };


// // ==============================
// // PLACE ORDER COD
// // ==============================
// export const placeOrderCOD = async (req, res) => {
//     try {

//         // 🧩 Order not placed without location validation 👇
//         // if (
//         //     !req.body.location ||
//         //     typeof req.body.location.lat !== "number" ||
//         //     typeof req.body.location.lng !== "number"
//         // ) {
//         //     return res.json({
//         //         success: false,
//         //         message: "Valid delivery location required"
//         //     });
//         // }


//         // ✅ OPTIONAL location validation
//         const location = req.body.location;

//         if (location) {
//             if (
//                 typeof location.lat !== "number" ||
//                 typeof location.lng !== "number"
//             ) {
//                 return res.json({
//                     success: false,
//                     message: "Invalid delivery location"
//                 });
//             }
//         }


//         const { userId, items, address, coupon } = req.body;

//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" })
//         }

//         let subtotal = 0;
//         let itemsWithPrice = [];

//         for (const item of items) {
//             const product = await Product.findById(item.product);
//             const price = product.offerPrice;

//             subtotal += price * item.quantity;

//             itemsWithPrice.push({
//                 product: item.product,
//                 quantity: item.quantity,
//                 price: price
//             });
//         }

//         const deliveryCharge = subtotal < 100 ? 40 : 0;

//         let discount = 0;
//         if (coupon) {
//             if (coupon.toLowerCase() === "save10") {
//                 discount = Math.floor(subtotal * 0.10);
//             }
//             else if (coupon.toLowerCase() === "off50") {
//                 discount = 50;
//             }
//         }

//         const amount = subtotal + deliveryCharge - discount;

//         await Order.create({
//             userId,
//             items: itemsWithPrice,
//             subtotal,
//             deliveryCharge,
//             tax: 0,
//             discount,
//             amount,
//             address,
//             paymentType: "COD",
//             status: "Order Placed",

//             location: req.body.location,   // 👈 THIS LINE

//         });

//         return res.json({ success: true, message: "Order Placed Successfully" })

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // USER ORDERS
// // ==============================
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;

//         const orders = await Order.find({
//             userId,
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // CANCEL ORDER
// // ==============================
// export const cancelOrder = async (req, res) => {
//     try {
//         const { orderId } = req.body;

//         const order = await Order.findById(orderId);
//         if (!order) return res.json({ success: false, message: "Order not found" });

//         if (order.paymentType !== "COD") {
//             return res.json({ success: false, message: "Only COD cancel allowed" });
//         }

//         if (order.status !== "Order Placed") {
//             return res.json({ success: false, message: "Cannot cancel" });
//         }

//         const created = new Date(order.createdAt).getTime();
//         const now = Date.now();

//         if (now - created > 2 * 60 * 1000) {
//             return res.json({ success: false, message: "Cancel time expired" });
//         }

//         order.status = "Cancelled";
//         await order.save();

//         res.json({ success: true, message: "Order cancelled" });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }


// // ==============================
// // SELLER ORDERS (ADMIN)
// // ==============================
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         res.json({ success: true, orders });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };


// // ==============================
// // ADMIN STATUS UPDATE
// // ==============================
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;

//         await Order.findByIdAndUpdate(orderId, { status });

//         res.json({
//             success: true,
//             message: "Status updated"
//         });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };




































import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import razorpay from "../configs/razorpay.js";
import axios from "axios";
import Address from "../models/Address.js";
import {
    computeAuthorizedRedeem,
    pointsEarnedFromPurchase,
    applyRewardPointsChange,
    applyRewardPointsRefundOnCancel
} from "../utils/rewardPoints.js";
import {
    migrateLegacyRewardPoints,
    pruneExpiredGrants,
    sumGrants
} from "../utils/rewardGrants.js";
import { areStoreOrdersAccepted } from "../utils/storeOrdersGate.js";

/**
 * COD: points applied at order creation. UPI: only after payment (isPaid).
 * Unpaid UPI orders never had points deducted/earned on the user — skip refund.
 */
async function refundRewardPointsForCancelledOrder(order) {
    const redeem = Math.max(0, Math.floor(order.rewardPointsUsed || 0));
    const earned = pointsEarnedFromPurchase(order.amount);

    let applied = false;
    if (order.paymentType === "COD") applied = true;
    else if (order.paymentType === "UPI" && order.isPaid) applied = true;

    if (!applied || (redeem === 0 && earned === 0)) return null;

    return applyRewardPointsRefundOnCancel(User, order.userId, redeem, earned);
}


// ==============================
// AUTO PACK AFTER 2 MIN
// ==============================
export const autoPackOrders = async () => {
    try {
        const fiveMinAgo = new Date(Date.now() - 2 * 60 * 1000);

        await Order.updateMany(
            {
                status: "Order Placed",
                createdAt: { $lte: fiveMinAgo }
            },
            { status: "Packed" }
        );

    } catch (error) {
        console.log("Auto pack error:", error.message);
    }
};

const sendTelegramMessage = async (order) => {

    console.log("Telegram function called", order._id);

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const itemsList = order.items
        .map(i => `• ${i.quantity} x ${i.product?.name || "Product"}`)
        .join("\n");

    const address = order.address
        ? `${order.address.firstName || ""} ${order.address.lastName || ""}
${order.address.street || ""}
${order.address.city || ""}, ${order.address.state || ""}
Phone: ${order.address.phone || ""}`
        : "Address not available";

    const phone = order.address?.phone || "N/A";
    const customer = order.userId?.name || "Customer";

    let mapLink = "https://maps.google.com";

    if (order.location?.lat && order.location?.lng) {
        mapLink = `https://www.google.com/maps?q=${order.location.lat},${order.location.lng}`;
    }

    const message = `
🛒 New Order Received!

Order ID : ${order._id.toString().slice(-6)}
Order Amount : ₹${order.amount}
--------------------------------------
Order Items :
${itemsList}

--------------------------------------
Delivery Address :
${address}

📍Customer Location
${mapLink}
`;

    try {

        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message
            }
        );

        console.log("Telegram response:", response.data);

    } catch (error) {
        console.log("Telegram error:", error.response?.data || error.message);
    }

};

// ==============================
// PLACE ORDER COD
// ==============================
export const placeOrderCOD = async (req, res) => {
    try {

        // 🔥 USER ID FROM TOKEN (MOST IMPORTANT FIX)
        const userId = req.userId;

        if (!userId) {
            return res.json({
                success: false,
                message: "User not authorized"
            });
        }

        if (!(await areStoreOrdersAccepted())) {
            return res.json({
                success: false,
                message: "We're not taking new orders right now. Please check back soon."
            });
        }

        const { items, address: addressId, coupon, location, rewardPointsToRedeem: redeemRaw } = req.body;

        // ==============================
        // DUPLICATE ORDER PROTECTION
        // ==============================
        const lastOrder = await Order.findOne({
            userId,
            status: "Order Placed"
        }).sort({ createdAt: -1 });

        if (lastOrder) {

            const lastOrderTime = new Date(lastOrder.createdAt).getTime();
            const now = Date.now();

            if (now - lastOrderTime < 10000) {
                return res.json({
                    success: false,
                    message: "Order already placed. Please wait."
                });
            }
        }

        const addressDoc = await Address.findById(addressId);

        if (!addressDoc) {
            return res.json({
                success: false,
                message: "Address not found"
            });
        }

        const addressData = {
            firstName: addressDoc.firstName || "",
            lastName: addressDoc.lastName || "",
            street: addressDoc.street || "",
            city: addressDoc.city || "",
            state: addressDoc.state || "",
            phone: addressDoc.phone || ""
        };

        if (!addressId || !items || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid order data"
            });
        }

        // LOCATION VALIDATION (optional)
        if (location) {
            if (
                typeof location.lat !== "number" ||
                typeof location.lng !== "number"
            ) {
                return res.json({
                    success: false,
                    message: "Invalid delivery location"
                });
            }
        }

        let subtotal = 0;
        let itemsWithPrice = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({
                    success: false,
                    message: "Invalid or removed product in cart — refresh and try again"
                });
            }

            const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
            const price = product.offerPrice;
            subtotal += price * qty;

            itemsWithPrice.push({
                product: item.product,
                quantity: qty,
                price: price
            });
        }

        const deliveryCharge = subtotal < 100 ? 40 : 0;

        let discount = 0;
        if (coupon) {
            if (coupon.toLowerCase() === "save10") {
                discount = Math.floor(subtotal * 0.10);
            } else if (coupon.toLowerCase() === "off50") {
                discount = 50;
            }
        }

        const grossAmount = subtotal + deliveryCharge - discount;

        const userDoc = await User.findById(userId).select("rewardPoints rewardGrants");
        migrateLegacyRewardPoints(userDoc);
        const balance = sumGrants(pruneExpiredGrants(userDoc.rewardGrants || []));
        const redeem = computeAuthorizedRedeem(redeemRaw, balance, grossAmount);
        const finalAmount = grossAmount - redeem;
        const earned = pointsEarnedFromPurchase(finalAmount);

        const order = await Order.create({
            userId,
            items: itemsWithPrice,
            subtotal,
            deliveryCharge,
            tax: 0,
            discount,
            rewardPointsUsed: redeem,
            amount: finalAmount,
            address: addressData,
            paymentType: "COD",
            status: "Order Placed",
            location: location ?? null
        });

        const pointsAfter = await applyRewardPointsChange(User, userId, redeem, earned);

        if (!pointsAfter) {
            await Order.findByIdAndDelete(order._id);
            return res.json({
                success: false,
                message: "Could not apply reward points. Refresh and try again."
            });
        }

        const fullOrder = await Order.findById(order._id)
            .populate("items.product")
            .populate("userId")
            .lean();

        sendTelegramMessage(fullOrder);

        return res.json({
            success: true,
            message: "Order Placed Successfully",
            orderId: order._id,
            rewardPoints: pointsAfter.rewardPoints ?? 0,
            pointsEarned: earned
        });

    } catch (error) {
        console.log("ORDER ERROR:", error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// USER ORDERS
// ==============================
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// ==============================
// CANCEL ORDER
// ==============================
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId;

        const order = await Order.findById(orderId);

        if (!order)
            return res.json({ success: false, message: "Order not found" });

        // Security check
        if (order.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        if (order.status !== "Order Placed")
            return res.json({ success: false, message: "Cannot cancel now" });

        const created = new Date(order.createdAt).getTime();

        if (Date.now() - created > 2 * 60 * 1000)
            return res.json({ success: false, message: "Cancel window expired" });

        // ======================
        // COD ORDER
        // ======================
        if (order.paymentType === "COD") {
            order.status = "Cancelled";
            await order.save();

            const pts = await refundRewardPointsForCancelledOrder(order);

            return res.json({
                success: true,
                message: "Order cancelled",
                rewardPoints: pts?.rewardPoints
            });
        }

        // ======================
        // UPI — unpaid (no payment captured yet)
        // ======================
        if (order.paymentType === "UPI" && !order.isPaid) {
            order.status = "Cancelled";
            order.paymentStatus = "Failed";
            await order.save();

            return res.json({
                success: true,
                message: "Order cancelled"
            });
        }

        // ======================
        // UPI / ONLINE — paid: Razorpay refund + reward points reversal
        // ======================

        if (!order.razorpayPaymentId)
            return res.json({
                success: false,
                message: "Payment not found for refund"
            });

        // 🔥 Trigger Razorpay Refund
        const refund = await razorpay.payments.refund(
            order.razorpayPaymentId
        );

        order.status = "Cancelled";
        order.paymentStatus = "Refund Initiated";
        order.refundId = refund.id;

        await order.save();

        const pts = await refundRewardPointsForCancelledOrder(order);

        return res.json({
            success: true,
            message: "Refund initiated",
            rewardPoints: pts?.rewardPoints
        });

    } catch (error) {
        console.log("Cancel error:", error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};

// ==============================
// SELLER ORDERS
// ==============================
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ==============================
// Leaderboard: one pipeline for seller + public (same month, same rules; only limit differs)
// ==============================
const parseCalendarYearMonthFromQuery = (req) => {
    const now = new Date();
    let y = Number(req?.query?.year);
    let m = Number(req?.query?.month);
    if (!Number.isFinite(y) || y < 2000 || y > 2100) {
        y = now.getFullYear();
    }
    if (!Number.isFinite(m) || m < 1 || m > 12) {
        m = now.getMonth() + 1;
    }
    return { y, m };
};

const aggregateTopCustomersLeaderboardForMonth = async (y, m, limit) => {
    const monthStart = new Date(y, m - 1, 1, 0, 0, 0, 0);
    const monthEnd = new Date(y, m, 0, 23, 59, 59, 999);
    const monthLabel = monthStart.toLocaleString("en-IN", { month: "long", year: "numeric" });

    const rows = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: monthStart, $lte: monthEnd },
                $or: [{ paymentType: "COD" }, { isPaid: true }],
                status: { $nin: ["Cancelled", "Canceled"] }
            }
        },
        {
            $group: {
                _id: "$userId",
                orderCount: { $sum: 1 },
                totalSpent: { $sum: "$amount" }
            }
        },
        { $sort: { totalSpent: -1, orderCount: -1 } },
        { $limit: limit },
        {
            $lookup: {
                from: User.collection.name,
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                _id: 0,
                userId: "$_id",
                orderCount: 1,
                totalSpent: 1,
                name: { $ifNull: ["$user.name", "Customer"] },
                phone: "$user.phone",
                email: "$user.email",
                profileImage: { $ifNull: ["$user.profileImage", ""] }
            }
        }
    ]);

    return { rows, monthLabel, y, m };
};

// ==============================
// SELLER: top customers by spend in a calendar month (server local TZ)
// GET /api/order/seller/top-customers-month?year=2026&month=4  (month 1–12, optional)
// ==============================
export const getTopLoyalCustomersMonth = async (req, res) => {
    try {
        const { y, m } = parseCalendarYearMonthFromQuery(req);
        const { rows, monthLabel, y: yy, m: mm } = await aggregateTopCustomersLeaderboardForMonth(y, m, 5);

        return res.json({
            success: true,
            monthLabel,
            year: yy,
            month: mm,
            customers: rows
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ==============================
// PUBLIC: top 3 buyers this calendar month (same rules as seller top-customers-month; masked email)
// GET /api/order/public/top-buyers?year=&month=  (optional; default current month, server local TZ)
// ==============================
const maskEmailForPublic = (email) => {
    if (!email || typeof email !== "string") {
        return "me***@shopper";
    }
    const trimmed = email.trim();
    const at = trimmed.indexOf("@");
    if (at <= 0) {
        return "me***@shopper";
    }
    const local = trimmed.slice(0, at);
    const domain = trimmed.slice(at + 1).trim();
    if (!domain) {
        return "me***@shopper";
    }
    let maskedLocal;
    if (local.length <= 1) {
        maskedLocal = `${local || "x"}***`;
    } else if (local.length === 2) {
        maskedLocal = `${local[0]}***`;
    } else {
        maskedLocal = `${local[0]}***${local[local.length - 1]}`;
    }
    return `${maskedLocal}@${domain}`;
};

export const getPublicTopBuyers = async (req, res) => {
    try {
        const { y, m } = parseCalendarYearMonthFromQuery(req);
        const { rows, monthLabel, y: yy, m: mm } = await aggregateTopCustomersLeaderboardForMonth(y, m, 3);

        const buyers = rows.map((r) => ({
            orderCount: r.orderCount,
            totalSpent: r.totalSpent,
            name: String(r.name || "").trim() || "Customer",
            maskedEmail: maskEmailForPublic(r.email),
            profileImage: String(r.profileImage || "").trim() || ""
        }));

        return res.json({
            success: true,
            buyers,
            monthLabel,
            year: yy,
            month: mm
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};


// ==============================
// ADMIN STATUS UPDATE
// ==============================
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        // =========================
        // IF SELLER CANCELS ORDER
        // =========================
        if (status === "Cancelled" || status === "Canceled") {

            // COD ORDER
            if (order.paymentType === "COD") {
                order.status = "Cancelled";
                await order.save();

                const pts = await refundRewardPointsForCancelledOrder(order);

                return res.json({
                    success: true,
                    message: "Order cancelled",
                    rewardPoints: pts?.rewardPoints
                });
            }

            // ONLINE / UPI ORDER
            if (order.paymentType !== "COD") {

                if (!order.isPaid) {
                    order.status = "Cancelled";
                    order.paymentStatus = "Failed";
                    await order.save();

                    return res.json({
                        success: true,
                        message: "Order cancelled"
                    });
                }

                if (!order.razorpayPaymentId) {
                    return res.json({
                        success: false,
                        message: "Payment ID missing"
                    });
                }

                // 🔥 Trigger Razorpay Refund
                const refund = await razorpay.payments.refund(
                    order.razorpayPaymentId
                );

                order.status = "Cancelled";
                order.paymentStatus = "Refund Initiated";
                order.refundId = refund.id;

                await order.save();

                const pts = await refundRewardPointsForCancelledOrder(order);

                return res.json({
                    success: true,
                    message: "Refund initiated",
                    rewardPoints: pts?.rewardPoints
                });
            }
        }

        // =========================
        // NORMAL STATUS UPDATE
        // =========================
        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: "Status updated"
        });

    } catch (error) {
        console.log("Status update error:", error);
        res.json({
            success: false,
            message: error.message
        });
    }
};