import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("http://localhost:3000/blogs");
  return response.data;
});


const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],          
    filteredBlogs: [],  
    status: "idle",     
    error: null         
  },
  reducers: {
    
    searchBlogs: (state, action) => {
      const searchKey = action.payload.toLowerCase();
      if (searchKey === "") {
        state.filteredBlogs = state.blogs;
      } else {
        state.filteredBlogs = state.blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchKey)
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
        state.filteredBlogs = action.payload; 
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const getBlogBySlug = (state, slug) => {
  return state.blogs.filteredBlogs.find((item) => item.slug === slug);
};


export const { searchBlogs } = blogSlice.actions;

export default blogSlice.reducer;
