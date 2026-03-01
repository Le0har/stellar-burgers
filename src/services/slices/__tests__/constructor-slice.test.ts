import { describe, expect, test } from '@jest/globals';
import constructorReducer from '../constructor-slice';
import { constructorActions, initialState } from '../constructor-slice';
import { TEST_INGREDIENTS } from './constants';

describe('Проверяют редьюсер слайса burgerConstructor', () => {
  const testIngredient = TEST_INGREDIENTS[0];

  const testStateWithIngredients = {
    bun: null,
    ingredients: TEST_INGREDIENTS
  };

  test('[#1] Обработка экшена добавления ингредиента addIngredient', () => {
    const newState = constructorReducer(
      initialState,
      constructorActions.addIngredient(testIngredient)
    );
    const { bun, ingredients } = newState;

    expect(bun).toBeNull();

    expect(ingredients.length).toBe(1);
    expect(ingredients[0]).toHaveProperty('id');
    expect(typeof ingredients[0].id).toBe('string');

    expect(ingredients[0]).toHaveProperty('name');
    expect(ingredients[0].name).toEqual('Мясо бессмертных моллюсков Protostomia');
  });

  test('[#2] Обработка экшена удаления ингредиента removeIngredient', () => {
    const newState = constructorReducer(
      testStateWithIngredients,
      constructorActions.removeIngredient('test-id-2')
    );
    const { bun, ingredients } = newState;

    expect(bun).toBeNull();

    expect(ingredients.length).toBe(2);
    expect(ingredients.find((i) => i.id === 'test-id-2')).toBeUndefined();

    expect(ingredients[0].id).toBe('test-id-1');
    expect(ingredients[0]).toHaveProperty('name');
    expect(ingredients[0].name).toEqual(
      'Мясо бессмертных моллюсков Protostomia'
    );
  });

  test('[#3] Обработка экшена изменения порядка ингредиентов в начинке moveIngredient', () => {
    const newState = constructorReducer(
      testStateWithIngredients,
      constructorActions.moveIngredient({ fromIndex: 1, toIndex: 2 })
    );
    const { bun, ingredients } = newState;

    expect(bun).toBeNull();

    expect(ingredients.length).toBe(3);
    expect(ingredients[0].id).toBe('test-id-1');
    expect(ingredients[1].id).toBe('test-id-3');
    expect(ingredients[2].id).toBe('test-id-2');
  });
});
