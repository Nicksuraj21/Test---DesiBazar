import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  createUpiOrder,
  verifyUpiPayment
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-upi-order", authUser, createUpiOrder);
paymentRouter.post("/verify-upi", authUser, verifyUpiPayment);

export default paymentRouter;
