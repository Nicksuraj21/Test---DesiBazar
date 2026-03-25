import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const RewardPoints = () => {
    const { axios } = useAppContext();

    const [userIdInput, setUserIdInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [loadingLookup, setLoadingLookup] = useState(false);
    const [user, setUser] = useState(null);

    const [pointsToAdd, setPointsToAdd] = useState("");
    const [loadingAdd, setLoadingAdd] = useState(false);

    const [pointsToRemove, setPointsToRemove] = useState("");
    const [loadingRemove, setLoadingRemove] = useState(false);

    const findUser = async (e) => {
        e?.preventDefault();
        const uid = userIdInput.trim();
        const ph = phoneInput.trim();
        const em = emailInput.trim();

        if (!uid && !ph && !em) {
            toast.error("Enter User Email ID");
            return;
        }

        setLoadingLookup(true);
        setUser(null);
        try {
            const params = new URLSearchParams();
            if (uid) params.set("userId", uid);
            if (ph) params.set("phone", ph);
            if (em) params.set("email", em);

            const { data } = await axios.get(`/api/seller/user-lookup?${params.toString()}`);
            if (data.success) {
                setUser(data.user);
                toast.success("User found");
            } else {
                toast.error(data.message || "Not found");
            }
        } catch (err) {
            toast.error(err.message || "Lookup failed");
        } finally {
            setLoadingLookup(false);
        }
    };

    const addPoints = async (e) => {
        e.preventDefault();
        if (!user?._id) {
            toast.error("Find a user first");
            return;
        }
        const p = Math.floor(Number(pointsToAdd));
        if (!Number.isFinite(p) || p < 1) {
            toast.error("Enter valid points (1 or more)");
            return;
        }

        setLoadingAdd(true);
        try {
            const { data } = await axios.post("/api/seller/add-reward-points", {
                userId: user._id,
                points: p
            });
            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                setPointsToAdd("");
            } else {
                toast.error(data.message || "Failed");
            }
        } catch (err) {
            toast.error(err.message || "Failed");
        } finally {
            setLoadingAdd(false);
        }
    };

    const removePoints = async (e) => {
        e.preventDefault();
        if (!user?._id) {
            toast.error("Find a user first");
            return;
        }
        const p = Math.floor(Number(pointsToRemove));
        if (!Number.isFinite(p) || p < 1) {
            toast.error("Enter valid points (1 or more)");
            return;
        }

        setLoadingRemove(true);
        try {
            const { data } = await axios.post("/api/seller/remove-reward-points", {
                userId: user._id,
                points: p
            });
            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                setPointsToRemove("");
            } else {
                toast.error(data.message || "Failed");
            }
        } catch (err) {
            toast.error(err.message || "Failed");
        } finally {
            setLoadingRemove(false);
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
            <div className="md:p-10 p-4 max-w-2xl space-y-8">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Reward points</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Find a customer by email — then add or remove points. Points added here are valid for{" "}
                        <span className="font-medium text-gray-700">10 days</span> (order-earned points stay valid 1 year).
                    </p>
                </div>

                <form onSubmit={findUser} className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
                    <p className="text-sm font-medium text-gray-700">Find user (use any one)</p>
                    <div className="space-y-3 text-sm">
                        {/* <div>
                            <label className="block text-gray-600 mb-1">User ID</label>
                            <input
                                value={userIdInput}
                                onChange={(e) => setUserIdInput(e.target.value)}
                                className="w-full border border-gray-200 rounded px-3 py-2 outline-none focus:border-primary"
                                placeholder="MongoDB _id"
                            />
                        </div> */}
                        {/* <div>
                            <label className="block text-gray-600 mb-1">Phone</label>
                            <input
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value)}
                                className="w-full border border-gray-200 rounded px-3 py-2 outline-none focus:border-primary"
                                placeholder="Registered mobile"
                            />
                        </div> */}
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="w-full border border-gray-200 rounded px-3 py-2 outline-none focus:border-primary"
                                placeholder="Registered email"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loadingLookup}
                        className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-60"
                    >
                        {loadingLookup ? "Searching…" : "Find user"}
                    </button>
                </form>

                {user && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-4">
                        <div className="text-sm space-y-1">
                            <p><span className="text-gray-500">Name:</span> <span className="font-medium">{user.name || "—"}</span></p>
                            <p><span className="text-gray-500">Phone:</span> {user.phone || "—"}</p>
                            <p><span className="text-gray-500">Email:</span> {user.email || "—"}</p>
                            <p className="font-mono text-xs break-all"><span className="text-gray-500">User ID:</span> {user._id}</p>
                            <p className="text-lg font-bold text-amber-900 pt-2">
                                Current balance: {Math.floor(user.rewardPoints ?? 0)} pts
                            </p>
                        </div>

                        <form onSubmit={addPoints} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pt-2 border-t border-amber-200">
                            <div className="flex-1 w-full">
                                <label className="block text-sm text-gray-600 mb-1">Points to add</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={pointsToAdd}
                                    onChange={(e) => setPointsToAdd(e.target.value)}
                                    className="w-full border border-amber-300 rounded px-3 py-2 outline-none bg-white"
                                    placeholder="e.g. 100"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingAdd}
                                className="px-5 py-2 bg-amber-700 text-white rounded-lg text-sm font-medium disabled:opacity-60 whitespace-nowrap"
                            >
                                {loadingAdd ? "Adding…" : "Add points"}
                            </button>
                        </form>

                        <form onSubmit={removePoints} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pt-4 border-t border-amber-200">
                            <div className="flex-1 w-full">
                                <label className="block text-sm text-gray-600 mb-1">Points to remove</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={pointsToRemove}
                                    onChange={(e) => setPointsToRemove(e.target.value)}
                                    className="w-full border border-red-200 rounded px-3 py-2 outline-none bg-white"
                                    placeholder="e.g. 50"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Deducts from balance (soonest-expiring points first). If you ask for more than balance, only available points are removed.
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={loadingRemove || Math.floor(user.rewardPoints ?? 0) < 1}
                                className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium disabled:opacity-60 whitespace-nowrap"
                            >
                                {loadingRemove ? "Removing…" : "Remove points"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RewardPoints;
