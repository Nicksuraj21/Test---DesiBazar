// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// // Allow multiple origins
// const allowedOrigins = ['http://localhost:5173', '']

// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// // Middleware configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}));


// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter)
// app.use('/api/seller', sellerRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })


































// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks, autoPackOrders } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// const allowedOrigins = ['http://localhost:5173', '']

// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}));

// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter)
// app.use('/api/seller', sellerRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })


// // 🔥 AUTO PACK EVERY 1 MIN
// setInterval(()=>{
//     autoPackOrders()
// }, 60000)

















// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks, autoPackOrders } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB();
// await connectCloudinary();

// const allowedOrigins = ['http://localhost:5173'];

// // ==============================
// // 🔥 STRIPE WEBHOOK (IMPORTANT)
// // MUST BE BEFORE express.json()
// // ==============================
// app.post(
//   '/api/webhook',
//   express.raw({ type: 'application/json' }),
//   stripeWebhooks
// );

// // ==============================
// // MIDDLEWARE
// // ==============================
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// // ==============================
// // ROUTES
// // ==============================
// app.get('/', (req, res) => res.send("API is Working"));

// app.use('/api/user', userRouter);
// app.use('/api/seller', sellerRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/address', addressRouter);
// app.use('/api/order', orderRouter);

// // ==============================
// // SERVER START
// // ==============================
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// // ==============================
// // 🔥 AUTO PACK EVERY 1 MIN
// // ==============================
// setInterval(() => {
//   autoPackOrders();
// }, 60000);
















// --------------✅ FIXED server.js (Stripe Removed Only)-------------------


// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { autoPackOrders } from './controllers/orderController.js';


// import paymentRouter from './routes/paymentRoute.js';

// // routes section me add karo
// app.use('/api/payment', paymentRouter);


// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB();
// await connectCloudinary();

// const allowedOrigins = ['http://localhost:5173'];

// // ==============================
// // MIDDLEWARE
// // ==============================
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// // ==============================
// // ROUTES
// // ==============================
// app.get('/', (req, res) => res.send("API is Working"));

// app.use('/api/user', userRouter);
// app.use('/api/seller', sellerRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/address', addressRouter);
// app.use('/api/order', orderRouter);

// // ==============================
// // SERVER START
// // ==============================
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// // ==============================
// // 🔥 AUTO PACK EVERY 1 MIN
// // ==============================
// setInterval(() => {
//   autoPackOrders();
// }, 60000);
















import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';

import { autoPackOrders } from './controllers/orderController.js';


// ✅ APP INIT — MUST BE FIRST
const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

const allowedOrigins = [
  'http://localhost:5173',
  'https://test-desibazar-frontend.onrender.com',
  'https://desibazar.online',
  'https://www.desibazar.online'
];


// ==============================
// MIDDLEWARE
// ==============================
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// ==============================
// ROUTES
// ==============================
app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter); // ✅ NOW CORRECT PLACE

// ==============================
// SERVER START
// ==============================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// ==============================
// 🔥 AUTO PACK EVERY 1 MIN
// ==============================
setInterval(() => {
  autoPackOrders();
}, 60000);
