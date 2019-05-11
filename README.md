# Recurlybot
Slack bot to notify new Recurly subscriptions.

![](http://g.recordit.co/MDZuZBIOAe.gif)

## Why
One of the things that are hard to replicate in companies with distributed teams is living the vibe of closing deals. This integration makes it easier to celebrate company success with a sense of fun and humor.

## What's this?
A function that given a POST request from [Recurly webhooks](https://docs.recurly.com/docs/webhooks) publishes a message in a the configured Slack channel via a [Slack Incomming Webhook](https://api.slack.com/incoming-webhooks)

### Configuration
Edit [src/config.js](https://github.com/AudienseCo/recurlybot/blob/master/src/config.js) or overwrite it using environment variables:
  - `SLACK_CHANNEL`: the Slack channel where you want to puslish the notifications.
  - `SLACK_URL`: Slack incomming webhook url.
  - `PROFILE_URL`: Customer information page in case you want to link the notification to your CRM or to the Recurly account page.
  - `RECURLY_APIKEY`: Recurly API key.
  - `RECURLY_SUBDOMAIN`: Your company recurly subdomain.
  - `RECURLY_ENV`: Recuring environment, use `staging` for staging or leave it empty for production.

## Install
```bash
npm install recurlybot --save
```

## Usage

### Developing your own Recurly webhooks handler 
```js
const { notifyNewSubscription } = require('recurlybot');

const channel = 'new-customers';
const notification = `<?xml version="1.0" encoding="UTF-8"?>
<new_subscription_notification>
...
</new_subscription_notification>`; // XML notification from Recurly

notifyNewSubscription(channel, notification)
  .then(() => {
    console.log('Notification published in Slack');
  }).
  .catch((e) => {
    console.log('Error handling notification');
  });
```

## Using an AWS Lambda function
See [Recurlybot Lambda Packager](https://github.com/AudienseCo/recurlybot-lambda)
