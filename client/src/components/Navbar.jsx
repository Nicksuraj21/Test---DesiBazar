


// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     setSearchQuery,
//     searchQuery,
//     getCartCount,
//     axios,
//   } = useAppContext();

//   // 🔒 Lock body scroll when menu open
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   // ❌ Close menu on route change
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   // 🔍 Search redirect
//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       navigate("/products");
//     }
//   }, [searchQuery]);

//   const logout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         toast.success(data.message);
//         setUser(null);
//         navigate("/");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">

//       {/* Logo */}
//       <NavLink to="/">
//         <img className="h-9" src={assets.logo} alt="logo" />
//       </NavLink>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center gap-8">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/products">All Product</NavLink>
//         <NavLink to="/">Contact</NavLink>

//         <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//           <input
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="py-1.5 w-full bg-transparent outline-none"
//             type="text"
//             placeholder="Search products"
//           />
//           <img src={assets.search_icon} className="w-4 h-4" />
//         </div>

//         <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//           <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//           <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//             {getCartCount()}
//           </span>
//         </div>

//         {!user ? (
//           <button
//             onClick={() => setShowUserLogin(true)}
//             className="px-8 py-2 bg-primary text-white rounded-full"
//           >
//             Login
//           </button>
//         ) : (
//           <div className="relative group">
//             <img src={assets.profile_icon} className="w-10 cursor-pointer" />
//             <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
//               <li onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                 My Orders
//               </li>
//               <li onClick={logout} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Mobile Icons */}
//       <div className="flex items-center gap-6 sm:hidden">
//         <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//           <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//           <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//             {getCartCount()}
//           </span>
//         </div>

//         <button onClick={() => setOpen(!open)}>
//           <img src={assets.menu_icon} />
//         </button>
//       </div>

//       {/* Mobile Menu (FIXED) */}
//       {open && (
//         <div className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/products">All Product</NavLink>
//           {user && <NavLink to="/my-orders">My Orders</NavLink>}
//           <NavLink to="/">Contact</NavLink>

//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={logout}
//               className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}

//     </nav>
//   );
// };

// export default Navbar;




































// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
// const [open, setOpen] = useState(false);
// const [showSearch, setShowSearch] = useState(false);
// const location = useLocation();
// const searchRef = useRef();

// const {
// user,
// setUser,
// setShowUserLogin,
// navigate,
// setSearchQuery,
// searchQuery,
// getCartCount,
// axios,
// } = useAppContext();

// // lock scroll when mobile menu open
// useEffect(() => {
// document.body.style.overflow = open ? "hidden" : "auto";
// return () => (document.body.style.overflow = "auto");
// }, [open]);

// // close menu on route change
// useEffect(() => setOpen(false), [location.pathname]);

// // search redirect
// useEffect(() => {
// if (searchQuery.length > 0) navigate("/products");
// }, [searchQuery]);

// // outside click close search
// useEffect(() => {
// const handler = (e) => {
// if (searchRef.current && !searchRef.current.contains(e.target)) {
// setShowSearch(false);
// }
// };
// document.addEventListener("mousedown", handler);
// return () => document.removeEventListener("mousedown", handler);
// }, []);

// const logout = async () => {
// try {
// const { data } = await axios.get("/api/user/logout");
// if (data.success) {
// toast.success(data.message);
// setUser(null);
// navigate("/");
// }
// } catch (error) {
// toast.error(error.message);
// }
// };

// return (
// <>
// {/* NAVBAR */} <nav className="sticky top-0 bg-white z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300">

//     {/* LOGO */}
//     <NavLink to="/">
//       <img className="h-9" src={assets.logo} alt="logo" />
//     </NavLink>

//     {/* DESKTOP MENU */}
//     <div className="hidden sm:flex items-center gap-8">
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/products">All Product</NavLink>
//       <NavLink to="/">Contact</NavLink>

//       {/* DESKTOP SEARCH */}
//       <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//         <input
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="py-1.5 w-full bg-transparent outline-none"
//           type="text"
//           placeholder="Search products"
//         />
//         <img src={assets.search_icon} className="w-4 h-4" />
//       </div>

//       {/* CART */}
//       <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//         <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//         <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//           {getCartCount()}
//         </span>
//       </div>

