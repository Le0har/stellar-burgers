import { describe, expect, test } from '@jest/globals';
import orderReducer from '../order-slice';
import { createOrder } from '../order-slice';

describe('Проверяют редьюсер слайса order', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  const testOrder = {
    _id: '034535',
    status: 'done',
    name: 'Interstellar бургер',
    createdAt: '2025-02-23',
    updatedAt: '2025-02-23',
    number: 12,
    ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
  };

  test('[#1] pending: должен установить loading в true', () => {
    const action = { type: createOrder.pending.type };
    const newState = orderReducer(initialState, action);
    const { order, loading, error } = newState;

    expect(loading).toBe(true);
    expect(error).toBeNull();
    expect(order).toBeNull();
  });

  test('[#2] fulfilled: должен сохранить ингредиенты и установить loading в false', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: testOrder }
    };
    const newState = orderReducer(initialState, action);
    const { order, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(order).not.toBeNull();
    expect(order).toEqual(testOrder);
  });

  test('[#3] rejected: должен сохранить ошибку и установить loading в false', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = orderReducer(initialState, action);
    const { order, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBe('Ошибка загрузки');
    expect(order).toBeNull();
  });
});
