import express from "express";
import authSeller from "../middlewares/authSeller.js";
import { generateInstagramPostImage, generateMarketing } from "../controllers/marketingController.js";

const marketingRouter = express.Router();

// Seller-only endpoint
marketingRouter.post("/generate", authSeller, generateMarketing);
marketingRouter.post(
  "/generate-instagram-post-image",
  authSeller,
  generateInstagramPostImage
);

export default marketingRouter;

