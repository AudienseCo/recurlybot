module.exports = {
  slack: {
    webhookUrl: process.env.SLACK_URL || '',
    channel: process.env.SLACK_CHANNEL || 'general'
  },
  recurly: {
    apiKey: process.env.RECURLY_APIKEY || '',
    subdomain: process.env.RECURLY_SUBDOMAIN || '',
    env: process.env.RECURLY_ENV || '',
    debug: false,
    version: 2.17
  },
  presentation: {
    profileURL: process.env.PROFILE_URL || 'https://recurly.com/accounts/{accountId}',
  },
  ipWhitelist: [
    '35.233.168.62',
    '35.185.253.62',
    '35.188.232.138',
    '35.236.210.191',
    '50.18.192.88',
    '52.8.32.100',
    '52.9.209.233',
    '50.0.172.150',
    '52.203.102.94',
    '52.203.192.184'
  ]
};