//       {!user ? (
//         <button
//           onClick={() => setShowUserLogin(true)}
//           className="px-8 py-2 bg-primary text-white rounded-full"
//         >
//           Login
//         </button>
//       ) : (
//         <div className="relative group">
//           <img src={assets.profile_icon} className="w-10 cursor-pointer" />
//           <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
//             <li onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//               My Orders
//             </li>
//             <li onClick={logout} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//               Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>

//     {/* MOBILE ICONS */}
//     <div className="flex items-center gap-6 sm:hidden">

//       {/* SEARCH ICON */}
//       <img
//         src={assets.search_icon}
//         className="w-5 cursor-pointer"
//         onClick={() => setShowSearch(!showSearch)}
//       />

//       {/* CART */}
//       <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//         <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//         <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//           {getCartCount()}
//         </span>
//       </div>

//       {/* MENU */}
//       <button onClick={() => setOpen(!open)}>
//         <img src={assets.menu_icon} />
//       </button>
//     </div>

//     {/* MOBILE MENU */}


//     {/* {open && (
//       <div className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/products">All Product</NavLink>
//         {user && <NavLink to="/my-orders">My Orders</NavLink>}
//         <NavLink to="/">Contact</NavLink>
//       </div>
//     )} */}






//       {/* Mobile Menu (FIXED) */}
//       {open && (
//         <div className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/products">All Product</NavLink>
//           {user && <NavLink to="/my-orders">My Orders</NavLink>}
//           <NavLink to="/">Contact</NavLink>

//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={logout}
//               className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}





//   </nav>

//   {/* SMALL SEARCH POPUP */}
//   {showSearch && (
//     <div className="absolute top-[72px] left-0 w-full flex justify-center sm:hidden z-50">
//       <div
//         ref={searchRef}
//         className="bg-white w-[92%] border border-gray-200 rounded-full shadow-md px-4 py-3 flex items-center gap-2"
//       >
//         <input
//           autoFocus
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search products..."
//           className="flex-1 outline-none text-sm"
//         />
//         <img
//           src={assets.close_icon}
//           className="w-4 cursor-pointer opacity-60"
//           onClick={() => setShowSearch(false)}
//         />
//       </div>
//     </div>
//   )}
// </>

// );
// };

// export default Navbar;






































// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const location = useLocation();
//   const searchRef = useRef();
//   const menuRef = useRef(); // 👈 NEW

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     setSearchQuery,
//     searchQuery,
//     getCartCount,
//     axios,
//   } = useAppContext();

//   // lock scroll when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   // close menu on route change
//   useEffect(() => setOpen(false), [location.pathname]);

//   // search redirect
//   useEffect(() => {
//     if (searchQuery.length > 0) navigate("/products");
//   }, [searchQuery]);

//   // outside click close search
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // 🔥 outside click close hamburger
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const logout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         toast.success(data.message);
//         setUser(null);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="sticky top-0 bg-white z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300">

//         {/* LOGO */}
//         <NavLink to="/">
//           <img className="h-9" src={assets.logo} alt="logo" />
//         </NavLink>

//         {/* DESKTOP MENU */}
//         <div className="hidden sm:flex items-center gap-8">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/products">All Product</NavLink>
//           {/* <NavLink to="/">Contact</NavLink> */}
//           <a
//             href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Contact
//           </a>


//           <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//             <input
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="py-1.5 w-full bg-transparent outline-none"
//               type="text"
//               placeholder="Search products"
//             />
//             <img src={assets.search_icon} className="w-4 h-4" />
//           </div>

//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="px-8 py-2 bg-primary text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="relative group">
//               <img src={assets.profile_icon} className="w-10 cursor-pointer" />
//               <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
//                 <li onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                   My Orders
//                 </li>
//                 <li onClick={logout} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* MOBILE ICONS */}
//         <div className="flex items-center gap-6 sm:hidden">

//           {/* SEARCH ICON */}
//           <img
//             src={assets.search_icon}
//             className="w-5 cursor-pointer"
//             onClick={() => setShowSearch(!showSearch)}
//           />

