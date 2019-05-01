const slack = require('../infrastructure/slack');
const template = require('../presentation/newSubscriptionTemplate');
const createNotifyNewSubscription = require('./notifyNewSubscription');

const notifyNewSubscription = createNotifyNewSubscription(slack, template);

module.exports = {
  notifyNewSubscription
};
