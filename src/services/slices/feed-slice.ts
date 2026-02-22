import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedsState = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const getFeeds = createAsyncThunk('feeds/getAll', async () => getFeedsApi());

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectFeeds: (state) => state
  }
});

export default feedSlice.reducer;
export const { selectFeeds } = feedSlice.selectors;
export { getFeeds };
