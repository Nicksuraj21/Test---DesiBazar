import mongoose from "mongoose";

const storeSettingsSchema = new mongoose.Schema(
  {
    /** When false, customers cannot place new orders (COD / UPI). */
    acceptingOrders: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const StoreSettings =
  mongoose.models.StoreSettings ||
  mongoose.model("StoreSettings", storeSettingsSchema);

export default StoreSettings;
