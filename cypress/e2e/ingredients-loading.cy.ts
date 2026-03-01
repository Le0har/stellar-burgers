import { SELECTORS } from '../support/constants';

describe('Перехват запроса на эндпоинт "api/ingredients"', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      body: {
          success: true,
          data: ingredients,
      },
      }).as('getIngredients');
    });

    cy.visit('/');
  });

  it('Проверка загрузки', () => {
    cy.wait('@getIngredients');

    cy.get(SELECTORS.ingredient).should('have.length', 5);
  });
});