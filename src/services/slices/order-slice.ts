import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { constructorActions } from '../../services/slices/constructor-slice';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[], { dispatch }) =>
    orderBurgerApi(ingredients).then((response) => {
      dispatch(constructorActions.clearConstructor());
      return response;
    })
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      (state.order = null), (state.loading = false), (state.error = null);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectCreateOrder: (state) => state
  }
});

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const { selectCreateOrder } = orderSlice.selectors;
export { createOrder };
