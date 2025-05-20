import LoginPage from '../support/PageObject/Login/LoginPage';

describe('Product Info Assertions', () => {
  beforeEach(() => {
    cy.visitURL();
    LoginPage.loginToDashBoard();
  });


  it('should assert product info matches JSON', () => {
    cy.fixture('productInfo').then((data) => {
      cy.get('.inventory_item').eq(0).within(() => {
        cy.get('.inventory_item_name').should('have.text', data.name);
        cy.get('.inventory_item_desc').should('have.text', data.details);
        cy.get('.inventory_item_price').should('have.text', `$${data.price}`);
        cy.get('img').should('have.attr', 'src').and('include', data.image);
      });
    });
  });
  
});
