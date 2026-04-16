const STORAGE_KEY = "desiBazar_spendThisMonth_v1";

/** Fired after cache write so Profile (or other tabs) can sync without refetch UI flash. */
export const SPEND_CACHE_UPDATED_EVENT = "desiBazar-spend-cache-updated";

/** One in-flight warm per user (dedupe concurrent callers). */
const warmPromises = new Map();

/** Client-local calendar month; aligns spend refresh with a new month without extra API rules. */
function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Cached spend for Profile. Valid until month changes, user changes, or invalidateSpendThisMonthCache()
 * (e.g. new order / cancel).
 */
export function readSpendThisMonthCache(userId) {
  if (userId == null || userId === "") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (String(o.userId) !== String(userId)) return null;
    if (o.monthKey !== currentMonthKey()) return null;
    return {
      totalSpent: Number(o.totalSpent) || 0,
      orderCount: Number(o.orderCount) || 0,
      monthLabel: typeof o.monthLabel === "string" ? o.monthLabel : "",
    };
  } catch {
    return null;
  }
}

export function writeSpendThisMonthCache(userId, payload) {
  if (userId == null || userId === "") return;
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        userId: String(userId),
        monthKey: currentMonthKey(),
        totalSpent: Number(payload.totalSpent) || 0,
        orderCount: Number(payload.orderCount) || 0,
        monthLabel: payload.monthLabel || "",
      })
    );
    dispatchSpendCacheUpdated(userId);
  } catch {
    /* private mode / quota */
  }
}

export function invalidateSpendThisMonthCache() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function dispatchSpendCacheUpdated(userId) {
  try {
    window.dispatchEvent(
      new CustomEvent(SPEND_CACHE_UPDATED_EVENT, {
        detail: { userId: String(userId) },
      })
    );
  } catch {
    /* SSR / no window */
  }
}

/**
 * After order/cancel: clear stale cache, refetch spend, write cache, notify listeners.
 * Deduplicates concurrent warms for the same user.
 */
export function warmSpendThisMonthCache(axios, userId) {
  if (userId == null || userId === "") return Promise.resolve();
  const key = String(userId);
  const existing = warmPromises.get(key);
  if (existing) return existing;

  const p = (async () => {
    try {
      invalidateSpendThisMonthCache();
      const { data } = await axios.get("/api/user/spend-this-month");
      if (!data?.success) return;
      const next = {
        totalSpent: Number(data.totalSpent) || 0,
        orderCount: Number(data.orderCount) || 0,
        monthLabel: data.monthLabel || "",
      };
      writeSpendThisMonthCache(userId, next);
    } catch {
      /* network: Profile will fetch on next visit */
    } finally {
      warmPromises.delete(key);
    }
  })();

  warmPromises.set(key, p);
  return p;
}