//           {/* CART */}
//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           {/* MENU */}
//           <button onClick={() => {
//             setOpen(!open);
//             setShowSearch(false);
//           }}>
//             <img src={assets.menu_icon} />
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {open && (
//           <div
//             ref={menuRef}
//             className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50"
//           >
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/products">All Product</NavLink>
//             {user && <NavLink to="/my-orders">My Orders</NavLink>}
//             {/* <NavLink to="/">Contact</NavLink> */}
//             <a
//               href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => setOpen(false)}   // menu band hoga
//             >
//               Contact
//             </a>


//             {!user ? (
//               <button
//                 onClick={() => setShowUserLogin(true)}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* SMALL SEARCH POPUP */}
//       {showSearch && (
//         <div className="absolute top-[72px] left-0 w-full flex justify-center sm:hidden z-50">
//           <div
//             ref={searchRef}
//             className="bg-white w-[92%] border border-gray-200 rounded-full shadow-md px-4 py-3 flex items-center gap-2"
//           >
//             <input
//               autoFocus
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 outline-none text-sm"
//             />
//             <img
//               src={assets.close_icon}
//               className="w-4 cursor-pointer opacity-60"
//               onClick={() => setShowSearch(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
























// -------------------------Perfect code navbaar hil raha hai ---------------------------


// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const location = useLocation();
//   const searchRef = useRef();
//   const menuRef = useRef();

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     setSearchQuery,
//     searchQuery,
//     getCartCount,
//     axios,
//   } = useAppContext();

//   // lock scroll when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   // close menu on route change
//   useEffect(() => setOpen(false), [location.pathname]);

//   // 🔥 RESET SEARCH ON ROUTE CHANGE (BUG FIX)
//   useEffect(() => {
//     setSearchQuery("");
//     setShowSearch(false);
//   }, [location.pathname]);

//   // search redirect
//   useEffect(() => {
//     if (searchQuery.length > 0) navigate("/products");
//   }, [searchQuery]);

//   // outside click close search
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // outside click close hamburger
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const logout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         toast.success(data.message);
//         setUser(null);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="sticky top-0 bg-white z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300">

//         {/* LOGO */}
//         <NavLink to="/">
//           <img className="h-9" src={assets.logo} alt="logo" />
//         </NavLink>

//         {/* DESKTOP MENU */}
//         <div className="hidden sm:flex items-center gap-8">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/products">All Product</NavLink>

//           <a
//             href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Contact
//           </a>

//           <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//             <input
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="py-1.5 w-full bg-transparent outline-none"
//               type="text"
//               placeholder="Search products"
//             />
//             <img src={assets.search_icon} className="w-4 h-4" />
//           </div>

//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="px-8 py-2 bg-primary text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="relative group">
//               <img src={assets.profile_icon} className="w-10 cursor-pointer" />
//               <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
//                 <li onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                   My Orders
//                 </li>
//                 <li onClick={logout} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* MOBILE ICONS */}
//         <div className="flex items-center gap-6 sm:hidden">

//           <img
//             src={assets.search_icon}
//             className="w-5 cursor-pointer"
//             onClick={() => setShowSearch(!showSearch)}
//           />

//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           <button onClick={() => {
//             setOpen(!open);
//             setShowSearch(false);
//           }}>
//             <img src={assets.menu_icon} />
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {open && (
//           <div
//             ref={menuRef}
//             className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50"
//           >
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/products">All Product</NavLink>
//             {user && <NavLink to="/my-orders">My Orders</NavLink>}

//             <a
//               href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => setOpen(false)}
//             >
//               Contact
//             </a>

//             {!user ? (
//               <button
//                 onClick={() => setShowUserLogin(true)}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* SMALL SEARCH POPUP */}
//       {showSearch && (
//         <div className="absolute top-[72px] left-0 w-full flex justify-center sm:hidden z-50">
//           <div
//             ref={searchRef}
//             className="bg-white w-[92%] border border-gray-200 rounded-full shadow-md px-4 py-3 flex items-center gap-2"
//           >
//             <input
//               autoFocus
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 outline-none text-sm"
//             />

//             <img
//               src={assets.close_icon}
//               className="w-4 cursor-pointer opacity-60"
//               onClick={() => setShowSearch(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

































import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();
  const menuButtonRef = useRef(null);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/products") {
      setSearchQuery("");
    }
  }, [location.pathname, setSearchQuery]);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) return;
      const t = e.target;
      if (menuRef.current.contains(t)) return;
      // Toggle button is outside the dropdown DOM; ignore those so close icon + toggle work.
      if (menuButtonRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Fixed header: avoids sticky breaking inside nested layouts / WebView scroll */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-emerald-200/40 bg-white/95 pt-[env(safe-area-inset-top,0px)] shadow-sm shadow-emerald-900/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 md:bg-white/90">
        <nav className="mx-auto flex w-full min-w-0 max-w-[100vw] items-center justify-between px-6 py-3.5 md:px-16 md:py-4 lg:px-24 xl:px-32">
        {/* LOGO */}
        <NavLink to="/" onClick={() => setOpen(false)} className="shrink-0">
          <img className="h-9" src={assets.logo} alt="logo" />
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden min-w-0 sm:flex sm:items-center sm:gap-8">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>

          <a
            href="https://wa.me/918228950308?text=Hi%20DesiBazar%20team,%20I%20want%20to%20order.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>

          <NavLink
            to="/search"
            onClick={() => setOpen(false)}
            className="hidden min-w-[12rem] max-w-[14rem] items-center gap-2 rounded-full border border-emerald-200/60 bg-white/50 px-3 py-1.5 text-sm text-slate-400 backdrop-blur-sm transition hover:border-emerald-300/80 hover:bg-white/80 lg:flex"
          >
            <span className="min-w-0 flex-1 truncate py-0.5">Search products…</span>
            <img src={assets.search_icon} className="h-4 w-4 shrink-0 opacity-70" alt="" />
          </NavLink>

          <div
            onClick={() => {
              setOpen(false);
              navigate("/cart");
            }}
            className="relative cursor-pointer"
          >
            <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="rounded-full bg-gradient-to-r from-primary to-primary-dull px-8 py-2 text-white shadow-md shadow-emerald-600/25 transition hover:shadow-lg hover:shadow-emerald-600/30"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10 cursor-pointer" />
              <ul className="absolute top-10 right-0 z-50 hidden w-40 rounded-xl border border-emerald-100/60 bg-white/95 py-2 text-sm shadow-xl shadow-emerald-900/10 backdrop-blur-xl group-hover:block">
                <li onClick={() => navigate("/profile")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
                  My Profile
                </li>
                <li onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
                  My Orders
                </li>
                <li onClick={logout} className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* MOBILE ICONS (no top cart — cart is on bottom nav) */}
        <div className="flex shrink-0 items-center gap-4 sm:hidden sm:gap-6">

          <NavLink
            to="/search"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center"
            aria-label="Search"
          >
            <img src={assets.search_icon} alt="" className="h-5 w-5" />
          </NavLink>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <img src={open ? assets.close_icon : assets.menu_icon} alt="" className="pointer-events-none h-6 w-6" />
          </button>
        </div>
        </nav>

        {/* MOBILE MENU: absolute top-full = nav ke neeche chipke, fixed+rem calc gap nahi banega */}
        {open && (
          <div
            ref={menuRef}
            className="absolute inset-x-0 top-full z-50 flex max-h-[min(72vh,calc(100dvh-env(safe-area-inset-top,0px)-5rem))] w-full flex-col gap-3 overflow-y-auto overflow-x-hidden border-b border-emerald-200/40 bg-white/95 px-6 pb-4 pt-0 text-sm shadow-lg shadow-emerald-900/10 backdrop-blur-xl sm:hidden"
          >
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>

            <NavLink to="/products" onClick={() => setOpen(false)}>
              All Product
            </NavLink>

            {user && (
              <>
                <NavLink to="/profile" onClick={() => setOpen(false)}>
                  My Profile
                </NavLink>
                <NavLink to="/my-orders" onClick={() => setOpen(false)}>
                  My Orders
                </NavLink>
              </>
            )}

            <a
              href="https://wa.me/918228950308?text=Hi%20DesiBazar%20team,%20I%20want%20to%20order.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>

            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="mt-2 rounded-full bg-gradient-to-r from-primary to-primary-dull px-6 py-2 text-white shadow-md shadow-emerald-600/25"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="mt-2 rounded-full bg-gradient-to-r from-primary to-primary-dull px-6 py-2 text-white shadow-md shadow-emerald-600/25"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Space for fixed header (safe area + bar height) */}
      <div
        className="w-full shrink-0 [height:calc(env(safe-area-inset-top,0px)+4.40rem)] md:[height:calc(env(safe-area-inset-top,0px)+4.6rem)]"
        aria-hidden="true"
      />

    </>
  );
};

