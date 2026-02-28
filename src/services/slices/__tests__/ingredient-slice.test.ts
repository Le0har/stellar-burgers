import { describe, expect, test } from '@jest/globals';
import ingredientReducer from '../ingredient-slice';
import { getIngredients } from '../ingredient-slice';

describe('Проверяют редьюсер слайса burgerIngredient', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const testIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa094a',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png'
    }
  ];

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
