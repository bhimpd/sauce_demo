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
      
        ProductSort.selectFilter('az');

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
});