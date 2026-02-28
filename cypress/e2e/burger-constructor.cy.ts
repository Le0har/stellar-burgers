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
    const button = cy.get('[data-cy="ingredient"]')
      .contains('Краторная булка N-200i')
      .parents('li')
      .find('button');
    button.click();

    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
    cy.get('.constructor-element').should('have.length', 2);
  });

  it('Должен добавить начинку в конструктор', () => {
    const button = cy.get('[data-cy="ingredient"]')
      .contains('Мясо бессмертных моллюсков Protostomia')
      .parents('li')
      .find('button');
    button.click();

    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
    cy.get('.constructor-element').should('have.length', 1);
  });
});