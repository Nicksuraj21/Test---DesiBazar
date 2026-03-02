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
































import React, { useEffect, useState } from 'react'
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
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

const App = () => {

  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller, loading, sellerLoading } = useAppContext();

  // 🔥 Route change loader
  useEffect(() => {
    setRouteLoading(true);

    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 400); // smooth delay

    return () => clearTimeout(timer);
  }, [location]);

  if (loading || sellerLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white relative'>

      {/* 🔥 ROUTE OVERLAY LOADER */}
      {routeLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}

      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <ScrollToTop />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />

          <Route
            path='/seller'
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>

        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;