export default Navbar;



















































// ----------------------search logic bala navbaar-------------------------


// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// /* 🔹 Synonym Map */
// const SEARCH_SYNONYMS = {
//   aam: "mango",
//   seb: "apple",
//   kela: "banana",
//   nimbu: "lemon",
//   tamatar: "tomato",
//   pyaj: "onion",
//   panir: "paneer",
//   aalu: "potato",
// };

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchInput, setSearchInput] = useState(""); // 👈 NEW

//   const location = useLocation();
//   const searchRef = useRef(null);
//   const menuRef = useRef(null);

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     setSearchQuery,
//     searchQuery,
//     getCartCount,
//     axios,
//   } = useAppContext();

//   /* 🔍 SEARCH HANDLER (NO INPUT OVERRIDE) */
//   const handleSearch = (value) => {
//     setSearchInput(value);

//     const query = value.toLowerCase().trim();
//     if (!query) {
//       setSearchQuery("");
//       return;
//     }

//     const matchedKey = Object.keys(SEARCH_SYNONYMS).find((key) =>
//       key.startsWith(query)
//     );

//     setSearchQuery(matchedKey ? SEARCH_SYNONYMS[matchedKey] : query);
//   };

//   /* 🔒 LOCK SCROLL WHEN MENU OPEN */
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   /* 📍 CLOSE MENU ON ROUTE CHANGE */
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   /* 🔄 RESET SEARCH ON ROUTE CHANGE */
//   useEffect(() => {
//     setSearchInput("");
//     setSearchQuery("");
//     setShowSearch(false);
//   }, [location.pathname, setSearchQuery]);

