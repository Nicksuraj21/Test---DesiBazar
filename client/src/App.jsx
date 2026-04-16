// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import { Toaster } from "react-hot-toast";
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Login from './components/Login';
// import AllProducts from './pages/AllProducts';
// import ProductCategory from './pages/ProductCategory';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import AddAddress from './pages/AddAddress';
// import MyOrders from './pages/MyOrders';
// import SellerLogin from './components/seller/SellerLogin';
// import SellerLayout from './pages/seller/SellerLayout';
// import AddProduct from './pages/seller/AddProduct';
// import ProductList from './pages/seller/ProductList';
// import Orders from './pages/seller/Orders';
// import Loading from './components/Loading';

// const App = () => {

//   const isSellerPath = useLocation().pathname.includes("seller");
//   const {showUserLogin, isSeller} = useAppContext()

//   return (
//     <div className='text-default min-h-screen text-gray-700 bg-white'>

//      {isSellerPath ? null : <Navbar/>} 
//      {showUserLogin ? <Login/> : null}

//      <Toaster />

//       <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//         <Routes>
//           <Route path='/' element={<Home/>} />
//           <Route path='/products' element={<AllProducts/>} />
//           <Route path='/products/:category' element={<ProductCategory/>} />
//           <Route path='/products/:category/:id' element={<ProductDetails/>} />
//           <Route path='/cart' element={<Cart/>} />
//           <Route path='/add-address' element={<AddAddress/>} />
//           <Route path='/my-orders' element={<MyOrders/>} />
//           <Route path='/loader' element={<Loading/>} />
//           <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
//             <Route index element={isSeller ? <AddProduct/> : null} />
//             <Route path='product-list' element={<ProductList/>} />
//             <Route path='orders' element={<Orders/>} />
//           </Route>
//         </Routes>
//       </div>
//      {!isSellerPath && <Footer/>}
//     </div>
//   )
// }

// export default App





















// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import { Toaster } from "react-hot-toast";
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Login from './components/Login';
// import AllProducts from './pages/AllProducts';
// import ProductCategory from './pages/ProductCategory';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import AddAddress from './pages/AddAddress';
// import MyOrders from './pages/MyOrders';
// import SellerLogin from './components/seller/SellerLogin';
// import SellerLayout from './pages/seller/SellerLayout';
// import AddProduct from './pages/seller/AddProduct';
// import ProductList from './pages/seller/ProductList';
// import Orders from './pages/seller/Orders';
// import Loading from './components/Loading';

// const App = () => {

//   const isSellerPath = useLocation().pathname.includes("seller");
//   const { showUserLogin, isSeller, loading } = useAppContext(); // ✅ loading added

//   // 🔥 IMPORTANT — Prevent Flicker
//   if (loading) {
//     return (
//       <div className='flex items-center justify-center h-screen'>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className='text-default min-h-screen text-gray-700 bg-white'>

//       {!isSellerPath && <Navbar />} 
//       {showUserLogin && <Login />}

//       <Toaster />

//       <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/products' element={<AllProducts />} />
//           <Route path='/products/:category' element={<ProductCategory />} />
//           <Route path='/products/:category/:id' element={<ProductDetails />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/add-address' element={<AddAddress />} />
//           <Route path='/my-orders' element={<MyOrders />} />

//           <Route 
//             path='/seller' 
//             element={isSeller ? <SellerLayout /> : <SellerLogin />}
//           >
//             <Route index element={isSeller ? <AddProduct /> : null} />
//             <Route path='product-list' element={<ProductList />} />
//             <Route path='orders' element={<Orders />} />
//           </Route>

//         </Routes>
//       </div>

//       {!isSellerPath && <Footer />}

//     </div>
//   );
// };

// export default App;































// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import { Toaster } from "react-hot-toast";
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Login from './components/Login';
// import AllProducts from './pages/AllProducts';
// import ProductCategory from './pages/ProductCategory';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import AddAddress from './pages/AddAddress';
// import MyOrders from './pages/MyOrders';
// import SellerLogin from './components/seller/SellerLogin';
// import SellerLayout from './pages/seller/SellerLayout';
// import AddProduct from './pages/seller/AddProduct';
// import ProductList from './pages/seller/ProductList';
// import Orders from './pages/seller/Orders';
// import Loading from './components/Loading';
// import ScrollToTop from './components/ScrollToTop';

// const App = () => {

//   const isSellerPath = useLocation().pathname.includes("seller");
//   const { showUserLogin, isSeller, loading, sellerLoading } = useAppContext();

//   // 🔥 WAIT until both user + seller check complete
//   if (loading || sellerLoading) {
//     return (
//       <div className='flex items-center justify-center h-screen'>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className='text-default min-h-screen text-gray-700 bg-white'>

//       {!isSellerPath && <Navbar />} 
//       {showUserLogin && <Login />}

//       <Toaster />

//       <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

//          <ScrollToTop />   {/* 🔥 ADDED */}

//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/products' element={<AllProducts />} />
//           <Route path='/products/:category' element={<ProductCategory />} />
//           <Route path='/products/:category/:id' element={<ProductDetails />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/add-address' element={<AddAddress />} />
//           <Route path='/my-orders' element={<MyOrders />} />

//           <Route 
//             path='/seller' 
//             element={isSeller ? <SellerLayout /> : <SellerLogin />}
//           >
//             <Route index element={isSeller ? <AddProduct /> : null} />
//             <Route path='product-list' element={<ProductList />} />
//             <Route path='orders' element={<Orders />} />
//           </Route>

//         </Routes>
//       </div>

//       {!isSellerPath && <Footer />}
//     </div>
//   );
// };

// export default App;
































import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import TopCustomers from './pages/seller/TopCustomers';
import AIMarketing from './pages/seller/AIMarketing';
import RewardPoints from './pages/seller/RewardPoints';
import StoreSettings from './pages/seller/StoreSettings';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import MobileBottomNav from "./components/MobileBottomNav"
import SearchPage from './pages/SearchPage';

