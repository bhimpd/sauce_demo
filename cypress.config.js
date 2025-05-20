const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      charts: true,
      reportPageTitle: "Test Report"
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
       config.env.BASE_URL = process.env.BASE_URL;
       config.env.USER_NAME = process.env.USER_NAME;
       config.env.PASSWORD = process.env.PASSWORD;
       return config;
    },
  },
});
