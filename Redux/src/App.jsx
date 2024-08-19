import React, { Component } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import About from "./components/About";
import Blog from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import OrderTracking from "./components/OrderTracking";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";

import { addToCart, removeFromCart } from './store/productSlice';
import { addToWishlist, removeFromWishlist } from './store/productSlice';

import { fetchProductsByCategory } from './store/productSlice';
import { getProductBySlug } from './store/productSlice';
import { getBlogBySlug } from './store/blogSlice';
import { searchBlogs } from './store/blogSlice';
import { clearCart } from './store/cartSlice';
import { fetchOrders } from './store/orderSlice';

const App = () => {
  const dispatch = useDispatch();

  
  const cart = useSelector(state => state.products.cart);
  const wishlist = useSelector(state => state.products.wishlist);
  const products = useSelector(state => state.products.products);
  const filteredProducts = useSelector(state => state.products.filteredProducts);
  const categories = useSelector(state => state.products.categories);
  const blogs = useSelector(state => state.blogs.blogs);
  const orders = useSelector(state => state.orders.orders);

  return (
    <>
      <Header
        cart={cart}
        removeToCart={(product) => dispatch(removeFromCart(product.id))}
        wishlist={wishlist}
        removeToWishlist={(product) => dispatch(removeFromWishlist(product.id))}
        categories={categories}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              blogs={blogs}
              filterProducts={(status) => dispatch(filterProducts(status))}
              products={products}
              addToCart={(product) => dispatch(addToCart(product))}
              addToWishlist={(product) => dispatch(addToWishlist(product))}
            />
          }
        />
        <Route
          path="/product/:slug"
          element={
            <ProductDetails
              products={products}
              addToCart={(product) => dispatch(addToCart(product))}
              getProductBySlug={(slug) => dispatch(getProductBySlug(slug))}
              addToWishlist={(product) => dispatch(addToWishlist(product))}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/blog/:slug"
          element={<BlogDetails getBlogBySlugs={(slug) => dispatch(getBlogBySlugs(slug))} />}
        />
        <Route
          path="/blog"
          element={
            <Blog
              blogs={blogs}
              searchBlogs={(query) => dispatch(searchBlogs(query))}
            />
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeToCart={(product) => dispatch(removeFromCart(product.id))}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={() => dispatch(clearCart())}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeToWishlist={(product) => dispatch(removeFromWishlist(product.id))}
              addToCart={(product) => dispatch(addToCart(product))}
            />
          }
        />
        <Route
          path="/ordertracking"
          element={
            <OrderTracking
              orders={orders}
              products={products}
              fetchOrders={() => dispatch(fetchOrders())}
            />
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <Categories
              categories={categories}
              getProducts={(categoryId) => dispatch(fetchProductsByCategory(categoryId))}
              products={products}
              addToCart={(product) => dispatch(addToCart(product))}
              addToWishlist={(product) => dispatch(addToWishlist(product))}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;


