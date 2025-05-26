import LoginPage from '../support/PageObject/Login/LoginPage';
import ProductInfo from '../support/PageObject/ProductInfo/ProductInfo';

describe('Product Info Assertions', () => {
  beforeEach(() => {
    cy.visitURL();
    LoginPage.loginToDashBoard();
  });


  it("should assert every product detail page", () => {
    cy.fixture('productDetails').then((data) => {
      
      const ascending = [...data].sort((a, b) => a.name.localeCompare(b.name));
      cy.get('.inventory_item').should('have.length', ascending.length);
  
      // forEach builds a proper Cypress chain
      ascending.forEach((product, index) => {
        // 1) On listing page: scope into the i-th card
        cy.get('.inventory_item').eq(index).within(() => {
          ProductInfo.assertTitle(product.name);
          ProductInfo.assertDescription(product.details);
          ProductInfo.assertPrice(`$${product.price}`);
          ProductInfo.assertImage(product.image);
  
          // 2) Click through to details
          cy.get('.inventory_item_name').click();
        });
  
        // 3) On detail page: assert again
        ProductInfo.assertDetailTitle(product.name);
        ProductInfo.assertDetailDescription(product.details);
        ProductInfo.assertDetailPrice(`$${product.price}`);
        ProductInfo.assertDetailImage(product.image)
      
  
        // 4) Go back to listing
        cy.go('back');
      });
    });
  });
  

  it('should assert product info matches JSON and full checkout process', () => {
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
