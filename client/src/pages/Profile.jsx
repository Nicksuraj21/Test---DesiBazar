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

  useEffect(() => {
    if (!user) {
      navigate("/");
      setShowUserLogin(true);
    }
  }, [user, navigate, setShowUserLogin]);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

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

  return (
    <div className="mt-16 pb-16 max-w-2xl">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My profile</p>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

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

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <Link
            to="/my-orders"
            className="text-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            My orders
          </Link>
          <Link
            to="/add-address"
            className="text-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Addresses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
