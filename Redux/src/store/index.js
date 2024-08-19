import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import orderReducer from "./orderSlice";


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    blogs: blogReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    
   

  },
});
