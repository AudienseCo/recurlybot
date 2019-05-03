module.exports = (recurly) => {
  const that = {};

  that.getSubscription = id => recurly.subscriptions.get(id);
  that.getNotes = accountCode => recurly.accounts.notes(accountCode);

  return that;
};
