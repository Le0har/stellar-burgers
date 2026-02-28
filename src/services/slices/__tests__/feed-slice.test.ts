import { describe, expect, test } from '@jest/globals';
import feedReducer from '../feed-slice';
import { getFeeds } from '../feed-slice';

describe('Проверяют редьюсер слайса feed', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const testOrders = [
    {
      _id: '034535',
      status: 'done',
      name: 'Interstellar бургер',
      createdAt: '2025-02-23',
      updatedAt: '2025-02-23',
      number: 12,
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
    },
    {
      _id: '034536',
      status: 'done',
      name: 'Death Star Starship Main бургер',
      createdAt: '2025-02-23',
      updatedAt: '2025-02-23',
      number: 13,
      ingredients: ['ingredient1', 'ingredient4', 'ingredient5']
    }
  ];

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
