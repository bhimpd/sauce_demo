/// <reference types="cypress" />

import LoginPage from "../support/PageObject/Login/LoginPage";
import ProductSort from "../support/PageObject/ProductSort/ProductSort";
import ProductInfo from '../support/PageObject/ProductInfo/ProductInfo';


describe("Sort the Product Details", ()=>{

    beforeEach(()=>{
        cy.visitURL();
        LoginPage.loginToDashBoard();
    });

    it("Should Sort the Product Details In Ascending Order...", () => {
      
        ProductSort.selectFilter('Name (A to Z)','az');

        cy.fixture('productDetails').then((data)=>{
            // console.log("All Products Details Data :: ", data)
            // console.log(data[0].name)

            cy.get(".inventory_item").each(($el, index) => {

                // wrap this single item and scope all get/asserts inside it
                cy.wrap($el).within(() => {
                ProductInfo.assertTitle(data[index].name);
                ProductInfo.assertDescription(data[index].details);
                ProductInfo.assertPrice(`$${data[index].price}`);
                ProductInfo.assertImage(data[index].image);
                });
                
            });
        })
    });

    it("Should Sort the Product Details In Descending Order...", () => {
        // select Z → A
        ProductSort.selectFilter('Name (Z to A)','za');
    
        cy.fixture('productDetails').then((data) => {
          // make a reversed copy of the fixture array
          const descending = [...data].reverse();
    
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
});