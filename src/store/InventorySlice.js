import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "@c8y/client";

const initialState = {
  loading: false,
  inventory: null,
  error: null
};

export const getInventoryById = createAsyncThunk(
  "inventory/getByID",
  async(id) => {
    const query = {id};
    const inventory = await client.inventory.listQuery(query, {pageSize: -1, withChildren: true });    
    return {inventory: inventory.data};
  }
);

const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getInventoryById.pending, (state) => {
        state.loading = true;
        state.inventory = null;
        state.error = null;
      })
      .addCase(getInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.inventory = null;
        state.error = "Something went wrong! Please try again!";
      });
  }
});

export default InventorySlice.reducer;