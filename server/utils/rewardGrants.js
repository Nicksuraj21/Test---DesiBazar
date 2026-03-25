import crypto from "crypto";

export const MS_PER_DAY = 86400000;
/** Points added from admin panel */
export const ADMIN_REWARD_GRANT_DAYS = 10;
/** Points earned from orders */
export const ORDER_REWARD_GRANT_DAYS = 365;

function toPlainGrant(g) {
  return {
    amount: Math.floor(Number(g.amount) || 0),
    source: g.source,
    adminBatchId: g.adminBatchId,
    expiresAt: g.expiresAt instanceof Date ? g.expiresAt : new Date(g.expiresAt),
    createdAt: g.createdAt ? (g.createdAt instanceof Date ? g.createdAt : new Date(g.createdAt)) : new Date()
  };
}

export function createAdminGrant(amount, adminBatchId) {
  const a = Math.max(0, Math.floor(Number(amount) || 0));
  const expiresAt = new Date(Date.now() + ADMIN_REWARD_GRANT_DAYS * MS_PER_DAY);
  return {
    amount: a,
    source: "admin",
    adminBatchId,
    expiresAt,
    createdAt: new Date()
  };
}

export function createOrderGrant(amount) {
  const a = Math.max(0, Math.floor(Number(amount) || 0));
  const expiresAt = new Date(Date.now() + ORDER_REWARD_GRANT_DAYS * MS_PER_DAY);
  return {
    amount: a,
    source: "order",
    expiresAt,
    createdAt: new Date()
  };
}

export function pruneExpiredGrants(grants) {
  if (!Array.isArray(grants) || grants.length === 0) return [];
  const now = new Date();
  return grants
    .map(toPlainGrant)
    .filter((g) => g.amount > 0 && g.expiresAt > now);
}

export function sumGrants(grants) {
  if (!Array.isArray(grants)) return 0;
  return grants.reduce((s, g) => s + Math.max(0, Math.floor(Number(g.amount) || 0)), 0);
}

/**
 * Older users had only rewardPoints number — migrate once to a single order-sourced grant (1 year).
 */
export function migrateLegacyRewardPoints(user) {
  const pts = Math.max(0, Math.floor(Number(user.rewardPoints) || 0));
  const hasGrants = user.rewardGrants && user.rewardGrants.length > 0;
  if (!hasGrants && pts > 0) {
    user.rewardGrants = [createOrderGrant(pts)];
  }
}

/**
 * Deduct points from grants — soonest-expiring first (FIFO by expiry).
 */
export function deductFromGrants(grants, redeem) {
  const r = Math.max(0, Math.floor(Number(redeem) || 0));
  if (r === 0) return pruneExpiredGrants(grants);

  const active = pruneExpiredGrants(grants);
  active.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));

  let left = r;
  const result = [];

  for (const g of active) {
    const amt = Math.max(0, Math.floor(Number(g.amount) || 0));
    if (left <= 0) {
      result.push({ ...g });
      continue;
    }
    const take = Math.min(amt, left);
    left -= take;
    const rem = amt - take;
    if (rem > 0) {
      result.push({
        ...g,
        amount: rem
      });
    }
  }

  return result.filter((g) => g.amount > 0);
}

/**
 * Sync legacy field rewardPoints to sum of active grants (after prune).
 */
export function syncRewardPointsField(user) {
  const pruned = pruneExpiredGrants(user.rewardGrants || []);
  user.rewardGrants = pruned;
  user.rewardPoints = sumGrants(pruned);
}

/**
 * Prune expired, migrate legacy, save if needed. Call on is-auth / reads.
 */
export async function pruneAndPersistUserRewards(UserModel, userId) {
  const user = await UserModel.findById(userId);
  if (!user) return null;
  const oldGrants = JSON.stringify(user.rewardGrants || []);
  const oldPts = user.rewardPoints;
  migrateLegacyRewardPoints(user);
  user.rewardGrants = pruneExpiredGrants(user.rewardGrants || []);
  user.rewardPoints = sumGrants(user.rewardGrants);
  if (JSON.stringify(user.rewardGrants) !== oldGrants || user.rewardPoints !== oldPts) {
    await user.save();
  }
  return user;
}

export function generateAdminBatchId() {
  return `admin_${crypto.randomBytes(12).toString("hex")}`;
}

/**
 * Admin panel: add a grant that expires in ADMIN_REWARD_GRANT_DAYS.
 */
export async function addAdminGrantToUser(UserModel, userId, points, options = {}) {
  const p = Math.max(0, Math.floor(Number(points) || 0));
  if (p <= 0) return null;
  const { adminBatchId } = options;

  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await UserModel.findById(userId);
    if (!user) return null;

    migrateLegacyRewardPoints(user);
    let grants = pruneExpiredGrants(user.rewardGrants || []);
    grants.push(createAdminGrant(p, adminBatchId));
    const total = sumGrants(grants);
    const v = user.__v ?? 0;

    const updated = await UserModel.findOneAndUpdate(
      { _id: userId, __v: v },
      { $set: { rewardGrants: grants, rewardPoints: total }, $inc: { __v: 1 } },
      { new: true }
    )
      .select("name phone email rewardPoints")
      .lean();

    if (updated) return updated;
  }
  return null;
}

