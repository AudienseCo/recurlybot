const config = require('../config');
const { notifyNewSubscription } = require('../actions');
const lambdaHandler = require('./lambdaHandler')(notifyNewSubscription, config);

module.exports = {
  lambdaHandler
};
