import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    let url = "http://localhost:3000/products";
    if (category && category !== 'all') {
      url += `?${category}=true`; 
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    
    filteredProducts: [], 
    cart: [],
    wishlist: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!state.cart.find(item => item.id === product.id)) {
        state.cart.push(product);
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    addToWishlist(state, action) {
      const product = action.payload;
      if (!state.wishlist.find(item => item.id === product.id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist(state, action) {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload; 
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, addToWishlist, removeFromWishlist } = productsSlice.actions;

export const getProductBySlug = (state, slug) => {
  return state.products.products.find((product) => product.slug === slug);
};

export default productsSlice.reducer;
