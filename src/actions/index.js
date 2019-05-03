const slack = require('../infrastructure/slack');
const recurly = require('../infrastructure/recurly');
const template = require('../presentation/newSubscriptionTemplate');
const createNotifyNewSubscription = require('./notifyNewSubscription');

const notifyNewSubscription = createNotifyNewSubscription(slack, recurly, template);

module.exports = {
  notifyNewSubscription
};
