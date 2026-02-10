// import express from 'express';
// import { upload } from '../configs/multer.js';
// import authSeller from '../middlewares/authSeller.js';
// import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

// const productRouter = express.Router();

// productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
// productRouter.get('/list', productList)
// productRouter.get('/id', productById)
// productRouter.post('/stock', authSeller, changeStock)

// export default productRouter;
















// import express from 'express';
// import { upload } from '../configs/multer.js';
// import authSeller from '../middlewares/authSeller.js';

// import {
//   addProduct,
//   changeStock,
//   productById,
//   productList,
//   deleteProduct
// } from '../controllers/productController.js';

// const productRouter = express.Router();

// productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
// productRouter.get('/list', productList);
// productRouter.post('/id', productById);
// productRouter.post('/stock', authSeller, changeStock);

// // 🗑️ DELETE PRODUCT
// productRouter.post('/delete', authSeller, deleteProduct);

// export default productRouter;















// import express from 'express';
// import { upload } from '../configs/multer.js';
// import authSeller from '../middlewares/authSeller.js';

// import {
//   addProduct,
//   changeStock,
//   productById,
//   productList,
//   deleteProduct,
//   updatePrice
// } from '../controllers/productController.js';

// const productRouter = express.Router();

// productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
// productRouter.get('/list', productList);
// productRouter.post('/id', productById);
// productRouter.post('/stock', authSeller, changeStock);
// productRouter.post('/delete', authSeller, deleteProduct);

// // 🔴 PRICE UPDATE ROUTE
// productRouter.post('/update-price', authSeller, updatePrice);

// export default productRouter;




























import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';

import {
  addProduct,
  changeStock,
  productById,
  productList,
  deleteProduct,
  updatePrice,
  toggleBestSeller
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.post('/id', productById);
productRouter.post('/stock', authSeller, changeStock);
productRouter.post('/delete', authSeller, deleteProduct);
productRouter.post('/update-price', authSeller, updatePrice);

// 🔴 BEST SELLER
productRouter.post('/best-seller', authSeller, toggleBestSeller);

export default productRouter;

