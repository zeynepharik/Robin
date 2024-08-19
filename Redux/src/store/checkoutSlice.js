import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getOrders = createAsyncThunk("checkout/getOrders", async () => {
  const response = await fetch("http://localhost:3000/orders");
  return response.json();
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    townCity: "",
    state: "",
    zipCode: "",
    cart: [],
    orders: [], 
    status: "idle", 
    error: null, 
  },
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCheckout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = "";
      state.companyName = "";
      state.addressLine1 = "";
      state.addressLine2 = "";
      state.country = "";
      state.townCity = "";
      state.state = "";
      state.zipCode = "";
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateField, setCart, clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
