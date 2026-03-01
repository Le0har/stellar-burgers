import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
  selectors: {
    selectIngredients: (state) => state
  }
});

export default ingredientSlice.reducer;
export const { selectIngredients } = ingredientSlice.selectors;
export { getIngredients };
