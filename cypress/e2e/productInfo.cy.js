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
    
        ProductInfo.assertBadge();
        cy.url().should("include","/cart.html");

        ProductInfo.assertTitle(data.name);
        ProductInfo.assertDescription(data.details);
        ProductInfo.assertPrice(`$${data.price}`);
        ProductInfo.clickCheckOut()

        cy.url().should("include","/checkout-step-one.html");

        ProductInfo.enterFirstName("victor");
        ProductInfo.enterLastName("Memo");
        ProductInfo.enterZipCode("1234");
        ProductInfo.clickContinue();

        cy.url().should("include","/checkout-step-two.html");

        ProductInfo.assertTitle(data.name);
        ProductInfo.assertDescription(data.details);
        ProductInfo.assertPrice(`$${data.price}`);
        ProductInfo.clickFinish();

        cy.url().should("include","/checkout-complete.html");
        ProductInfo.assertCompletion();
        
    });
  });
  
});
