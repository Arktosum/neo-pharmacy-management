import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  posts: [],
  count: 0,
};
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchStuff = createAsyncThunk("posts/fetchStuff", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStuff.fulfilled, (state, action) => {
      state.posts = action.payload
    });
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
