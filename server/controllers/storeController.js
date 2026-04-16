import StoreSettings from "../models/StoreSettings.js";

// GET /api/store/accepting-orders (public)
export const getAcceptingOrdersPublic = async (req, res) => {
  try {
    const doc = await StoreSettings.findOne().lean();
    const acceptingOrders = doc ? doc.acceptingOrders !== false : true;
    return res.json({ success: true, acceptingOrders });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// GET /api/seller/store-settings (seller auth)
export const getSellerStoreSettings = async (req, res) => {
  try {
    const doc = await StoreSettings.findOne().lean();
    const acceptingOrders = doc ? doc.acceptingOrders !== false : true;
    return res.json({ success: true, acceptingOrders });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// PUT /api/seller/store-settings  body: { acceptingOrders: boolean }
export const putSellerStoreSettings = async (req, res) => {
  try {
    const { acceptingOrders } = req.body;
    if (typeof acceptingOrders !== "boolean") {
      return res.json({
        success: false,
        message: "acceptingOrders (boolean) is required",
      });
    }

    let doc = await StoreSettings.findOne();
    if (!doc) {
      doc = await StoreSettings.create({ acceptingOrders });
    } else {
      doc.acceptingOrders = acceptingOrders;
      await doc.save();
    }

    return res.json({ success: true, acceptingOrders: doc.acceptingOrders });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
