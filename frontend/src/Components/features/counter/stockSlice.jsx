import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  stockItems : [],
  filterBy : 'asc'
};

const GET_STOCK_URL = "http://localhost:3000/api/stocks/";
const ADD_STOCK_URL = "http://localhost:3000/api/stocks/";
const UPDATE_STOCK_URL = "http://localhost:3000/api/stocks/";
const DELETE_STOCK_URL = "http://localhost:3000/api/stocks/";

export const getStock = createAsyncThunk("getStock", async () => {
  try {
    const response = await axios.get(GET_STOCK_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addStockItem = createAsyncThunk("addStockItem", async (data) => {
    try {
        const response = await axios.post(ADD_STOCK_URL,data);
        return response.data;
      } catch (err) {
        return err.message;
      }
})

export const updateStockItem = createAsyncThunk("updateStockItem", async (formData) => {
    try {
        const response = await axios.put(UPDATE_STOCK_URL,formData);
        return response.data;
      } catch (err) {
        return err.message;
      }
})

export const deleteStockItem = createAsyncThunk("deleteStockItem", async (id) => {
    try {
        const response = await axios.delete(DELETE_STOCK_URL+id);
        return response.data;
      } catch (err) {
        return err.message;
      }
})

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(getStock.fulfilled, (state, action) => {
        let items = [];
        for(let id in action.payload) {
            items.push({...action.payload[id]});
        }
      state.stockItems = items
    });
    builder.addCase(addStockItem.fulfilled, (state, action) => {
      state.stockItems = [...state.stockItems,action.payload]
    });
    builder.addCase(updateStockItem.fulfilled, (state, action) => {
        state.stockItems = state.stockItems.map((item)=>{
            if(item.id === action.payload.id) return action.payload
            return item;
        })
      });
    builder.addCase(deleteStockItem.fulfilled, (state, action) => {
        state.stockItems = state.stockItems.filter((item)=>item.id !== action.payload.id)
      });
      
    
  },
});

export const {  } = stockSlice.actions;

export default stockSlice.reducer;
