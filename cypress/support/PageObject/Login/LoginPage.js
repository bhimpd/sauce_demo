class LoginPage{

    enterUserName(username){
        cy.log("USERNAME::", username);
        cy.get("#user-name").type(username);
    }

    enterPassword(password){
        cy.get("#password").type(password);
    }

    clickLoginButton(){
        cy.get("#login-button").click();
    }

    loginToDashBoard(){
        this.enterUserName(Cypress.env('USER_NAME'));
        this.enterPassword(Cypress.env('PASSWORD'));
        this.clickLoginButton();

    }
}

export default new LoginPage;