async function forEachUserId(UserModel, handler) {
  // Cursor avoids loading all user docs in memory at once.
  const cursor = UserModel.find({}).select("_id").cursor();
  let processed = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const doc of cursor) {
    processed++;
    await handler(doc._id);
  }
  return processed;
}

/**
 * Admin panel: remove points from a user's balance (same FIFO as checkout redeem).
 * If requested amount exceeds balance, only available balance is removed.
 */
export async function removeRewardPointsFromUser(UserModel, userId, points) {
  const requested = Math.max(0, Math.floor(Number(points) || 0));
  if (requested <= 0) {
    return { ok: false, reason: "invalid" };
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { ok: false, reason: "not_found" };
    }

    migrateLegacyRewardPoints(user);
    let grants = pruneExpiredGrants(user.rewardGrants || []);
    const balance = sumGrants(grants);
    const remove = Math.min(requested, balance);

    if (remove <= 0) {
      return { ok: false, reason: "no_balance", balance: 0 };
    }

    grants = deductFromGrants(grants, remove);
    const total = sumGrants(grants);
    const v = user.__v ?? 0;

    const updated = await UserModel.findOneAndUpdate(
      { _id: userId, __v: v },
      { $set: { rewardGrants: grants, rewardPoints: total }, $inc: { __v: 1 } },
      { new: true }
    )
      .select("name phone email rewardPoints")
      .lean();

    if (updated) {
      return {
        ok: true,
        user: updated,
        removed: remove,
        requested,
        capped: remove < requested
      };
    }
  }

  return { ok: false, reason: "retry_exhausted" };
}

/**
 * Bulk remove: remove only admin grants that belong to a specific bulk batch.
 * This does NOT touch `source: "order"` points.
 */
export async function removeAdminBatchFromUser(UserModel, userId, adminBatchId) {
  if (!adminBatchId || typeof adminBatchId !== "string") {
    return { ok: false, reason: "invalid_batch_id" };
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await UserModel.findById(userId);
    if (!user) return { ok: false, reason: "not_found" };

    migrateLegacyRewardPoints(user);
    // Keep rewardPoints aligned with non-expired grants.
    const pruned = pruneExpiredGrants(user.rewardGrants || []);

    const removedGrants = pruned.filter(
      (g) => g.source === "admin" && g.adminBatchId === adminBatchId
    );
    const remainingGrants = pruned.filter(
      (g) => !(g.source === "admin" && g.adminBatchId === adminBatchId)
    );

    const removedAmount = sumGrants(removedGrants);
    if (removedAmount <= 0) {
      return { ok: true, removed: 0, userId };
    }

    const total = sumGrants(remainingGrants);
    const v = user.__v ?? 0;

    const updated = await UserModel.findOneAndUpdate(
      { _id: userId, __v: v },
      { $set: { rewardGrants: remainingGrants, rewardPoints: total }, $inc: { __v: 1 } },
      { new: true }
    )
      .select("rewardPoints")
      .lean();

    if (updated) {
      return { ok: true, removed: removedAmount, userId };
    }
  }

  return { ok: false, reason: "retry_exhausted" };
}

/**
 * Bulk add: add the same admin points grant to every user, tagged by `adminBatchId`.
 */
export async function bulkAddAdminPointsToAllUsers(UserModel, points) {
  const p = Math.max(0, Math.floor(Number(points) || 0));
  if (p <= 0) return null;

  const adminBatchId = generateAdminBatchId();
  let affectedUsers = 0;
  let totalAdded = 0;

  await forEachUserId(UserModel, async (userId) => {
    const updated = await addAdminGrantToUser(UserModel, userId, p, { adminBatchId });
    if (updated) {
      affectedUsers++;
      totalAdded += p;
    }
  });

  return {
    adminBatchId,
    affectedUsers,
    pointsPerUser: p,
    totalAdded
  };
}

/**
 * Bulk remove: remove only admin grants from all users for `adminBatchId`.
 */
export async function bulkRemoveAdminPointsByBatchId(UserModel, adminBatchId) {
  if (!adminBatchId || typeof adminBatchId !== "string") return null;

  let affectedUsers = 0;
  let totalRemoved = 0;

  await forEachUserId(UserModel, async (userId) => {
    const result = await removeAdminBatchFromUser(UserModel, userId, adminBatchId);
    if (result?.ok && result.removed > 0) {
      affectedUsers++;
      totalRemoved += result.removed;
    }
  });

  return { affectedUsers, totalRemoved };
}
