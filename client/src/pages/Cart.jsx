
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import CustomSelect from "../components/CustomSelect";
import { buildProductDetailPath } from "../utils/slugify";
import { productImage432Url } from "../utils/productImage432";
import { warmSpendThisMonthCache } from "../utils/spendThisMonthCache";

/** Short label on the main CTA when the store has paused new orders */
const ORDERS_PAUSED_BUTTON = "Place Order - We Back Soon";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        updateCartItem,
        navigate,
        getCartAmount,
        axios,
        user,
        setUser,
        setCartItems,
        setShowUserLogin   // 👈 ADD THIS
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const [defaultLoading, setDefaultLoading] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const { userLocation, setUserLocation } = useAppContext();

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);

    // ✅ NEW STATE (ONLY ADDITION)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    /** Sync guard: state updates async, so double-clicks can still fire twice without this */
    const placeOrderInFlightRef = useRef(false);
    const [isLocating, setIsLocating] = useState(false); // 👈 ADD THIS
    const [isLiveSharing, setIsLiveSharing] = useState(false);
    const liveWatchIdRef = useRef(null);

    const cartAmount = getCartAmount();
    const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0;

    const [redeemPointsInput, setRedeemPointsInput] = useState(0);

    // ✅ Custom confirm)
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    /** After successful order: show points popup (COD + UPI) */
    const [orderSuccessModal, setOrderSuccessModal] = useState(null);

    /** When false, seller paused checkout (mirrors /api/store/accepting-orders). */
    const [storeAcceptingOrders, setStoreAcceptingOrders] = useState(true);

    const openOrderPlacedModal = (payload) => {
        const pe = typeof payload?.pointsEarned === "number" ? payload.pointsEarned : 0;
        const rp = typeof payload?.rewardPoints === "number" ? payload.rewardPoints : 0;
        setOrderSuccessModal({ pointsEarned: pe, rewardPoints: rp });
    };

    const closeOrderPlacedModal = () => {
        setOrderSuccessModal(null);
        navigate("/my-orders");
    };

    useEffect(() => {
        const load = () => {
            axios
                .get("/api/store/accepting-orders")
                .then(({ data }) => {
                    if (data?.success) setStoreAcceptingOrders(!!data.acceptingOrders);
                })
                .catch(() => {});
        };
        load();
        const interval = setInterval(load, 40000);
        const onVis = () => {
            if (document.visibilityState === "visible") load();
        };
        document.addEventListener("visibilitychange", onVis);
        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, [axios]);

    /* ================= COUPON ================= */
    useEffect(() => {
        if (!coupon) return;

        if (coupon.toLowerCase() === "save10") {
            setDiscount(Math.floor(cartAmount * 0.10));
        } else if (coupon.toLowerCase() === "off50") {
            setDiscount(50);
        }
    }, [cartAmount]);

    const applyCoupon = () => {
        if (coupon.toLowerCase() === "save10") {
            setDiscount(Math.floor(cartAmount * 0.10));
            toast.success("SAVE10 applied");
        } else if (coupon.toLowerCase() === "off50") {
            setDiscount(50);
            toast.success("OFF50 applied");
        } else {
            setDiscount(0);
            toast.error("Invalid coupon");
        }
    };

    const removeCoupon = () => {
        setCoupon("");
        setDiscount(0);
        toast("Coupon removed");
    };

    const grossBeforeRedeem = cartAmount + deliveryCharge - discount;
    const rewardBalance = Math.floor(user?.rewardPoints ?? 0);
    const maxRedeem = user ? Math.min(rewardBalance, Math.max(0, grossBeforeRedeem)) : 0;
    const appliedRedeem = Math.min(Math.max(0, Math.floor(Number(redeemPointsInput) || 0)), maxRedeem);
    const finalTotal = grossBeforeRedeem - appliedRedeem;
    const pointsEarnedPreview = Math.floor(finalTotal / 50);

    const freeDeliveryTarget = 100;
    const remainingForFreeDelivery = freeDeliveryTarget - cartAmount;

    const ordersPaused = !storeAcceptingOrders && cartArray.length > 0;

    useEffect(() => {
        setRedeemPointsInput((prev) => Math.min(Math.max(0, prev), maxRedeem));
    }, [maxRedeem]);

    /* ================= CART ================= */
    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find(item => item._id === key);
            if (product) {
                tempArray.push({ ...product, quantity: cartItems[key] });
            }
        }
        setCartArray(tempArray);
    };

    /* ================= ADDRESS ================= */
    const getUserAddress = async () => {
        try {
            const { data } = await axios.get("/api/address/get");
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    /* ================= ADDRESS DELETE ================= */
    // const deleteAddress = async (id) => {
    //     if (!confirm("Delete this address?")) return
    //     try {
    //         const { data } = await axios.delete(`/api/address/delete/${id}`)

    //         if (data.success) {
    //             toast.success("Address deleted")
    //             setAddresses(prev => prev.filter(a => a._id !== id))
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    /* ================= ADDRESS SET AS DEFAULT ================= */
    const setDefaultAddress = async (id) => {

        setDefaultLoading(id);

        try {

            const { data } = await axios.put(`/api/address/default/${id}`);

            if (data.success) {
                toast.success("Default address updated");
                getUserAddress();
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setDefaultLoading(null);
        }

    };

    /* =================  CONFIRM DELETE ADDRESS ================= */
    const confirmDeleteAddress = async () => {

        setDeleteLoading(deleteId);

        try {

            const { data } = await axios.delete(`/api/address/delete/${deleteId}`);

            if (data.success) {
                toast.success("Address deleted");
                setAddresses(prev => prev.filter(a => a._id !== deleteId));
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeleteLoading(null);
            setShowConfirm(false);
        }

    };

    /* ================= Share live location (watchPosition) ================= */
    const toggleLiveLocation = () => {
        if (liveWatchIdRef.current !== null) {
            navigator.geolocation.clearWatch(liveWatchIdRef.current);
            liveWatchIdRef.current = null;
            setIsLiveSharing(false);
            setIsLocating(false);
            toast("Live location sharing stopped");
            return;
        }

        if (!user) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }

        if (!navigator.geolocation) {
            toast.error("Location not supported");
            return;
        }

        setIsLocating(true);

        liveWatchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserLocation(loc);
                localStorage.setItem("userLocation", JSON.stringify(loc));
                setIsLocating(false);
                setIsLiveSharing(true);
            },
            (error) => {
                setIsLocating(false);
                setIsLiveSharing(false);
                if (liveWatchIdRef.current !== null) {
                    navigator.geolocation.clearWatch(liveWatchIdRef.current);
                    liveWatchIdRef.current = null;
                }
                if (error.code === 1) {
                    toast.error("Location permission denied");
                } else {
                    toast.error("Unable to fetch live location");
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0
            }
        );

        toast.success("Live location sharing started");
    };

    useEffect(() => {
        return () => {
            if (liveWatchIdRef.current !== null) {
                navigator.geolocation.clearWatch(liveWatchIdRef.current);
                liveWatchIdRef.current = null;
            }
        };
    }, []);


    /* ================= Fresh Location Before Order ================= */
    const requestLocationBeforeOrder = () => {
        return new Promise((resolve, reject) => {

            if (!navigator.geolocation) {
                toast.error("Location not supported");
                reject();
                return;
            }

            setIsLocating(true);

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    // store latest location
                    setUserLocation(location);
                    localStorage.setItem("userLocation", JSON.stringify(location));

                    setIsLocating(false);
                    resolve(location);

                },

                (error) => {

                    setIsLocating(false);

                    if (error.code === 1) {
                        // toast.error("Location permission required to place order");
                    }
                    else if (error.code === 2) {
                        toast.error("Location unavailable");
                    }
                    else if (error.code === 3) {
                        toast.error("Location request timeout");
                    }
                    else {
                        toast.error("Unable to fetch location");
                    }

                    reject(error);
                },

                {
                    enableHighAccuracy: true,  // best GPS accuracy
                    timeout: 4000,            // max wait 10 sec
                    maximumAge: 0              // always fresh location
                }

            );

        });
    };


    /* ================= RAZORPAY UPI ================= */
    const handleUpiPayment = async () => {

        if (!user) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }

        if (!selectedAddress) {
            toast.error("Add address first");
            navigate("/add-address");
            return;
        }

        if (finalTotal < 1) {
            toast.error("UPI payment needs at least ₹1 after rewards. Use Cash on Delivery or fewer points.");
            return;
        }

        if (!storeAcceptingOrders) {
            toast.error(
                "We're not taking new orders right now. Please try again a little later — we'll be back soon."
            );
            return;
        }

        try {

            // const location = await requestLocationBeforeOrder();

            // 🔥 CREATE ORDER (UPI)
            const { data } = await axios.post(
                "/api/payment/create-upi-order",
                {
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id,
                    coupon,
                    rewardPointsToRedeem: appliedRedeem
                },
                { withCredentials: true }
            );
            if (!data.success) {
                toast.error(data.message);
                return;
            }

            let checkoutFinished = false;
            let resolveCheckout;
            const checkoutClosed = new Promise((resolve) => {
                resolveCheckout = resolve;
            });
            const finishCheckout = () => {
                if (checkoutFinished) return;
                checkoutFinished = true;
                resolveCheckout();
            };

            // 🔥 RAZORPAY POPUP
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                order_id: data.razorpayOrder.id,
                amount: data.razorpayOrder.amount,
                currency: "INR",
                name: "DesiBazar",
                description: "Order Payment",
                method: {
                    // Use Razorpay default UPI flow (mobile web intent-based when supported).
                    // This avoids Android "complete action using Chrome" chooser in many cases.
                    upi: true,
                    card: false,
                    netbanking: false,
                    wallet: false
                },

                handler: async function (response) {

                    try {

                        const verify = await axios.post(
                            "/api/payment/verify-upi",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: data.orderId
                            },
                            {
                                withCredentials: true   // 👈 COOKIE FIX AGAIN
                            }
                        );

                        if (verify.data.success) {
                            void warmSpendThisMonthCache(axios, user._id);
                            setCartItems({});
                            if (typeof verify.data.rewardPoints === "number" && user) {
                                setUser({ ...user, rewardPoints: verify.data.rewardPoints });
                            }
                            openOrderPlacedModal(verify.data);
                        } else {
                            toast.error("Payment verification failed");
                        }

                    } catch (err) {
                        toast.error("Payment verify error");
                    } finally {
                        finishCheckout();
                    }
                },

                modal: {
                    ondismiss: () => {
                        finishCheckout();
                    }
                },

                theme: { color: "#16a34a" }
            };

            // 🔒 Razorpay load check
            if (typeof window.Razorpay === "undefined") {
                toast.error("Payment system not loaded");
                return;
            }

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", () => {
                finishCheckout();
            });

            rzp.open();

            await checkoutClosed;

        } catch (error) {
            console.log(error);
            toast.error("UPI failed");
        }
    };


    /* ================= PLACE ORDER COD ================= */
    const placeOrder = () => {

        // ✅ CART EMPTY CHECK
        if (cartArray.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!storeAcceptingOrders) {
            toast.error(
                "We're not taking new orders right now. Please try again a little later — we'll be back soon."
            );
            return;
        }

        if (placeOrderInFlightRef.current || isPlacingOrder) return;

        if (!user) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }

        if (!selectedAddress) {
            toast.error("Please add address first");
            navigate("/add-address");
            return;
        }

        placeOrderInFlightRef.current = true;
        setIsPlacingOrder(true);

        // 🔥 background order
        processOrder();
    };



    const getOrderLocation = async () => {
        try {
            const loc = await requestLocationBeforeOrder();
            return loc;
        } catch {
            let cached = null;

            try {
                cached =
                    userLocation ||
                    JSON.parse(localStorage.getItem("userLocation") || "null")
            } catch {
                cached = userLocation || null;
            }
            return cached;
        }
    };



    const processOrder = async () => {
        try {
            if (paymentOption === "COD") {

                const location = await getOrderLocation();

                const { data } = await axios.post("/api/order/cod", {
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id,
                    coupon,
                    location,
                    rewardPointsToRedeem: appliedRedeem
                });

                if (data.success) {

                    void warmSpendThisMonthCache(axios, user._id);
                    setCartItems({});
                    if (typeof data.rewardPoints === "number" && user) {
                        setUser({ ...user, rewardPoints: data.rewardPoints });
                    }

                    const orderId = data.orderId;

                    requestLocationBeforeOrder()
                        .then(loc => {
                            axios.post("/api/order/update-location", {
                                orderId,
                                location: loc
                            });
                        })
                        .catch(() => { });

                    openOrderPlacedModal(data);
                }

            } else {

                await handleUpiPayment();

            }

        } catch (error) {
            toast.error("Order failed");
        } finally {
            placeOrderInFlightRef.current = false;
            setIsPlacingOrder(false);
        }
    };



    useEffect(() => {
        if (products.length > 0) getCart();
    }, [products, cartItems]);

    useEffect(() => {
        if (user) getUserAddress();
    }, [user]);

    /* ================= UI (UNCHANGED) ================= */
    return (
        <>

            {cartAmount > 0 && cartAmount < freeDeliveryTarget && (
                <div className="mt-4 mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2">

                    <span>🚚</span>

                    <span>
                        Add <b>{currency}{remainingForFreeDelivery}</b> more to get
                        <b className="text-green-600"> FREE delivery</b>
                    </span>

                </div>
            )}


            {cartAmount >= freeDeliveryTarget && (
                <div className="mt-4 mb-4 bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2">

                    <span>🎉</span>

                    <span>
                        You unlocked <b>FREE delivery</b>
                    </span>

                </div>
            )}


            <div className="flex flex-col md:flex-row mt-12 gap-10">

                {/* LEFT */}
                <div className="flex-1 max-w-4xl">
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm font-medium pb-3">
                        <p>Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div
                                    onClick={() => {
                                        navigate(buildProductDetailPath(product.category, product.name, product._id, products));
                                        scrollTo(0, 0);
                                    }}
                                    className="cursor-pointer flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-slate-50"
                                >
                                    <img src={productImage432Url(product.image[0])} alt="" className="max-h-full max-w-full object-contain" />
                                </div>

                                <div>
                                    <p className="font-medium text-gray-700">{product.name}</p>
                                    <p className="text-sm text-gray-400">Weight: {product.weight || "N/A"}</p>
                                    <div className="flex items-center mt-1">
                                        <p className="text-sm"></p>
                                        <div className="flex items-center gap-2 mt-1">

                                            <p className="text-sm">Qty:</p>

                                            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        product.quantity > 1 &&
                                                        updateCartItem(product._id, product.quantity - 1)
                                                    }
                                                    className="px-2 py-0.5 text-sm bg-gray-100 hover:bg-gray-200"
                                                >
                                                    −
                                                </button>

                                                <div className="px-3 py-0.5 text-sm font-medium bg-white min-w-[28px] text-center">
                                                    {product.quantity}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        product.quantity < 5 &&
                                                        updateCartItem(product._id, product.quantity + 1)
                                                    }
                                                    className="px-2 py-0.5 text-sm bg-gray-100 hover:bg-gray-200"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center font-medium text-gray-700">
                                {currency}{product.offerPrice * product.quantity}
                            </p>

                            <button onClick={() => removeFromCart(product._id)} className="mx-auto opacity-70 hover:opacity-100">
                                <img src={assets.remove_icon} className="w-5" />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => { navigate("/products"); scrollTo(0, 0); }}
                        className="flex items-center mt-8 gap-2 text-primary font-medium"
                    >
                        <img src={assets.arrow_right_icon_colored} className="w-4" />
                        Continue Shopping
                    </button>
                </div>

                {/* RIGHT */}
                <div className="max-w-[360px] w-full bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>





                    <p className="text-xs text-gray-400 uppercase">Delivery Address</p>

                    <div className="mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-700 leading-snug">
                            {selectedAddress
                                ? `${selectedAddress.street}, ${selectedAddress.city}`
                                : "No address selected"}
                        </p>

                        <div className="flex flex-col gap-1.5 mt-2">
                            <button
                                type="button"
                                onClick={toggleLiveLocation}
                                disabled={isLocating && !isLiveSharing}
                                className={`w-full text-xs px-2.5 py-1.5 rounded-md border-1 font-semibold transition flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm ${isLiveSharing
                                    ? "border-green-700 bg-green-600 text-white hover:bg-green-700"
                                    : "border-green-600 bg-green-50 text-green-800 hover:bg-green-100"
                                    }`}
                            >
                                {isLocating && !isLiveSharing && (
                                    <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                                )}
                                {isLocating && !isLiveSharing
                                    ? "Getting location..."
                                    : isLiveSharing
                                        ? "Stop sharing live location"
                                        : "Share live location"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (!user) {
                                        toast.error("Please login first");
                                        setShowUserLogin(true);
                                        return;
                                    }
                                    setShowAddress(!showAddress);
                                }}
                                className="w-full text-xs px-2.5 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition font-medium text-center"
                            >
                                Add Address & Change
                            </button>
                        </div>
                    </div>

                    {isLiveSharing && userLocation && (
                        <p className="text-green-600 text-xs mt-2 flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" aria-hidden />
                            Live location on — used for delivery
                        </p>
                    )}


                    {showAddress && (
                        <div className="border border-gray-200 mt-2 rounded bg-white">

                            {addresses.map(a => (
                                <div
                                    key={a._id}
                                    className="p-3 border-b flex justify-between items-center"
                                >

                                    <div
                                        onClick={() => {
                                            setSelectedAddress(a)
                                            setShowAddress(false)
                                        }}
                                        className="cursor-pointer"
                                    >

                                        <p className="text-sm font-medium">
                                            {a.street}, {a.city}
                                        </p>

                                        {a.isDefault && (
                                            <span className="text-xs text-green-600 font-medium">
                                                Default
                                            </span>
                                        )}

                                    </div>

                                    <div className="flex gap-3">

                                        {!a.isDefault && (
                                            <button
                                                onClick={() => setDefaultAddress(a._id)}
                                                disabled={defaultLoading === a._id}
                                                className="text-xs text-blue-600 flex items-center justify-center min-w-[80px]"
                                            >
                                                {defaultLoading === a._id ? (
                                                    <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    "Set Default"
                                                )}
                                            </button>
                                        )}

                                        <button
                                            disabled={deleteLoading === a._id}
                                            onClick={() => {
                                                setDeleteId(a._id);
                                                setShowConfirm(true);
                                            }}
                                            className="text-xs text-red-500 inline-flex items-center gap-1 min-w-[55px]"
                                        >
                                            {deleteLoading === a._id ? (
                                                <span className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                "Delete"
                                            )}
                                        </button>

                                    </div>

                                </div>
                            ))}

                            <button
                                onClick={() => navigate("/add-address")}
                                className="w-full text-left px-3 py-2 text-sm text-primary bg-primary/9 hover:bg-primary/14 rounded-md transition font-medium"
                            >
                                + Add New Address
                            </button>

                        </div>
                    )}



                    <p className="text-xs text-gray-400 uppercase mt-5">Payment</p>
                    <CustomSelect
                        aria-label="Payment method"
                        value={paymentOption}
                        onChange={setPaymentOption}
                        options={[
                            { value: "COD", label: "Cash On Delivery" },
                            { value: "UPI", label: "UPI - Online" },
                        ]}
                        className="mt-1 w-full"
                        triggerClassName="!rounded-md !border-gray-200 !px-3 !py-2 !text-sm"
                    />

                    <div className="flex gap-2 mt-4">
                        <input
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                            placeholder="Coupon code"
                            className="border border-gray-200 rounded px-3 py-2 w-full text-sm outline-none"
                            disabled={discount > 0}
                        />

                        {discount > 0 ? (
                            <button onClick={removeCoupon} className="bg-gray-200 px-4 rounded text-sm">Remove</button>
                        ) : (
                            <button onClick={applyCoupon} className="bg-primary text-white px-4 rounded text-sm">Apply</button>
                        )}
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                        <p className="flex justify-between"><span>Price</span><span>{currency}{cartAmount}</span></p>
                        <p className="flex justify-between">
                            <span>Shipping</span>
                            <span>{deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `${currency}${deliveryCharge}`}</span>
                        </p>
                        {discount > 0 && (
                            <p className="flex justify-between text-green-600">
                                <span>Discount</span><span>-{currency}{discount}</span>
                            </p>
                        )}
                        {appliedRedeem > 0 && (
                            <p className="flex justify-between text-amber-700">
                                <span>Reward points ({appliedRedeem} pts)</span>
                                <span>-{currency}{appliedRedeem}</span>
                            </p>
                        )}
                        <p className="flex justify-between font-semibold text-base pt-2">
                            <span>Total</span><span>{currency}{finalTotal}</span>
                        </p>
                    </div>

                    {user && cartArray.length > 0 && (
                        <div className="mt-4 p-3 rounded-lg border border-amber-200 bg-amber-50/80 text-sm">
                            <p className="font-medium text-gray-800 mb-1">Reward points</p>
                            <p className="text-gray-600 text-xs mb-2">
                                Balance: <span className="font-semibold text-amber-800">{rewardBalance}</span> pts
                                <span className="text-gray-500"> (1 pt = {currency}1 off)</span>
                            </p>
                            <p className="text-xs text-green-700 mb-2">
                                Earn <span className="font-semibold">{pointsEarnedPreview}</span> pts on this order (₹100 = 2 pt, valid 1 year)
                            </p>
                            <div className="flex gap-2 items-center flex-wrap">
                                <input
                                    type="number"
                                    min={0}
                                    max={maxRedeem}
                                    value={redeemPointsInput}
                                    onChange={(e) => {
                                        const n = Math.floor(Number(e.target.value));
                                        if (Number.isNaN(n)) {
                                            setRedeemPointsInput(0);
                                            return;
                                        }
                                        setRedeemPointsInput(Math.min(Math.max(0, n), maxRedeem));
                                    }}
                                    placeholder="0"
                                    className="border border-amber-300 rounded px-2 py-1.5 w-28 text-sm outline-none bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setRedeemPointsInput(maxRedeem)}
                                    disabled={maxRedeem === 0}
                                    className="text-xs px-3 py-1.5 rounded border border-amber-400 text-amber-900 font-medium disabled:opacity-40"
                                >
                                    Use max ({maxRedeem})
                                </button>
                            </div>
                        </div>
                    )}

                    {/* FREE DELIVERY MESSAGE */}

                    {cartAmount > 0 && cartAmount < freeDeliveryTarget && (
                        <p className="text-sm text-green-600 text-center mt-3">
                            🚚 Add <b>{currency}{remainingForFreeDelivery}</b> more to unlock
                            <span className="font-semibold"> FREE delivery</span>
                        </p>
                    )}

                    {cartAmount >= freeDeliveryTarget && (
                        <p className="text-sm text-green-600 text-center mt-3">
                            🎉 You unlocked <span className="font-semibold">FREE delivery</span>
                        </p>
                    )}



                    {paymentOption === "UPI" && finalTotal < 1 && cartArray.length > 0 && (
                        <p className="text-xs text-red-600 mt-3 text-center">
                            UPI needs at least ₹1 payable. Use COD for ₹0 total or reduce reward use.
                        </p>
                    )}

                    <button
                        onClick={placeOrder}
                        disabled={
                            isPlacingOrder ||
                            cartArray.length === 0 ||
                            ordersPaused ||
                            (paymentOption === "UPI" && finalTotal < 1)
                        }
                        className={`w-full py-3 mt-6 rounded-lg font-medium transition disabled:cursor-not-allowed ${
                            ordersPaused
                                ? "bg-emerald-50/90 text-slate-700 ring-1 ring-emerald-200/70 shadow-sm disabled:opacity-90 text-sm leading-snug px-3 py-3.5"
                                : "bg-primary text-white hover:bg-primary-dull disabled:opacity-60"
                        }`}
                    >
                        {cartArray.length === 0
                            ? "Cart is Empty"
                            : ordersPaused
                                ? ORDERS_PAUSED_BUTTON
                                : isPlacingOrder
                                    ? "Placing Order..."
                                    : paymentOption === "COD"
                                        ? "Place Order"
                                        : "Proceed to Pay"}
                    </button>
                    {ordersPaused && (
                        <p className="mt-2.5 text-center text-xs leading-relaxed text-slate-600 px-1">
                            We&apos;re not accepting new orders at the moment.
                        </p>
                    )}
                </div>

            </div>

            {showConfirm && (
                <ConfirmModal
                    message="Delete this address?"
                    onConfirm={confirmDeleteAddress}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {orderSuccessModal && (
                <div
                    className="fixed inset-0 bg-black/45 flex items-center justify-center z-[60] p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="order-success-title"
                >
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-amber-100">
                        <p className="text-4xl mb-2" aria-hidden>🎉</p>
                        <h2 id="order-success-title" className="text-lg font-semibold text-gray-900">
                            Order placed successfully
                        </h2>
                        {orderSuccessModal.pointsEarned > 0 ? (
                            <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                                You earned{" "}
                                <span className="font-bold text-amber-700 tabular-nums">
                                    {orderSuccessModal.pointsEarned}
                                </span>{" "}
                                reward points on this order.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600 mt-3">
                                Thank you for shopping with us.
                            </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                            Your total reward points:{" "}
                            <span className="font-semibold text-gray-800 tabular-nums">
                                {orderSuccessModal.rewardPoints}
                            </span>
                        </p>
                        <button
                            type="button"
                            onClick={closeOrderPlacedModal}
                            className="w-full mt-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:opacity-95 transition"
                        >
                            View my orders
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default Cart;

