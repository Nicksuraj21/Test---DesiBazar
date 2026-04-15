import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const isOtpPlaceholderEmail = (email) =>
  typeof email === "string" && email.endsWith("@otp.com");

const Profile = () => {
  const { user, setUser, axios, navigate, setShowUserLogin, currency } = useAppContext();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [showRewardTx, setShowRewardTx] = useState(false);
  const [rewardTxLoading, setRewardTxLoading] = useState(false);
  const [rewardTx, setRewardTx] = useState([]);
  const [rewardTxVisibleCount, setRewardTxVisibleCount] = useState(5);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoBroken, setPhotoBroken] = useState(false);
  const photoInputRef = useRef(null);
  const [monthSpend, setMonthSpend] = useState(null);
  const [monthSpendLoading, setMonthSpendLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      setShowUserLogin(true);
    }
  }, [user, navigate, setShowUserLogin]);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  useEffect(() => {
    setPhotoBroken(false);
  }, [user?.profileImage]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      try {
        setMonthSpendLoading(true);
        const { data } = await axios.get("/api/user/spend-this-month");
        if (!cancelled && data.success) {
          setMonthSpend({
            totalSpent: Number(data.totalSpent) || 0,
            orderCount: Number(data.orderCount) || 0,
            monthLabel: data.monthLabel || "",
          });
        }
      } catch {
        if (!cancelled) {
          setMonthSpend({ totalSpent: 0, orderCount: 0, monthLabel: "" });
        }
      } finally {
        if (!cancelled) setMonthSpendLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user, axios]);

  const loadAddresses = async () => {
    setAddrLoading(true);
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) setAddresses(data.addresses || []);
    } catch (err) {
      toast.error(err.message || "Could not load addresses");
    } finally {
      setAddrLoading(false);
    }
  };

  const toggleAddresses = () => {
    const next = !showAddresses;
    setShowAddresses(next);
    if (next) loadAddresses();
  };

  const loadRewardTransactions = async () => {
    setRewardTxLoading(true);
    try {
      const { data } = await axios.get("/api/user/reward-transactions");
      if (data.success) {
        setRewardTx(data.transactions || []);
      } else {
        toast.error(data.message || "Could not load points history");
      }
    } catch (err) {
      toast.error(err.message || "Could not load points history");
    } finally {
      setRewardTxLoading(false);
    }
  };

  const toggleRewardTransactions = () => {
    const next = !showRewardTx;
    setShowRewardTx(next);
    if (next) {
      setRewardTxVisibleCount(5);
      loadRewardTransactions();
    }
  };

  if (!user) return null;

  const displayEmail =
    user.email && !isOtpPlaceholderEmail(user.email) ? user.email : null;

  const onPickProfilePhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image should be 5 MB or smaller");
      return;
    }
    setUploadingPhoto(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await axios.post("/api/user/profile-image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      });
      if (data.success) {
        setUser(data.user);
        toast.success("Profile photo updated");
      } else {
        toast.error(data.message || "Could not upload photo");
      }
    } catch (err) {
      toast.error(err.message || "Could not upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSaveName = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your name");
      return;
    }
    setSaving(true);
    try {
      const { data } = await axios.patch("/api/user/profile", { name: trimmed });
      if (data.success) {
        setUser(data.user);
        toast.success("Profile updated");
      } else {
        toast.error(data.message || "Could not update");
      }
    } catch (err) {
      toast.error(err.message || "Could not update");
    } finally {
      setSaving(false);
    }
  };

  const initial = (user.name || "U").charAt(0).toUpperCase();
  const rewardPts = Math.floor(user.rewardPoints ?? 0);

  return (
    <div className="mt-16 max-w-2xl pb-6 md:pb-8">
      <div className="mb-8 flex w-max flex-col items-end">
        <p className="text-2xl font-medium uppercase">My profile</p>
        <div className="h-0.5 w-16 rounded-full bg-primary" />
      </div>

      <div className="mb-6 flex w-full flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-left sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-amber-900">Reward points</p>
          <p className="mt-0.5 text-xs text-amber-800/80">1 point = ₹1 off</p>
        </div>
        <div className="flex w-full items-center justify-between gap-4 sm:ml-auto sm:w-auto sm:justify-end">
          <p className="flex h-9 items-center text-2xl font-bold tabular-nums leading-none text-amber-900">
            {rewardPts} pts
          </p>
          <button
            type="button"
            onClick={toggleRewardTransactions}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              showRewardTx
                ? "border-primary bg-primary/10 text-primary"
                : "border-amber-300 bg-white text-amber-900 hover:bg-amber-50"
            }`}
          >
            {showRewardTx ? "Hide history" : "History"}
          </button>
        </div>
      </div>

      <div className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 md:px-5 md:py-3.5">
        <p className="min-w-0 text-sm font-semibold leading-snug text-emerald-900 md:text-base">
          <span>This month&apos;s spend</span>
          {!monthSpendLoading && monthSpend?.monthLabel ? (
            <>
              <span className="hidden text-emerald-700/85 sm:inline"> · </span>
              <span className="mt-0.5 block truncate text-xs font-normal text-emerald-700/85 sm:mt-0 sm:inline md:text-sm">
                {monthSpend.monthLabel}
              </span>
            </>
          ) : null}
        </p>
        {monthSpendLoading ? (
          <div className="h-9 w-28 shrink-0 animate-pulse rounded-md bg-emerald-100/90" />
        ) : (
          <div className="flex shrink-0 flex-col items-end gap-0.5 tabular-nums sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-2xl font-bold leading-none text-primary md:text-3xl">
              {currency}
              {monthSpend?.totalSpent ?? 0}
            </span>
            <span className="text-xs font-medium text-emerald-800/90 md:text-sm">
              {monthSpend?.orderCount ?? 0}{" "}
              {monthSpend?.orderCount === 1 ? "order" : "orders"}
            </span>
          </div>
        )}
      </div>

      {showRewardTx && (
        <div className="mb-6 overflow-hidden rounded-xl border border-amber-200 bg-white">
          <div className="px-4 py-3 border-b border-amber-100 bg-amber-50/70">
            <p className="text-sm font-semibold text-amber-900">Points transactions</p>
          </div>
          {rewardTxLoading ? (
            <p className="px-4 py-6 text-sm text-gray-500 text-center">Loading transactions…</p>
          ) : rewardTx.length === 0 ? (
            <p className="px-4 py-5 text-sm text-gray-500">No points transactions yet.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {rewardTx.slice(0, rewardTxVisibleCount).map((tx) => (
                <li key={tx.id} className="px-4 py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{tx.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(tx.date).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-semibold tabular-nums ${
                      tx.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    {tx.points} pts
                  </p>
                </li>
                ))}
              </ul>
              {rewardTx.length > rewardTxVisibleCount && (
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/70">
                  <button
                    type="button"
                    onClick={() => setRewardTxVisibleCount((prev) => prev + 5)}
                    className="w-full text-sm font-medium text-primary hover:underline"
                  >
                    View more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
          <input
            ref={photoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={onPickProfilePhoto}
          />
          <div className="flex shrink-0 flex-col items-center gap-1.5 sm:items-start">
            <div
              className="relative h-20 w-20 shrink-0"
              aria-busy={uploadingPhoto}
              aria-label={uploadingPhoto ? "Updating profile photo" : "Profile photo"}
            >
              {user.profileImage && !photoBroken ? (
                <img
                  src={user.profileImage}
                  alt=""
                  className={`h-20 w-20 rounded-full object-cover shadow-sm ring-2 ring-primary/20 transition-opacity ${uploadingPhoto ? "opacity-35" : ""}`}
                  onError={() => setPhotoBroken(true)}
                />
              ) : (
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-3xl font-semibold text-primary ring-2 ring-primary/15 transition-opacity ${uploadingPhoto ? "opacity-35" : ""}`}
                >
                  {initial}
                </div>
              )}
              {uploadingPhoto && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/25 ring-2 ring-inset ring-white/35">
                  <span
                    className="h-9 w-9 animate-spin rounded-full border-[3px] border-white border-t-primary shadow-md"
                    aria-hidden
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              disabled={uploadingPhoto}
              onClick={() => !uploadingPhoto && photoInputRef.current?.click()}
              className="rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-wait disabled:opacity-70"
            >
              {uploadingPhoto ? "Updating photo…" : user.profileImage ? "Change photo" : "Add photo"}
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">{user.name || "User"}</h1>
            {displayEmail && (
              <p className="mt-0.5 text-sm text-gray-500">{displayEmail}</p>
            )}
            {user.phone && (
              <p className="mt-0.5 text-sm text-gray-500">+91 {user.phone}</p>
            )}
          </div>
        </div>

        <form onSubmit={onSaveName} className="space-y-3">
          <div>
            <label htmlFor="profile-name" className="mb-0.5 block text-sm font-medium text-gray-700">
              Display name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-primary"
              placeholder="Your name"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            to="/my-orders"
            className="rounded-full border border-gray-300 bg-gray-50/80 px-4 py-2.5 text-center text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-100 sm:min-w-[8.5rem]"
          >
            My orders
          </Link>
          <button
            type="button"
            onClick={toggleAddresses}
            className={`rounded-full border px-4 py-2.5 text-center text-sm font-medium shadow-sm transition sm:min-w-[8.5rem] ${
              showAddresses
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-300 bg-gray-50/80 text-gray-800 hover:bg-gray-100"
            }`}
          >
            Addresses
          </button>
        </div>

        {showAddresses && (
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80">
            {addrLoading ? (
              <p className="px-4 py-4 text-center text-sm text-gray-500">Loading addresses…</p>
            ) : addresses.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">No saved addresses yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {addresses.map((a) => (
                  <li key={a._id} className="bg-white px-4 py-3">
                    <p className="text-sm font-medium text-gray-800">
                      {a.firstName} {a.lastName}
                      {a.isDefault && (
                        <span className="ml-2 text-xs font-semibold text-green-600">Default</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {a.street}, {a.city}, {a.state} — {a.zipcode}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">+91 {a.phone}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-gray-200 bg-white p-2.5">
              <Link
                to="/add-address"
                className="block w-full rounded-lg bg-primary/9 px-3 py-2 text-center text-sm font-medium text-primary transition hover:bg-primary/14"
              >
                + Add address
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
