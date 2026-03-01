import { SELECTORS, TEXTS } from '../support/constants';

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: {
        success: true,
        data: ingredients
        }
    }).as('getIngredients');
    });
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Должен добавить булку в конструктор', () => {
    const button = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.bunName)
      .parents('li')
      .find('button');
    button.click();

    cy.contains(TEXTS.bunTop(TEXTS.bunName)).should('exist');
    cy.contains(TEXTS.bunBottom(TEXTS.bunName)).should('exist');
    cy.get(SELECTORS.constructorElement).should('have.length', 2);
  });

  it('Должен добавить начинку в конструктор', () => {
    const button = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.mainName)
      .parents('li')
      .find('button');
    button.click();

    cy.contains(TEXTS.mainName).should('exist');
    cy.get(SELECTORS.constructorElement).should('have.length', 1);
  });
});