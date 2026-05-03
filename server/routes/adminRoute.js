import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import { adminLogin, adminLogout, adminIsAuth } from "../controllers/adminController.js";
import { updateOrderStatus } from "../controllers/orderController.js";
import {
  getAdminStoreSettings,
  putAdminStoreSettings,
  getAdminUpiOrderHistory,
} from "../controllers/storeController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/is-auth", authAdmin, adminIsAuth);
adminRouter.get("/logout", adminLogout);
adminRouter.get("/store-settings", authAdmin, getAdminStoreSettings);
adminRouter.put("/store-settings", authAdmin, putAdminStoreSettings);
adminRouter.get("/upi-order-history", authAdmin, getAdminUpiOrderHistory);
adminRouter.post("/order-status", authAdmin, updateOrderStatus);

export default adminRouter;
