class ProductInfo {
    
    assertTitle(title) {
      cy.get('.inventory_item_name ').should('have.text', title);
    }
  
    assertDescription(details) {
      cy.get('.inventory_item_desc').should('have.text', details);
    }
  
    assertPrice(price) {
      cy.get('.inventory_item_price').should('have.text', `${price}`);
    }
  
    assertImage(imagePath) {
      cy.get('img.inventory_item_img').should('have.attr', 'src').and('include', imagePath);
    }

    clickCart(){
        cy.get('#add-to-cart-sauce-labs-backpack').click();
    }

    assertRemoveText(){
        cy.get('#remove-sauce-labs-backpack').should("have.text","Remove");
    }

    assertBadge(){
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1').click();
    }

    clickCheckOut(){
        cy.get('#checkout').click();
    }

    enterFirstName(firstname){
        cy.get("#first-name").type(firstname)
    }

    enterLastName(lastname){
        cy.get("#last-name").type(lastname)
    }

    enterZipCode(zipcode){
        cy.get("#postal-code").type(zipcode)
    }

    clickContinue(){
        cy.get("#continue").click();
    }

    clickFinish(){
        cy.get("#finish").click();
    }
    
    assertCompletion(){
        cy.get('.complete-header').should("have.text","Thank you for your order!")
    }
  }
  
  export default new ProductInfo();
  