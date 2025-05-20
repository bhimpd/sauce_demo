import LoginPage from '../support/PageObject/Login/LoginPage';
import ProductInfo from '../support/PageObject/ProductInfo/ProductInfo';

describe('Product Info Assertions', () => {
  beforeEach(() => {
    cy.visitURL();
    LoginPage.loginToDashBoard();
  });


  it('should assert product info matches JSON', () => {
    cy.fixture('productInfo').then((data) => {
      cy.get('.inventory_item').eq(0).within(() => {
        ProductInfo.assertTitle(data.name);
        ProductInfo.assertDescription(data.details);
        ProductInfo.assertPrice(`$${data.price}`);
        ProductInfo.assertImage(data.image);
        ProductInfo.clickCart();
        ProductInfo.assertRemoveText();
        });
    
      cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1').click();

      cy.url().should("include","/cart.html");

    });
  });
  
});
