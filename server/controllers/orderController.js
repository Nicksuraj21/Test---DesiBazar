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

        const { items, address, coupon, location } = req.body;

        if (!address || !items || items.length === 0) {
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
            if (!product) continue;

            const price = product.offerPrice;
            subtotal += price * item.quantity;

            itemsWithPrice.push({
                product: item.product,
                quantity: item.quantity,
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

        const amount = subtotal + deliveryCharge - discount;

        await Order.create({
            userId,   // 🔥 FIXED HERE
            items: itemsWithPrice,
            subtotal,
            deliveryCharge,
            tax: 0,
            discount,
            amount,
            address,
            paymentType: "COD",
            status: "Order Placed",
            location: location || null
        });

        return res.json({
            success: true,
            message: "Order Placed Successfully"
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
            .populate("items.product address")
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

            return res.json({
                success: true,
                message: "Order cancelled"
            });
        }

        // ======================
        // UPI / ONLINE PAYMENT
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

        return res.json({
            success: true,
            message: "Refund initiated"
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
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
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

                return res.json({
                    success: true,
                    message: "Order cancelled"
                });
            }

            // ONLINE / UPI ORDER
            if (order.paymentType !== "COD") {

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

                return res.json({
                    success: true,
                    message: "Refund initiated"
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