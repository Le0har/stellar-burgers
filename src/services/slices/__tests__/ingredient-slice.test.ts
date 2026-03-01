import { describe, expect, test } from '@jest/globals';
import ingredientReducer from '../ingredient-slice';
import { getIngredients, initialState } from '../ingredient-slice';
import { TEST_INGREDIENTS } from './constants';

describe('Проверяют редьюсер слайса burgerIngredient', () => {
  const testIngredients = TEST_INGREDIENTS;

  test('[#1] pending: должен установить loading в true', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientReducer(initialState, action);
    const { ingredients, loading, error } = newState;

    expect(loading).toBe(true);
    expect(error).toBeNull();
    expect(ingredients).toEqual([]);
  });

  test('[#2] fulfilled: должен сохранить ингредиенты и установить loading в false', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: testIngredients
    };
    const newState = ingredientReducer(initialState, action);
    const { ingredients, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(ingredients.length).toBe(3);
    expect(ingredients).toEqual(testIngredients);
  });

  test('[#3] rejected: должен сохранить ошибку и установить loading в false', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = ingredientReducer(initialState, action);
    const { ingredients, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBe('Ошибка загрузки');
    expect(ingredients).toEqual([]);
  });
});
