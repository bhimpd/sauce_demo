/// <reference types="cypress" />

import footerSocialMedia from "../support/PageObject/FooterSocialMedia/footerSocialMedia";
import LoginPage from "../support/PageObject/Login/LoginPage";

describe("Login Module", () => {

  it("should be able to login and assert the social media links in the footer", () => {
    cy.visitURL();
    LoginPage.loginToDashBoard();

    cy.get('.footer').scrollIntoView();

    cy.fixture('footerSocialMedia').then((socialMedia) => {
      // Assert Twitter link
      footerSocialMedia.assertSocialMedia('[data-test="social-twitter"]',socialMedia.twitter);

      // Assert Facebook link
      footerSocialMedia.assertSocialMedia('[data-test="social-facebook"]',socialMedia.facebook);

      // Assert LinkedIn link
      footerSocialMedia.assertSocialMedia('[data-test="social-linkedin"]',socialMedia.linkedin);

    });
  });

});
