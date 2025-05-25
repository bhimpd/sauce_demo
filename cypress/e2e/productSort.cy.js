/// <reference types="cypress" />

import LoginPage from "../support/PageObject/Login/LoginPage";
import ProductSort from "../support/PageObject/ProductSort/ProductSort";
import ProductInfo from '../support/PageObject/ProductInfo/ProductInfo';


describe("Sort the Product Details", ()=>{

    beforeEach(()=>{
        cy.visitURL();
        LoginPage.loginToDashBoard();
    });

    it("Should Sort the Product Details In Ascending Order(Name)...", () => {
      
        ProductSort.selectFilter('Name (A to Z)','az');

        cy.fixture('productDetails').then((data)=>{
            // console.log("All Products Details Data :: ", data)
            // console.log(data[0].name)
            const ascending = [...data].sort((a,b) => a.name.localeCompare(b.name));
            cy.get(".inventory_item").should('have.length', ascending.length);

            cy.log("Ascending Data :: ", ascending);

            cy.get(".inventory_item").each(($el, index) => {

                cy.wrap($el).within(() => {
                const product = ascending[index];
                ProductInfo.assertTitle(product.name);
                ProductInfo.assertDescription(product.details);
                ProductInfo.assertPrice(`$${product.price}`);
                ProductInfo.assertImage(product.image);
                });
                
            });
        })
    });

    it("Should Sort the Product Details In Descending Order(Name)...", () => {
        // select Z → A
        ProductSort.selectFilter('Name (Z to A)','za');
    
        cy.fixture('productDetails').then((data) => {

            const ascending = [...data].sort((a,b) => a.name.localeCompare(b.name));
            cy.get(".inventory_item").should('have.length', ascending.length);

          // make a reversed copy of the fixture array
          const descending = [...ascending].reverse();
    
          cy.get(".inventory_item").each(($el, index) => {
            cy.wrap($el).within(() => {
              ProductInfo.assertTitle(descending[index].name);
              ProductInfo.assertDescription(descending[index].details);
              ProductInfo.assertPrice(`$${descending[index].price}`);
              ProductInfo.assertImage(descending[index].image);
            });
          });
        });
    });

    it("Should Sort the Product Details by Price (Low → High)", () => {
        // select low-to-high price filter (assuming 'lohi' is the value)
        ProductSort.selectFilter('Price (low to high)','lohi');
      
        cy.fixture('productDetails').then((data) => {
          const lowToHigh = [...data].sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
      
          cy.get(".inventory_item").should('have.length', lowToHigh.length);
          cy.get(".inventory_item").each(($el, index) => {
            cy.wrap($el).within(() => {
              const product = lowToHigh[index];
              ProductInfo.assertTitle(product.name);
              ProductInfo.assertDescription(product.details);
              ProductInfo.assertPrice(`$${product.price}`);
              ProductInfo.assertImage(product.image);
            });
          });
        });
    });

    it("Should Sort the Product Details by Price (High → Low)", () => {
        // select high-to-low price filter (assuming 'hilo' is the value)
        ProductSort.selectFilter('Price (high to low)','hilo');
      
        cy.fixture('productDetails').then((data) => {
          const highToLow = [...data].sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
      
          cy.get(".inventory_item").should('have.length', highToLow.length);
          cy.get(".inventory_item").each(($el, index) => {
            cy.wrap($el).within(() => {
              const product = highToLow[index];
              ProductInfo.assertTitle(product.name);
              ProductInfo.assertDescription(product.details);
              ProductInfo.assertPrice(`$${product.price}`);
              ProductInfo.assertImage(product.image);
            });
          });
        });
    });
    
});