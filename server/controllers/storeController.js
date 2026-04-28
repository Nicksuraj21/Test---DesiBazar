import StoreSettings from "../models/StoreSettings.js";
import Order from "../models/Order.js";

// GET /api/store/accepting-orders (public)
export const getAcceptingOrdersPublic = async (req, res) => {
  try {
    const doc = await StoreSettings.findOne().lean();
    const acceptingOrders = doc ? doc.acceptingOrders !== false : true;
    const codEnabled = doc ? doc.codEnabled !== false : true;
    return res.json({ success: true, acceptingOrders, codEnabled });
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
    const codEnabled = doc ? doc.codEnabled !== false : true;

    // Paid UPI from today's start (IST) to now
    const dayParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const dayMap = {};
    for (const p of dayParts) {
      if (p.type !== "literal") dayMap[p.type] = p.value;
    }
    const dayStart = new Date(
      `${dayMap.year}-${dayMap.month}-${dayMap.day}T00:00:00+05:30`
    );
    const now = new Date();

    const upiRows = await Order.aggregate([
      {
        $match: {
          paymentType: "UPI",
          isPaid: true,
          // Do not count cancelled/refunding/refunded orders in today's seller total
          status: { $nin: ["Cancelled", "Canceled"] },
          paymentStatus: { $nin: ["Refund Initiated", "Refunded"] },
          createdAt: { $gte: dayStart, $lte: now },
        },
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" },
          orders: { $sum: 1 },
        },
      },
    ]);
    const upi = upiRows[0] || { amount: 0, orders: 0 };

    return res.json({
      success: true,
      acceptingOrders,
      codEnabled,
      currentMonthUpiPaidAmount: Math.round(upi.amount || 0),
      currentMonthUpiPaidOrders: upi.orders || 0,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// PUT /api/seller/store-settings  body: { acceptingOrders?: boolean, codEnabled?: boolean }
export const putSellerStoreSettings = async (req, res) => {
  try {
    const { acceptingOrders, codEnabled } = req.body;
    if (typeof acceptingOrders !== "boolean" && typeof codEnabled !== "boolean") {
      return res.json({
        success: false,
        message: "Send acceptingOrders and/or codEnabled (boolean)",
      });
    }

    let doc = await StoreSettings.findOne();
    if (!doc) {
      doc = await StoreSettings.create({});
    }
    if (typeof acceptingOrders === "boolean") {
      doc.acceptingOrders = acceptingOrders;
    }
    if (typeof codEnabled === "boolean") {
      doc.codEnabled = codEnabled;
    }
    await doc.save();

    return res.json({
      success: true,
      acceptingOrders: doc.acceptingOrders !== false,
      codEnabled: doc.codEnabled !== false,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
