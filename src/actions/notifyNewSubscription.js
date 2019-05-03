const { get, find } = require('lodash');
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);

module.exports = (slack, recurly, template) => {
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

    const id = get(subscriptionNotification, 'subscription[0].uuid[0]');
    const accountId = get(subscriptionNotification, 'account[0].account_code[0]');
    const companyName = get(subscriptionNotification, 'account[0].company_name[0]._')
      || get(subscriptionNotification, 'account[0].company_name[0]');
    const firstName = get(subscriptionNotification, 'account[0].first_name[0]');
    const lastName = get(subscriptionNotification, 'account[0].last_name[0]');
    const amountInCents = get(subscriptionNotification, 'subscription[0].total_amount_in_cents[0]._', 0);


    const subscriptionDetails = await recurly.getSubscription(id);
    const gif = await getGifFromAccountNotes(accountId);
    return {
      id,
      companyName,
      customerName: `${firstName} ${lastName}`,
      email: get(subscriptionNotification, 'account[0].email[0]'),
      accountId,
      planName: get(subscriptionNotification, 'subscription[0].plan[0].name[0]'),
      amount: amountInCents / 100,
      currency: get(subscriptionDetails, 'data.subscription.currency'),
      gif
    };
  }

  async function getGifFromAccountNotes(accountId) {
    const accountNotes = await recurly.getNotes(accountId);
    const gifNote = find(accountNotes.data.notes, note => /.gif/.test(note.message));
    return gifNote ? gifNote.message : null;
  }
};
