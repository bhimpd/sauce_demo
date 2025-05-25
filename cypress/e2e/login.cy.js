/// <reference types="cypress" />

import LoginPage from "../support/PageObject/Login/LoginPage";

describe("Login Module", ()=>{
    it("should able to login",()=>{
        console.log("Running...")
        cy.visitURL();
        LoginPage.loginToDashBoard();
    });
});