// src/features/priceRangeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axios/Axios";

// Async thunk to fetch price data from the API
export const fetchPrices = createAsyncThunk(
  "priceRange/fetchPrices",
  async () => {
    try {
      const lowestPriceResponse = await api.get("/products?sort=price");
      const highestPriceResponse = await api.get("/products?sort=-price");
      const doc = lowestPriceResponse.data.data.doc[0];
      const lowestPrice =
        Math.min(doc?.salePrice ?? Infinity, doc?.price ?? Infinity) || 0;
      const highestPrice = highestPriceResponse.data.data.doc[0].price || 0;

      return { minPrice: lowestPrice, maxPrice: highestPrice };
    } catch (error) {
      throw new Error("Failed to fetch price data", error);
    }
  }
);

const priceRangeSlice = createSlice({
  name: "priceRange",
  initialState: {
    minPrice: 0,
    maxPrice: 0,
    selectedRange: [0, 0],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setSelectedRange: (state, action) => {
      state.selectedRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
        state.selectedRange = [
          action.payload.minPrice,
          action.payload.maxPrice,
        ];
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedRange } = priceRangeSlice.actions;

export default priceRangeSlice.reducer;
