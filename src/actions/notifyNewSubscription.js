const { get } = require('lodash');
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);

module.exports = (slack, template) => {
  return async (channel, notification) => {
    const subscription = await parseSubscriptionNotification(notification);
    if (!subscription) return;

    const msg = template(subscription);
    return slack.send(channel, msg);
  };

  async function parseSubscriptionNotification(notification) {
    const notificationObj = await parseString(notification);
    const subscriptionNotification = get(notificationObj, 'new_subscription_notification');
    if (!subscriptionNotification) return;

    const companyName = get(subscriptionNotification, 'account[0].company_name[0]._')
      || get(subscriptionNotification, 'account[0].company_name[0]');
    const firstName = get(subscriptionNotification, 'account[0].first_name[0]');
    const lastName = get(subscriptionNotification, 'account[0].last_name[0]');
    const amountInCents = get(subscriptionNotification, 'subscription[0].total_amount_in_cents[0]._', 0);

    return {
      companyName,
      customerName: `${firstName} ${lastName}`,
      email: get(subscriptionNotification, 'account[0].email[0]'),
      accountId: get(subscriptionNotification, 'account[0].account_code[0]'),
      planName: get(subscriptionNotification, 'subscription[0].plan[0].name[0]'),
      amount: amountInCents / 100
    };
  }
};
