


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

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [userLocation, setUserLocation] = useState(() => {
        try {
            const saved = localStorage.getItem("userLocation");
            return saved ? JSON.parse(saved) : null;
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

    const [searchQuery, setSearchQuery] = useState({});
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


    // ==============================
    // LOCATION PERMISSION CHECK
    // ==============================
    const checkLocationPermission = async () => {

        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }

        try {

            const permission = await navigator.permissions.query({
                name: "geolocation"
            });

            if (permission.state === "granted") {

                getUserLocation();

            } else if (permission.state === "prompt") {

                getUserLocation();

            } else if (permission.state === "denied") {

                setLocationBlocked(true);

            }

        } catch {
            getUserLocation();
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
    // Fetch Products
    // ==============================
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) setProducts(data.products);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ==============================
    // Initial Load
    // ==============================
    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
        checkLocationPermission();
    }, []);

    useEffect(() => {

        const handleFocus = () => {
            fetchProducts();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };

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
        locationBlocked
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

