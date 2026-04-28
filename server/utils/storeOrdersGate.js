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

/** Missing field / doc = COD allowed (backward compatible). */
export async function isStoreCodEnabled() {
  try {
    const doc = await StoreSettings.findOne().lean();
    if (!doc) return true;
    return doc.codEnabled !== false;
  } catch {
    return true;
  }
}
