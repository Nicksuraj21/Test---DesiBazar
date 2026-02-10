// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
// import authSeller from '../middlewares/authSeller.js';

// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)

// export default orderRouter;




// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import authSeller from '../middlewares/authSeller.js';

// import { 
//   getAllOrders, 
//   getUserOrders, 
//   placeOrderCOD, 
//   placeOrderStripe,
//   updateOrderStatus
// } from '../controllers/orderController.js';

// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)

// // ⭐ NEW ROUTE
// orderRouter.post('/status', authSeller, updateOrderStatus)

// export default orderRouter;









// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import authSeller from '../middlewares/authSeller.js';

// import { 
//   getAllOrders, 
//   getUserOrders, 
//   placeOrderCOD, 
//   placeOrderStripe,
//   updateOrderStatus,
//   cancelOrder
// } from '../controllers/orderController.js';

// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)
// orderRouter.post('/status', authSeller, updateOrderStatus)

// // ⭐ CANCEL
// orderRouter.post('/cancel', authUser, cancelOrder)

// export default orderRouter;












// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import authSeller from '../middlewares/authSeller.js';

// import {
//   getAllOrders,
//   getUserOrders,
//   placeOrderCOD,
//   placeOrderStripe,
//   cancelOrder,
//   updateOrderStatus
// } from '../controllers/orderController.js';

// // ADMIN STATUS UPDATE
// orderRouter.post('/status', authSeller, updateOrderStatus)



// const orderRouter = express.Router();

// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)

// orderRouter.post('/cancel', authUser, cancelOrder)

// export default orderRouter;


















// import express from 'express';
// import authUser from '../middlewares/authUser.js';
// import authSeller from '../middlewares/authSeller.js';

// import {
//   getAllOrders,
//   getUserOrders,
//   placeOrderCOD,
//   placeOrderStripe,
//   cancelOrder,
//   updateOrderStatus
// } from '../controllers/orderController.js';

// const orderRouter = express.Router();


// // USER ROUTES
// orderRouter.post('/cod', authUser, placeOrderCOD)
// orderRouter.get('/user', authUser, getUserOrders)
// orderRouter.post('/stripe', authUser, placeOrderStripe)
// orderRouter.post('/cancel', authUser, cancelOrder)


// // ADMIN ROUTES
// orderRouter.get('/seller', authSeller, getAllOrders)
// orderRouter.post('/status', authSeller, updateOrderStatus)


// export default orderRouter;












// -----------------✅ FIXED routes/orderRoute.js (Stripe Removed Only)----------


import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  cancelOrder,
  updateOrderStatus
} from '../controllers/orderController.js';

const orderRouter = express.Router();


// USER ROUTES
orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
// ❌ stripe route removed
orderRouter.post('/cancel', authUser, cancelOrder)


// ADMIN ROUTES
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/status', authSeller, updateOrderStatus)

export default orderRouter;
