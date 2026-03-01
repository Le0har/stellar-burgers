export const SELECTORS = {
  // Ингредиенты
  ingredient: '[data-cy="ingredient"]',

  // Конструктор
  constructorElement: '.constructor-element',

  // Модальные окна
  modalButton: '#modals button',
  modalOverlay: '#modals > div:last-child',
  modalTitle: '#modals h3',

  // Кнопки
  orderButton: 'button:contains("Оформить заказ")'
};

export const TEXTS = {
  // Ингредиенты
  bunName: 'Краторная булка N-200i',
  mainName: 'Мясо бессмертных моллюсков Protostomia',

  // Модальные окна
  modalTitle: 'Детали ингридиента',

  // Конструктор
  bunTop: (name: string) => `${name} (верх)`,
  bunBottom: (name: string) => `${name} (низ)`,

  // Заказ
  orderNumber: '12345'
};
