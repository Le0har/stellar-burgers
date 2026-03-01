import { describe, expect, test } from '@jest/globals';
import profileOrdersReducer from '../profile-orders-slice';
import { getOrders, initialState } from '../profile-orders-slice';
import { TEST_ORDERS } from './constants';

describe('Проверяют редьюсер слайса profileOrders', () => {
  const testOrders = TEST_ORDERS;

  test('[#1] pending: должен установить loading в true', () => {
    const action = { type: getOrders.pending.type };
    const newState = profileOrdersReducer(initialState, action);
    const { orders, loading, error } = newState;

    expect(loading).toBe(true);
    expect(error).toBeNull();
    expect(orders).toEqual([]);
  });

  test('[#2] fulfilled: должен сохранить ингредиенты и установить loading в false', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: testOrders
    };
    const newState = profileOrdersReducer(initialState, action);
    const { orders, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(orders.length).toBe(2);
    expect(orders).toEqual(testOrders);
  });

  test('[#3] rejected: должен сохранить ошибку и установить loading в false', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = profileOrdersReducer(initialState, action);
    const { orders, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBe('Ошибка загрузки');
    expect(orders).toEqual([]);
  });
});
