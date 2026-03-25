import {
  migrateLegacyRewardPoints,
  pruneExpiredGrants,
  sumGrants,
  deductFromGrants,
  createOrderGrant
} from "./rewardGrants.js";

/** Every ₹50 spent (after discounts & redeem) earns 1 point. e.g. ₹287 → 5 pts */
export function pointsEarnedFromPurchase(paidRupees) {
  const n = Math.floor(Number(paidRupees) || 0);
  return Math.floor(n / 50);
}

export function parseRedeemPoints(raw) {
  const n = Math.floor(Number(raw) || 0);
  return Math.max(0, n);
}

/**
 * Ignore client tampering: cap redeem using server balance + gross payable only.
 * Client cannot redeem more than min(balance, order total).
 */
export function computeAuthorizedRedeem(redeemRaw, balance, grossAmount) {
  let redeem = parseRedeemPoints(redeemRaw);
  const b = Math.max(0, Math.floor(Number(balance) || 0));
  const gross = Math.max(0, Number(grossAmount) || 0);
  redeem = Math.min(redeem, b, gross);
  return redeem;
}

/**
 * Apply redeem + order-earned points using rewardGrants (expiry: admin 10d, order 365d).
 * Uses optimistic concurrency (__v). Returns { rewardPoints } or null if insufficient.
 * @param {{ clearCart?: boolean }} options — clear server cart (UPI verify)
 */
export async function applyRewardPointsChange(UserModel, userId, redeem, earned, options = {}) {
  const r = Math.max(0, Math.floor(Number(redeem) || 0));
  const e = Math.max(0, Math.floor(Number(earned) || 0));

  if (r === 0 && e === 0 && !options.clearCart) {
    const u = await UserModel.findById(userId).select("rewardPoints").lean();
    return u;
  }

  if (r === 0 && e === 0 && options.clearCart) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $set: { cartItems: {} } },
      { new: true }
    )
      .select("rewardPoints")
      .lean();
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await UserModel.findById(userId);
    if (!user) return null;

    migrateLegacyRewardPoints(user);
    let grants = pruneExpiredGrants(user.rewardGrants || []);
    const balance = sumGrants(grants);

    if (r > balance) return null;

    grants = deductFromGrants(grants, r);
    if (e > 0) {
      grants.push(createOrderGrant(e));
    }

    const total = sumGrants(grants);
    const v = user.__v ?? 0;

    const setDoc = {
      rewardGrants: grants,
      rewardPoints: total
    };
    if (options.clearCart) {
      setDoc.cartItems = {};
    }

    const updated = await UserModel.findOneAndUpdate(
      { _id: userId, __v: v },
      { $set: setDoc, $inc: { __v: 1 } },
      { new: true }
    )
      .select("rewardPoints")
      .lean();

    if (updated) return updated;
  }

  return null;
}

/**
 * Reverse reward effect when an order is cancelled: remove points earned on that order
 * and refund points the user had redeemed (1 point = ₹1).
 */
export async function applyRewardPointsRefundOnCancel(UserModel, userId, redeem, earned) {
  const r = Math.max(0, Math.floor(Number(redeem) || 0));
  const e = Math.max(0, Math.floor(Number(earned) || 0));

  if (r === 0 && e === 0) {
    const u = await UserModel.findById(userId).select("rewardPoints").lean();
    return u;
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await UserModel.findById(userId);
    if (!user) return null;

    migrateLegacyRewardPoints(user);
    let grants = pruneExpiredGrants(user.rewardGrants || []);

    const totalAvail = sumGrants(grants);
    const eRemove = Math.min(e, totalAvail);
    grants = deductFromGrants(grants, eRemove);

    if (r > 0) {
      grants.push(createOrderGrant(r));
    }

    const total = sumGrants(grants);
    const v = user.__v ?? 0;

    const updated = await UserModel.findOneAndUpdate(
      { _id: userId, __v: v },
      { $set: { rewardGrants: grants, rewardPoints: total }, $inc: { __v: 1 } },
      { new: true }
    )
      .select("rewardPoints")
      .lean();

    if (updated) return updated;
  }

  return null;
}
