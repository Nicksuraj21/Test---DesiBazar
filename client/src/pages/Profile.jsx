import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const isOtpPlaceholderEmail = (email) =>
  typeof email === "string" && email.endsWith("@otp.com");

const Profile = () => {
  const { user, setUser, axios, navigate, setShowUserLogin } = useAppContext();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [showRewardTx, setShowRewardTx] = useState(false);
  const [rewardTxLoading, setRewardTxLoading] = useState(false);
  const [rewardTx, setRewardTx] = useState([]);
  const [rewardTxVisibleCount, setRewardTxVisibleCount] = useState(5);

  useEffect(() => {
    if (!user) {
      navigate("/");
      setShowUserLogin(true);
    }
  }, [user, navigate, setShowUserLogin]);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

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
    <div className="mt-16 pb-16 max-w-2xl">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My profile</p>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

    <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/90 flex flex-col sm:flex-row sm:items-center gap-3 w-full text-left">
  
  {/* Left Content */}
  <div>
    <p className="text-sm font-semibold text-amber-900">Reward points</p>
    <p className="text-xs text-amber-800/80 mt-0.5">
      1 point = ₹1 off
    </p>
  </div>

  {/* Right Section */}
  <div className="flex items-center justify-between sm:justify-end sm:ml-auto gap-4 w-full sm:w-auto">
    
    {/* Points */}
    <p className="text-2xl font-bold text-amber-900 tabular-nums h-9 flex items-center leading-none">
      {rewardPts} pts
    </p>

    {/* Button */}
    <button
      type="button"
      onClick={toggleRewardTransactions}
      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
        showRewardTx
          ? "border-primary bg-primary/10 text-primary"
          : "border-amber-300 bg-white text-amber-900 hover:bg-amber-50"
      }`}
    >
      {showRewardTx ? "Hide history" : "History"}
    </button>
  </div>
</div>

      {showRewardTx && (
        <div className="mb-6 border border-amber-200 rounded-xl bg-white overflow-hidden">
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

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-3xl font-semibold text-primary shrink-0">
            {initial}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{user.name || "User"}</h1>
            {displayEmail && (
              <p className="text-sm text-gray-500 mt-1">{displayEmail}</p>
            )}
            {user.phone && (
              <p className="text-sm text-gray-500 mt-0.5">+91 {user.phone}</p>
            )}
          </div>
          <img
            src={assets.profile_icon}
            alt=""
            className="w-12 h-12 opacity-40 hidden sm:block ml-auto"
          />
        </div>

        <form onSubmit={onSaveName} className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
              Display name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-primary text-gray-800"
              placeholder="Your name"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/my-orders"
              className="text-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              My orders
            </Link>
            <button
              type="button"
              onClick={toggleAddresses}
              className={`text-center px-4 py-2.5 border rounded-full text-sm font-medium transition ${
                showAddresses
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Addresses
            </button>
          </div>

          {showAddresses && (
            <div className="mt-4 border border-gray-200 rounded-xl bg-gray-50/80 overflow-hidden">
              {addrLoading ? (
                <p className="text-sm text-gray-500 px-4 py-6 text-center">Loading addresses…</p>
              ) : addresses.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-4">No saved addresses yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {addresses.map((a) => (
                    <li key={a._id} className="px-4 py-3 bg-white">
                      <p className="text-sm font-medium text-gray-800">
                        {a.firstName} {a.lastName}
                        {a.isDefault && (
                          <span className="ml-2 text-xs font-semibold text-green-600">Default</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {a.street}, {a.city}, {a.state} — {a.zipcode}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">+91 {a.phone}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="p-3 border-t border-gray-200 bg-white">
                <Link
                  to="/add-address"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-primary bg-primary/9 hover:bg-primary/14 rounded-lg transition"
                >
                  + Add address
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
