import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TOrdersState = {
  orders: Array<TOrder>;
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const getOrders = createAsyncThunk('orders/getAll', async () => getOrdersApi());

const orderSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectProfileOrders: (state) => state
  }
});

export default orderSlice.reducer;
export const { selectProfileOrders } = orderSlice.selectors;
export { getOrders };
