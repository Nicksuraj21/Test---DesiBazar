


// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {

//     const currency = import.meta.env.VITE_CURRENCY;
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isSeller, setIsSeller] = useState(false);
//     const [sellerLoading, setSellerLoading] = useState(true);
//     const [showUserLogin, setShowUserLogin] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [cartItems, setCartItems] = useState({});
//     const [searchQuery, setSearchQuery] = useState({});
//     const [loading, setLoading] = useState(true);

//     // 🔥 VERY IMPORTANT
//     const [cartReady, setCartReady] = useState(false);

//     // ==============================
//     // Fetch Seller
//     // ==============================
//     const fetchSeller = async () => {
//         try {
//             const { data } = await axios.get('/api/seller/is-auth');
//             setIsSeller(data.success);
//         } catch {
//             setIsSeller(false);
//         } finally {
//             setSellerLoading(false);
//         }
//     };

//     // ==============================
//     // Fetch User + Cart
//     // ==============================
//     const fetchUser = async () => {
//         try {
//             const { data } = await axios.get('/api/user/is-auth');

//             if (data.success) {
//                 setUser(data.user);

//                 // 🔥 LOAD CART FROM DB
//                 setCartItems(data.user.cartItems || {});
//             } else {
//                 setUser(null);
//                 setCartItems({});
//             }

//         } catch {
//             setUser(null);
//             setCartItems({});
//         } finally {
//             setLoading(false);
//             setCartReady(true);   // 🔥 CART LOADED
//         }
//     };

//     // ==============================
//     // Fetch Products
//     // ==============================
//     const fetchProducts = async () => {
//         try {
//             const { data } = await axios.get('/api/product/list');
//             if (data.success) setProducts(data.products);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // ==============================
//     // Initial Load
//     // ==============================
//     useEffect(() => {
//         fetchUser();
//         fetchSeller();
//         fetchProducts();
//     }, []);

//     // ==============================
//     // 🔥 CART SYNC (FINAL FIX)
//     // ==============================
//     useEffect(() => {

//         // DO NOT RUN BEFORE CART LOADED
//         if (!cartReady) return;

//         const updateCart = async () => {
//             try {
//                 await axios.post('/api/cart/update', { cartItems });
//             } catch {}
//         };

//         if (user) updateCart();

//     }, [cartItems, cartReady, user]);

//     // ==============================
//     // CART FUNCTIONS
//     // ==============================
//     const addToCart = (itemId) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = (cartData[itemId] || 0) + 1;
//         setCartItems(cartData);
//         toast.success("Added to Cart");
//     };

//     const updateCartItem = (itemId, quantity) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = quantity;
//         setCartItems(cartData);
//     };

//     const removeFromCart = (itemId) => {
//         let cartData = structuredClone(cartItems);

//         if (cartData[itemId] > 1) {
//             cartData[itemId] -= 1;
//         } else {
//             delete cartData[itemId];
//         }

//         setCartItems(cartData);
//     };

//     const getCartCount = () =>
//         Object.values(cartItems).reduce((a, b) => a + b, 0);

//     const getCartAmount = () => {
//         let total = 0;
//         for (const id in cartItems) {
//             const p = products.find(x => x._id === id);
//             if (p) total += p.offerPrice * cartItems[id];
//         }
//         return total;
//     };

//     const value = {
//         navigate,
//         user,
//         setUser,
//         isSeller,
//         setIsSeller,   // 🔥 YE ADD KARO
//         sellerLoading,
//         showUserLogin,
//         setShowUserLogin,
//         products,
//         currency,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         cartItems,
//         searchQuery,
//         setSearchQuery,
//         getCartAmount,
//         getCartCount,
//         axios,
//         fetchProducts,
//         setCartItems,
//         loading
//     };

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     );
// };

// export const useAppContext = () => useContext(AppContext);

















// ✅ Updated AppContext (Only Cart Refresh Fix Added)

import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const FALLBACK_BACKEND_URL = "http://localhost:4000";

const resolveApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_BACKEND_URL;
    if (envUrl == null || String(envUrl).trim() === "") {
        console.error(
            "[DesiBazar] VITE_BACKEND_URL is undefined or empty; using fallback:",
            FALLBACK_BACKEND_URL
        );
        return String(FALLBACK_BACKEND_URL).replace(/\/$/, "");
    }
    return String(envUrl).replace(/\/$/, "");
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = resolveApiBaseUrl();
console.log("[DesiBazar] axios baseURL:", axios.defaults.baseURL);

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const requestLocation = () => {

        if (!navigator.geolocation) {
            setLocationBlocked(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                if (position.coords.accuracy > 100) return;

                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    time: Date.now()
                };

                setLocationBlocked(false); // ⭐ important

                setUserLocation(location);
                localStorage.setItem("userLocation", JSON.stringify(location));

            },

            (error) => {

                if (error.code === 1) {
                    setLocationBlocked(true);
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 60000
            }
        );
    };










    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState(false);
    const [productsRetrying, setProductsRetrying] = useState(false);

    const latestProductsFetchId = useRef(0);

    const [userLocation, setUserLocation] = useState(() => {

        try {

            const saved = JSON.parse(localStorage.getItem("userLocation"));

            if (!saved) return null;

            // 15 min cache
            if (Date.now() - saved.time > 900000) {
                return null;
            }

            return saved;

        } catch {

            return null;

        }

    });

    const [locationBlocked, setLocationBlocked] = useState(false);

    // 🔥 LOAD CART FROM LOCALSTORAGE FIRST
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cartItems");
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [cartReady, setCartReady] = useState(false);

    // ==============================
    // Fetch Seller
    // ==============================
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        } finally {
            setSellerLoading(false);
        }
    };









    const getUserLocation = () => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setUserLocation(location);
                localStorage.setItem("userLocation", JSON.stringify(location));

            },

            (error) => {

                if (error.code === 1) {
                    setLocationBlocked(true);
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 4000,
                maximumAge: 0
            }
        );
    };

    // ==============================
    // Fetch User + Merge Cart
    // ==============================
    const fetchUser = async () => {
        try {

            const { data } = await axios.get('/api/user/is-auth');

            if (data.success) {

                setUser(data.user);

                const dbCart = data.user.cartItems || {};

                // 🔥 MERGE CART (IMPORTANT)
                setCartItems(prev => {

                    const merged = { ...prev };

                    for (const id in dbCart) {
                        merged[id] = Math.max(dbCart[id], prev[id] || 0);
                    }

                    return merged;
                });

            } else {

                setUser(null);

            }

        } catch {

            setUser(null);

        } finally {

            setLoading(false);
            setCartReady(true);

        }
    };

    // ==============================
    // 🔥 Instant reward sync (no refresh)
    // ==============================
    const syncUserFromServer = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');

            if (!data?.success || !data.user) return;

            setUser(data.user);

            // Keep cart in sync with server (used during reward checks too)
            const dbCart = data.user.cartItems || {};
            setCartItems(prev => {
                const merged = { ...prev };
                for (const id in dbCart) {
                    merged[id] = Math.max(dbCart[id], prev[id] || 0);
                }
                return merged;
            });
        } catch {
            // Silent fail: auth cookie invalid/expired ho sakti hai
        }
    };

    // ==============================
    // Fetch Products (retries + latest-request guard)
    // ==============================
    const fetchProducts = useCallback(async () => {
        const requestId = ++latestProductsFetchId.current;

        const isLatest = () => requestId === latestProductsFetchId.current;

        setProductsLoading(true);
        setProductsError(false);
        setProductsRetrying(false);

        const maxAttempts = 3;
        let lastErrorMessage = "Failed to load products";

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            if (!isLatest()) return;

            if (attempt > 0) {
                setProductsRetrying(true);
                await new Promise((r) => setTimeout(r, 1500));
                if (!isLatest()) return;
                setProductsRetrying(false);
            }

            try {
                console.log("[products] API start, attempt", attempt + 1);
                const { data } = await axios.get("/api/product/list");

                if (!isLatest()) return;

                if (data?.success && Array.isArray(data.products)) {
                    setProducts(data.products);
                    setProductsError(false);
                    console.log("[products] API success, count:", data.products.length);
                    if (!isLatest()) return;
                    setProductsLoading(false);
                    setProductsRetrying(false);
                    return;
                }

                console.error("[products] API response success=false or invalid payload");
                lastErrorMessage = "Could not load product list";
            } catch (error) {
                if (!isLatest()) return;
                const msg = error?.message || "Network Error";
                lastErrorMessage = msg;
                console.error("[products] API error:", msg);
            }
        }

        if (!isLatest()) return;

        setProductsError(true);
        toast.error(lastErrorMessage);
        setProductsLoading(false);
        setProductsRetrying(false);
    }, []);

    // ==============================
    // Initial Load (user + seller + location)
    // ==============================
    useEffect(() => {

        fetchUser();
        fetchSeller();

        if (!userLocation) {
            requestLocation();
        }

    }, []);

    // ==============================
    // Products: single fetch on mount (no focus refetch)
    // ==============================
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {

        const handleFocus = () => {

            // fetchProducts() disabled temporarily — was causing duplicate / unstable loads

            // 🔥 points/rewards instant sync when user returns
            syncUserFromServer();

            // refresh location when user returns
            requestLocation();

        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };

    }, []);







    useEffect(() => {

        const interval = setInterval(() => {

            if (document.visibilityState === "visible") {
                requestLocation();
            }

        }, 600000);

        return () => clearInterval(interval);

    }, []);


    // ==============================
    // 🔄 Reward points auto-update
    // ==============================
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                syncUserFromServer();
            }
        }, 60000); // 60s

        return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {

        if (!navigator.permissions) return;

        navigator.permissions.query({ name: "geolocation" }).then(permission => {

            permission.onchange = () => {

                if (permission.state === "granted") {
                    requestLocation();
                }

                if (permission.state === "denied") {
                    setLocationBlocked(true);
                }

            };

        });

    }, []);





    // ==============================
    // 🔥 LOCAL STORAGE SYNC
    // ==============================
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // ==============================
    // 🔥 SERVER CART SYNC (DEBOUNCED)
    // ==============================
    useEffect(() => {

        if (!cartReady || !user) return;

        const timer = setTimeout(async () => {

            try {

                await axios.post('/api/cart/update', { cartItems });

            } catch { }

        }, 500); // debounce

        return () => clearTimeout(timer);

    }, [cartItems, cartReady, user]);

    // ==============================
    // CART FUNCTIONS
    // ==============================
    const addToCart = (itemId) => {

        setCartItems(prev => {

            const cartData = { ...prev };

            cartData[itemId] = (cartData[itemId] || 0) + 1;

            return cartData;

        });

        toast.success("Added to Cart");
    };

    const updateCartItem = (itemId, quantity) => {

        setCartItems(prev => {

            const cartData = { ...prev };

            cartData[itemId] = quantity;

            return cartData;

        });

    };

    const removeFromCart = (itemId) => {

        setCartItems(prev => {

            const cartData = { ...prev };

            if (cartData[itemId] > 1) {
                cartData[itemId] -= 1;
            } else {
                delete cartData[itemId];
            }

            return cartData;

        });

    };

    const getCartCount = () =>
        Object.values(cartItems).reduce((a, b) => a + b, 0);

    const getCartAmount = () => {

        let total = 0;

        for (const id in cartItems) {

            const p = products.find(x => x._id === id);

            if (p) total += p.offerPrice * cartItems[id];

        }

        return total;

    };

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        sellerLoading,
        showUserLogin,
        setShowUserLogin,
        products,
        productsLoading,
        productsError,
        productsRetrying,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts,
        setCartItems,
        loading,
        userLocation,
        setUserLocation,
        getUserLocation,
        locationBlocked,
        requestLocation
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

