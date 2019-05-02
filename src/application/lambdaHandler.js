const { intersection, get } = require('lodash');

module.exports = (notifyNewSubscription, config) => {
  return async (event) => {
    if (isFromWhitelistedIP(event)) {
      await notifyNewSubscription(config.slack.channel, event.body);
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify('OK')
    };
    return response;
  };

  function isFromWhitelistedIP(event) {
    const ips = get(event, 'multiValueHeaders["X-Forwarded-For"]', []);
    return intersection(config.ipWhitelist, ips).length > 0;
  }
};
