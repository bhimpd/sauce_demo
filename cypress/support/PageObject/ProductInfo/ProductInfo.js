class ProductInfo {
    
    assertTitle(title) {
      cy.get('.inventory_item_name ').should('have.text', title);
    }
  
    assertDescription(details) {
      cy.get('.inventory_item_desc').should('have.text', details);
    }
  
    assertPrice(price) {
      cy.get('.inventory_item_price').should('have.text', `$${price}`);
    }
  
    assertImage(imagePath) {
      cy.get('.inventory_item_img').should('have.attr', 'src').and('include', imagePath);
    }
  }
  
  export default new ProductInfo();
  