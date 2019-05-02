const { includes, get } = require('lodash');

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
    const ip = get(event, 'requestContext.identity.sourceIp');
    return includes(config.ipWhitelist, ip);
  }
};
