import { SELECTORS, TEXTS } from '../support/constants';

describe('Создание заказа', () => {
  beforeEach(() => {
    // Мокаем ингредиенты
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: {
          success: true,
          data: ingredients
        }
      }).as('getIngredients');
    });

    // Мокаем пользователя
    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', 'api/auth/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    // Мокаем создание заказа
    cy.fixture('order.json').then((order) => {
      cy.intercept('POST', 'api/orders', {
        statusCode: 200,
        body: order
      }).as('createOrder');
    });

    // Подставляем токены авторизации
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Должен создать заказ', () => {
    // Добавляем булку
    const buttonAddBun = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.bunName)
      .parents('li')
      .find('button');
    buttonAddBun.click();

    // Добавляем начинку
    const buttonAddMain = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.mainName)
      .parents('li')
      .find('button');
    buttonAddMain.click();

    // Кликаем на кнопку "Оформить заказ"
    const buttonCreateOrder = cy.get(SELECTORS.orderButton);
    buttonCreateOrder.click();

    // Ждём ответ от сервера
    cy.wait('@createOrder');

    // Проверяем, что открылась модалка с номером заказа
    cy.contains(TEXTS.orderNumber).should('exist');

    // Закрываем модалку (по крестику)
    const buttonClose = cy.get('#modals button');
    buttonClose.click();

    // Проверяем, что модалка закрылась
    cy.contains(TEXTS.orderNumber).should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get(SELECTORS.constructorElement).should('not.exist');
  });
});