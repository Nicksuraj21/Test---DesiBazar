
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

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
    const [isLocating, setIsLocating] = useState(false); // 👈 ADD THIS
    const [isLiveSharing, setIsLiveSharing] = useState(false);
    const liveWatchIdRef = useRef(null);

    const cartAmount = getCartAmount();
    const deliveryCharge = cartAmount < 100 && cartAmount > 0 ? 40 : 0;

    // ✅ Custom confirm)
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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

    const finalTotal = cartAmount + deliveryCharge - discount;

    const freeDeliveryTarget = 100;
    const remainingForFreeDelivery = freeDeliveryTarget - cartAmount;

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

        try {

            // const location = await requestLocationBeforeOrder();

            // 🔥 CREATE ORDER (UPI)
            const { data } = await axios.post(
                "/api/payment/create-upi-order",
                {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id,
                    coupon
                },
                { withCredentials: true }
            );
            if (!data.success) {
                toast.error(data.message);
                return;
            }

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
                            toast.success("Payment Successful 🎉");
                            setCartItems({});
                            navigate("/my-orders");
                        } else {
                            toast.error("Payment verification failed");
                        }

                    } catch (err) {
                        toast.error("Payment verify error");
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

            setIsPlacingOrder(false);

            rzp.open();

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

        if (isPlacingOrder) return;

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
                    location
                });

                if (data.success) {

                    setCartItems({});
                    toast.success("Order placed successfully");

                    const orderId = data.orderId;

                    requestLocationBeforeOrder()
                        .then(loc => {
                            axios.post("/api/order/update-location", {
                                orderId,
                                location: loc
                            });
                        })
                        .catch(() => { });

                    navigate("/my-orders");
                }

            } else {

                await handleUpiPayment();

            }

        } catch (error) {
            toast.error("Order failed");
        } finally {
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
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                        scrollTo(0, 0);
                                    }}
                                    className="cursor-pointer w-24 h-24 border border-gray-200 rounded-lg bg-white flex items-center justify-center"
                                >
                                    <img src={product.image[0]} className="h-full object-cover" />
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
                                className="w-full text-xs px-2.5 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition font-medium text-center"
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
                    <select
                        onChange={e => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 mt-1 text-sm outline-none"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="UPI">UPI - Online</option>
                    </select>

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
                        <p className="flex justify-between font-semibold text-base pt-2">
                            <span>Total</span><span>{currency}{finalTotal}</span>
                        </p>
                    </div>


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



                    <button
                        onClick={placeOrder}
                        disabled={isPlacingOrder || cartArray.length === 0}
                        className="w-full py-3 mt-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {cartArray.length === 0
                            ? "Cart is Empty"
                            : isPlacingOrder
                                ? "Placing Order..."
                                : paymentOption === "COD"
                                    ? "Place Order"
                                    : "Proceed to Pay"}
                    </button>
                </div>

            </div>

            {showConfirm && (
                <ConfirmModal
                    message="Delete this address?"
                    onConfirm={confirmDeleteAddress}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

        </>
    );
};

export default Cart;

