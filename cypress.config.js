const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       config.env.BASE_URL = process.env.BASE_URL;
       config.env.USERNAME = process.env.USERNAME;
       config.env.PASSWORD = process.env.PASSWORD;
       return config;
    },
  },
});
