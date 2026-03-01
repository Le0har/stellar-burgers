import { describe, expect, test } from '@jest/globals';
import { rootReducer } from '../root-reducer';

describe('Проверяют правильную инициализацию rootReducer', () => {
  test('[#1] Должен инициализироваться с правильными ключами', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toBeInstanceOf(Object);
    expect(state).toHaveProperty('burgerIngredient');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('profileOrders');
  });
});
