const Recurly = require('recurly-js/promise');
const config = require('../../config');
const createRecurlyClient = require('./recurly');

const recurly = new Recurly({
  API_KEY: config.recurly.apiKey,
  SUBDOMAIN: config.recurly.subdomain,
  ENVIRONMENT: config.recurly.env,
  DEBUG: config.recurly.debug,
  API_VERSION: config.recurly.version
});

module.exports = createRecurlyClient(recurly);
