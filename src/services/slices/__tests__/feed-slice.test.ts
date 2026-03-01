import { describe, expect, test } from '@jest/globals';
import feedReducer from '../feed-slice';
import { getFeeds, initialState } from '../feed-slice';
import { TEST_ORDERS } from './constants';

describe('Проверяют редьюсер слайса feed', () => {
  const testOrders = TEST_ORDERS;

  test('[#1] pending: должен установить loading в true', () => {
    const action = { type: getFeeds.pending.type };
    const newState = feedReducer(initialState, action);
    const { orders, loading, error } = newState;

    expect(loading).toBe(true);
    expect(error).toBeNull();
    expect(orders).toEqual([]);
  });

  test('[#2] fulfilled: должен сохранить ингредиенты и установить loading в false', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: { orders: testOrders, total: 100, totalToday: 25 }
    };
    const newState = feedReducer(initialState, action);
    const { orders, total, totalToday, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(orders.length).toBe(2);
    expect(orders).toEqual(testOrders);
    expect(total).toBe(100);
    expect(totalToday).toBe(25);
  });

  test('[#3] rejected: должен сохранить ошибку и установить loading в false', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = feedReducer(initialState, action);
    const { orders, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBe('Ошибка загрузки');
    expect(orders).toEqual([]);
  });
});
