import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/db.json"); 
    return response.data.categories; 
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], 
    status: "idle", 
    error: null 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.categories = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.error.message; 
      });
  },
});

export default categorySlice.reducer;