const App = () => {

  const location = useLocation();

  const showLocationBanner =
    location.pathname === "/" || location.pathname === "/cart";

  const isSellerPath = location.pathname.includes("seller");
  const pathNorm = (location.pathname.replace(/\/+$/, "") || "/").toLowerCase();
  const isSearchPath = pathNorm === "/search";
  const { showUserLogin, isSeller, loading, sellerLoading, locationBlocked } = useAppContext();

  if (loading || sellerLoading) {
    return (
      <div className="relative isolate min-h-screen min-h-[100dvh]">
        <div className="app-page-gradient" aria-hidden="true" />
        <div className="relative z-[1] flex min-h-screen min-h-[100dvh] items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="text-default relative isolate min-h-screen min-h-[100dvh] text-slate-700">
      <div className="app-page-gradient" aria-hidden="true" />

      <div className="relative z-[1]">

      {!isSellerPath &&
        (isSearchPath ? (
          <div className="max-md:hidden md:contents">
            <Navbar />
          </div>
        ) : (
          <Navbar />
        ))}

      {locationBlocked && showLocationBanner && (
        <div className="flex items-center justify-between border-b border-amber-200/60 bg-amber-50 px-3 py-1.5 text-xs">

          <div className="flex items-center gap-2 text-amber-900">
            <span>📍</span>
            <span className="font-medium">Enable location For Fast Delivery</span>
          </div>

          <button
            onClick={() => {
              if (!navigator.geolocation) {
                alert("Location not supported");
                return;
              }

              navigator.geolocation.getCurrentPosition(
                () => window.location.reload(),
                () => alert("Please enable location from browser settings")
              );
            }}
            className="rounded-md bg-amber-500 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-amber-600/20 transition hover:bg-amber-600"
          >
            Allow
          </button>

        </div>
      )}


      {showUserLogin && <Login />}
      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 max-md:pb-[6.5rem]"}`}
      >
        <ScrollToTop />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:slug' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/profile' element={<Profile />} />

          <Route
            path='/seller'
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='store' element={<StoreSettings />} />
            <Route path='top-customers' element={<TopCustomers />} />
            <Route path='ai-marketing' element={<AIMarketing />} />
            <Route path='reward-points' element={<RewardPoints />} />
          </Route>

        </Routes>
      </div>

      {!isSellerPath && <MobileBottomNav />}

      {!isSellerPath && <Footer />}
      </div>
    </div>
  );
};

export default App;



























// ---------Updated App.jsx (Fast Version)-----------


// import React, { useEffect, useState, Suspense, lazy } from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import { Toaster } from "react-hot-toast";
// import Footer from './components/Footer';
// import { useAppContext } from './context/AppContext';
// import Login from './components/Login';
// import Loading from './components/Loading';
// import ScrollToTop from './components/ScrollToTop';
// import CartBar from "./components/CartBar"

// // 🔥 Lazy load pages
// const Home = lazy(() => import('./pages/Home'))
// const AllProducts = lazy(() => import('./pages/AllProducts'))
// const ProductCategory = lazy(() => import('./pages/ProductCategory'))
// const ProductDetails = lazy(() => import('./pages/ProductDetails'))
// const Cart = lazy(() => import('./pages/Cart'))
// const AddAddress = lazy(() => import('./pages/AddAddress'))
// const MyOrders = lazy(() => import('./pages/MyOrders'))

// // seller
// const SellerLogin = lazy(() => import('./components/seller/SellerLogin'))
// const SellerLayout = lazy(() => import('./pages/seller/SellerLayout'))
// const AddProduct = lazy(() => import('./pages/seller/AddProduct'))
// const ProductList = lazy(() => import('./pages/seller/ProductList'))
// const Orders = lazy(() => import('./pages/seller/Orders'))

// const App = () => {

//   const location = useLocation();
//   const [routeLoading, setRouteLoading] = useState(false);

//   const isSellerPath = location.pathname.includes("seller");
//   const { showUserLogin, isSeller, loading, sellerLoading } = useAppContext();

//   useEffect(() => {
//     setRouteLoading(true);

//     const timer = setTimeout(() => {
//       setRouteLoading(false);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [location]);

//   if (loading || sellerLoading) {
//     return (
//       <div className='flex items-center justify-center h-screen'>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className='text-default min-h-screen text-gray-700 bg-slate-50 relative'>

//       {routeLoading && (
//         <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
//           <Loading />
//         </div>
//       )}

//       {!isSellerPath && <Navbar />}
//       {showUserLogin && <Login />}
//       <Toaster />

//       <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//         <ScrollToTop />

//         {/* 🔥 Suspense loader */}
//         <Suspense fallback={
//           <div className='flex justify-center items-center h-[60vh]'>
//             <Loading/>
//           </div>
//         }>

//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/products' element={<AllProducts />} />
//             <Route path='/products/:category' element={<ProductCategory />} />
//             <Route path='/products/:category/:id' element={<ProductDetails />} />
//             <Route path='/cart' element={<Cart />} />
//             <Route path='/add-address' element={<AddAddress />} />
//             <Route path='/my-orders' element={<MyOrders />} />

//             <Route
//               path='/seller'
//               element={isSeller ? <SellerLayout /> : <SellerLogin />}
//             >
//               <Route index element={isSeller ? <AddProduct /> : null} />
//               <Route path='product-list' element={<ProductList />} />
//               <Route path='orders' element={<Orders />} />
//             </Route>

//           </Routes>

//         </Suspense>

//       </div>

//       <CartBar/>

//       {!isSellerPath && <Footer />}
//     </div>
//   );
// };

// export default App;