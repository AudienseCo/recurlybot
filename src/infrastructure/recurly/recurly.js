module.exports = (recurly) => {
  const that = {};

  that.getSubscription = id => recurly.subscriptions.get(id);

  return that;
};
