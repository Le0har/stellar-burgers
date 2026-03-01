import { describe, expect, test } from '@jest/globals';
import userReducer from '../user-slice';
import { loginUser, logoutUser, initialState } from '../user-slice';
import { TEST_USER } from './constants';

describe('Проверяют редьюсер слайса user', () => {
  const testUser = TEST_USER;

  const testStateWithUser = {
    user: testUser,
    loading: false,
    error: null
  };

  test('[#1] loginUser.pending: должен установить loading в true', () => {
    const action = { type: loginUser.pending.type };
    const newState = userReducer(initialState, action);
    const { user, loading, error } = newState;

    expect(loading).toBe(true);
    expect(error).toBeNull();
    expect(user).toBeNull();
  });

  test('[#2] loginUser.fulfilled: должен сохранить ингредиенты и установить loading в false', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: testUser }
    };
    const newState = userReducer(initialState, action);
    const { user, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBeNull();
    expect(user).not.toBeNull();
    expect(user).toEqual(testUser);
  });

  test('[#3] loginUser.rejected: должен сохранить ошибку и установить loading в false', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const newState = userReducer(initialState, action);
    const { user, loading, error } = newState;

    expect(loading).toBe(false);
    expect(error).toBe('Ошибка загрузки');
    expect(user).toBeNull();
  });

  test('[#4] logoutUser.fulfilled: должен очистить user', () => {
    const action = { type: logoutUser.fulfilled.type };
    const newState = userReducer(testStateWithUser, action);

    expect(newState.user).toBeNull();
  });
});
