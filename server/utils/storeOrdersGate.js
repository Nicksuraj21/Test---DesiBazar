import StoreSettings from "../models/StoreSettings.js";

/** Single-row store config: missing doc = accept orders (backward compatible). */
export async function areStoreOrdersAccepted() {
  try {
    const doc = await StoreSettings.findOne().lean();
    if (!doc) return true;
    return doc.acceptingOrders !== false;
  } catch {
    return true;
  }
}
