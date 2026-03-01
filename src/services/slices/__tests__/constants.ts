export const TEST_INGREDIENTS = [
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
];

export const TEST_ORDERS  = [
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

export const TEST_USER  = {
  email: 'mashaR@test.com',
  name: 'Masha Rest'
};