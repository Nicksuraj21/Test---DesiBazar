import express from "express";
import { getAcceptingOrdersPublic } from "../controllers/storeController.js";

const storeRouter = express.Router();

storeRouter.get("/accepting-orders", getAcceptingOrdersPublic);

export default storeRouter;
