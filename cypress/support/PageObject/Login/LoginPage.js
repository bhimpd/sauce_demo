class LoginPage{

    enterUserName(username){
        cy.get("#user-name").type(username);
    }

    enterPassword(password){
        cy.get("#password").type(password);
    }

    clickLoginButton(){
        cy.get("#login-button").click();
    }

    assertDashBoard(){
        cy.location("pathname").should("contain", "/inventory.html");
        cy.get(".app_logo").should('exist').and('have.text',"Swag Labs")
    }

    loginToDashBoard(){
        this.enterUserName(Cypress.env('USER_NAME'));
        this.enterPassword(Cypress.env('PASSWORD'));
        this.clickLoginButton();
        this.assertDashBoard();

    }
}

export default new LoginPage;