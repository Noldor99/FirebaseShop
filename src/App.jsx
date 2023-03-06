import { Box, Container } from "@mui/system";
import React from "react";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";


import NotFoundBlock from "./components/NotFoundBlock";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ResetPassword from "./page/auth/ResetPassword";
import Cart from "./page/Cart";
import CheckoutDetails from "./page/CheckoutDetails";
import Home from "./page/Home";

const App = () => {


  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      
      <Header />
      <Box sx={{ flex: '1 1 auto' }}>
        <Routes>
          <Route path="FirebaseShop" element={<Home />} ></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout-details" element={<CheckoutDetails />} />
          {/*
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/review-product/:id" element={<ReviewProducts />} />    */}

          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </Box>
      <Footer />
    </React.Suspense>
  )
}

export default App