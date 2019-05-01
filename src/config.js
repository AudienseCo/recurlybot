module.exports = {
  slack: {
    webhookUrl: process.env.SLACK_URL || '',
    channel: process.env.SLACK_CHANNEL || 'general'
  },
  presentation: {
    profileURL: process.env.PROFILE_URL || 'https://recurly.com/accounts/{accountId}',
  },
  ipWhitelist: [
    '50.18.192.88',
    '52.8.32.100',
    '52.9.209.233',
    '50.0.172.150',
    '52.203.102.94',
    '52.203.192.184'
  ]
};
