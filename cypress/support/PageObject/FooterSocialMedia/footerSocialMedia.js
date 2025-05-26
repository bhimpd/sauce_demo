class FooterSocialMedia{

    assertSocialMedia(selector,expectedHref){
        cy.get(selector).should('have.attr', 'href', expectedHref);
    }
}

export default new FooterSocialMedia();