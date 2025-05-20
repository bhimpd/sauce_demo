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
  }
  
  export default new ProductInfo();
  