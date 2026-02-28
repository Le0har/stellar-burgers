import { describe, expect, test } from '@jest/globals';
import constructorReducer from '../constructor-slice';
import { constructorActions } from '../constructor-slice';

describe('Проверяют редьюсер слайса burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const testIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  };

  const testStateWithIngredients = {
    bun: null,
    ingredients: [
      {
        id: 'test-id-1',
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
        id: 'test-id-2',
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
        id: 'test-id-3',
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
    ]
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
    expect(ingredients[0].name).toEqual('Биокотлета из марсианской Магнолии');
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
