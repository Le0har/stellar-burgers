import { describe, expect, test } from '@jest/globals';
import profileOrdersReducer from '../profile-orders-slice';
import { getOrders } from '../profile-orders-slice';

describe('Проверяют редьюсер слайса profileOrders', () => {
  const initialState = {
    orders: [],
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
