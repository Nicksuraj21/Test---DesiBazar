import StoreSettings from "../models/StoreSettings.js";
import Order from "../models/Order.js";

/** Lower bound for Store UPI totals (IST calendar day 00:00). Env: STORE_UPI_STATS_SINCE=YYYY-MM-DD */
function getUpiStatsSinceDate() {
  const raw = process.env.STORE_UPI_STATS_SINCE;
  if (raw != null && String(raw).trim() !== "") {
    const s = String(raw).trim();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) {
      return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00+05:30`);
    }
    const d = new Date(s);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // 25 April ke baad = 26 April 2026 00:00 IST se
  return new Date("2026-04-26T00:00:00+05:30");
}

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

    const upiStatsSince = getUpiStatsSinceDate();

    // Paid UPI from cutoff (default: after 25 Apr 2026 IST) — cancel/refund excluded (not Delivered-only)
    const upiRows = await Order.aggregate([
      {
        $match: {
          paymentType: "UPI",
          isPaid: true,
          status: { $nin: ["Cancelled", "Canceled"] },
          paymentStatus: { $nin: ["Refund Initiated", "Refunded"] },
          createdAt: { $gte: upiStatsSince },
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
    const totalAmount = Math.round(upi.amount || 0);
    const totalOrders = upi.orders || 0;

    return res.json({
      success: true,
      acceptingOrders,
      codEnabled,
      totalUpiPaidAmount: totalAmount,
      totalUpiPaidOrders: totalOrders,
      upiStatsSince: upiStatsSince.toISOString(),
      // legacy keys (same values) — older clients
      currentMonthUpiPaidAmount: totalAmount,
      currentMonthUpiPaidOrders: totalOrders,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// PUT /api/seller/store-settings  body: { acceptingOrders: boolean } — COD only via /api/admin/store-settings
export const putSellerStoreSettings = async (req, res) => {
  try {
    const { acceptingOrders } = req.body;
    if (typeof acceptingOrders !== "boolean") {
      return res.json({
        success: false,
        message: "Send acceptingOrders (boolean)",
      });
    }

    let doc = await StoreSettings.findOne();
    if (!doc) {
      doc = await StoreSettings.create({});
    }
    doc.acceptingOrders = acceptingOrders;
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

// GET /api/admin/store-settings (admin auth) — same payload as seller for UPI snapshot + flags
export const getAdminStoreSettings = getSellerStoreSettings;

// PUT /api/admin/store-settings  body: { codEnabled: boolean }
export const putAdminStoreSettings = async (req, res) => {
  try {
    const { codEnabled } = req.body;
    if (typeof codEnabled !== "boolean") {
      return res.json({
        success: false,
        message: "Send codEnabled (boolean)",
      });
    }

    let doc = await StoreSettings.findOne();
    if (!doc) {
      doc = await StoreSettings.create({});
    }
    doc.codEnabled = codEnabled;
    await doc.save();

    return res.json({
      success: true,
      codEnabled: doc.codEnabled !== false,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// GET /api/admin/upi-order-history?limit=100 — same UPI filters as store summary (admin auth)
export const getAdminUpiOrderHistory = async (req, res) => {
  try {
    const raw = req.query?.limit;
    const n = raw != null && raw !== "" ? parseInt(String(raw), 10) : 100;
    const limit = Number.isFinite(n) ? Math.min(500, Math.max(1, n)) : 100;
    const since = getUpiStatsSinceDate();

    const orders = await Order.find({
      paymentType: "UPI",
      isPaid: true,
      status: { $nin: ["Cancelled", "Canceled"] },
      paymentStatus: { $nin: ["Refund Initiated", "Refunded"] },
      createdAt: { $gte: since },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("userId", "name email phone")
      .populate("items.product", "name offerPrice price image")
      .lean();

    return res.json({
      success: true,
      orders,
      count: orders.length,
      limit,
      upiStatsSince: since.toISOString(),
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