//   /* 🚀 NAVIGATE TO PRODUCTS (DEBOUNCED) */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery && location.pathname !== "/products") {
//         navigate("/products");
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, navigate, location.pathname]);

//   /* ❌ CLOSE SEARCH ON OUTSIDE CLICK */
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* ❌ CLOSE MENU ON OUTSIDE CLICK */
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const logout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         toast.success(data.message);
//         setUser(null);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="sticky top-0 bg-white z-40 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300">
//         {/* LOGO */}
//         <NavLink to="/">
//           <img className="h-9" src={assets.logo} alt="logo" />
//         </NavLink>

//         {/* DESKTOP MENU */}
//         <div className="hidden sm:flex items-center gap-8">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/products">All Product</NavLink>

//           <a
//             href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Contact
//           </a>

//           {/* DESKTOP SEARCH */}
//           <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//             <input
//               value={searchInput}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="py-1.5 w-full bg-transparent outline-none"
//               type="text"
//               placeholder="Search products"
//             />
//             <img src={assets.search_icon} className="w-4 h-4" />
//           </div>

//           {/* CART */}
//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           {/* AUTH */}
//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="px-8 py-2 bg-primary text-white rounded-full"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="relative group">
//               <img src={assets.profile_icon} className="w-10 cursor-pointer" />
//               <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
//                 <li
//                   onClick={() => navigate("/my-orders")}
//                   className="px-3 py-2 hover:bg-primary/10 cursor-pointer"
//                 >
//                   My Orders
//                 </li>
//                 <li
//                   onClick={logout}
//                   className="px-3 py-2 hover:bg-primary/10 cursor-pointer"
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* MOBILE ICONS */}
//         <div className="flex items-center gap-6 sm:hidden">
//           <img
//             src={assets.search_icon}
//             className="w-5 cursor-pointer"
//             onClick={() => setShowSearch(true)}
//           />

//           <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
//             <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
//             <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
//               {getCartCount()}
//             </span>
//           </div>

//           <button onClick={() => setOpen(!open)}>
//             <img src={assets.menu_icon} />
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {open && (
//           <div
//             ref={menuRef}
//             className="fixed top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50"
//           >
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/products">All Product</NavLink>
//             {user && <NavLink to="/my-orders">My Orders</NavLink>}

//             <a
//               href="https://wa.me/919065735692?text=Hi%20I%20want%20to%20contact%20you"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Contact
//             </a>

//             {!user ? (
//               <button
//                 onClick={() => setShowUserLogin(true)}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="mt-2 px-6 py-2 bg-primary text-white rounded-full"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* MOBILE SEARCH */}
//       {showSearch && (
//         <div className="absolute top-[72px] left-0 w-full flex justify-center sm:hidden z-50">
//           <div
//             ref={searchRef}
//             className="bg-white w-[92%] border border-gray-200 rounded-full shadow-md px-4 py-3 flex items-center gap-2"
//           >
//             <input
//               autoFocus
//               value={searchInput}
//               onChange={(e) => handleSearch(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 outline-none text-sm"
//             />
//             <img
//               src={assets.close_icon}
//               className="w-4 cursor-pointer opacity-60"
//               onClick={() => setShowSearch(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


// -----------------------------------------------------------------------------------