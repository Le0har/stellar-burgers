import { SELECTORS, TEXTS } from '../support/constants';

describe('Модальные окна ингредиентов', () => {
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

  it('Должно открыться модальное окно ингредиента', () => {
    const buttonModal = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.bunName);
    buttonModal.click();

    cy.contains(TEXTS.modalTitle).should('exist');

    cy.contains(TEXTS.bunName).should('exist');
  });

  it('Должно закрыться по клику на крестик', () => {
    const buttonModal = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.bunName);
    buttonModal.click();

    cy.contains(TEXTS.modalTitle).should('exist');

    const buttonClose = cy.get(SELECTORS.modalButton);
    buttonClose.click();

    cy.contains(TEXTS.modalTitle).should('not.exist');
  });

  it('Должно закрыться по клику на оверлей', () => {
    const buttonModal = cy.get(SELECTORS.ingredient)
      .contains(TEXTS.bunName);
    buttonModal.click();

    const buttonOverlay = cy.get(SELECTORS.modalOverlay);
    buttonOverlay.click({ force: true });

    cy.contains(TEXTS.modalTitle).should('not.exist');
  });
});