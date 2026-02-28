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
    const buttonModal = cy.get('[data-cy="ingredient"]')
      .contains('Краторная булка N-200i');
    buttonModal.click();

    cy.contains('Детали ингридиента').should('exist');

    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('Должно закрыться по клику на крестик', () => {
    const buttonModal = cy.get('[data-cy="ingredient"]')
      .contains('Краторная булка N-200i');
    buttonModal.click();

    cy.contains('Детали ингридиента').should('exist');

    const buttonClose = cy.get('#modals button');
    buttonClose.click();

    cy.contains('Детали ингридиента').should('not.exist');
  });

  it('Должно закрыться по клику на оверлей', () => {
    const buttonModal = cy.get('[data-cy="ingredient"]')
      .contains('Краторная булка N-200i');
    buttonModal.click();

    const buttonOverlay = cy.get('#modals > div:last-child');
    buttonOverlay.click({ force: true });

    cy.contains('Детали ингридиента').should('not.exist');
  });
});