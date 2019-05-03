require('should');
const sinon = require('sinon');
const fs = require('fs');

const createNotifyNewSubscription = require(`${specHelper.srcPath}actions/notifyNewSubscription`);
const newSubscriptionFixture = fs.readFileSync(`${__dirname}/../fixtures/newSubscription.xml`);
const anotherNotifycationFixture = fs.readFileSync(`${__dirname}/../fixtures/anotherNotification.xml`);

describe('notifyNewSubscription Action', () => {
  it('should only notify new subscriptions', async () => {
    const slack = createSlackStub();
    const spy = sinon.spy(slack, 'send');
    const notifyNewSubscription = createNotifyNewSubscriptionWithStubs({ slack });

    const channel = 'channel';
    await notifyNewSubscription(channel, anotherNotifycationFixture);
    spy.notCalled.should.be.ok();
  });

  it('should notify a new subscription to a slack channel', async () => {
    const slack = createSlackStub();
    const spy = sinon.spy(slack, 'send');
    const recurly = createRecurlyStub({
      subscriptionRes: {
        data: {
          subscription: {
            currency: 'EUR'
          }
        }
      },
      notesRes: {
        data: {
          notes: [{
            message: 'https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif'
          }]
        }
      }
    });
    const notifyNewSubscription = createNotifyNewSubscriptionWithStubs({ slack, recurly });

    const channel = 'channel';
    await notifyNewSubscription(channel, newSubscriptionFixture);
    const expectedMsg = {
      text: JSON.stringify({
        id: '4bd3e28b63f88fae827cd140b9968094',
        companyName: 'Company, Inc.',
        customerName: 'Verena Example',
        email: 'verena@example.com',
        accountId: '5b88ec3b66d75421c4e12899',
        planName: 'Bronze Plan',
        amount: 170,
        currency: 'EUR',
        gif: 'https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif'
      })
    };
    spy.calledWith(channel, expectedMsg).should.be.ok();
  });

  function createNotifyNewSubscriptionWithStubs({ slack, recurly, template }) {
    const slackStub = slack || createSlackStub();
    const recurlyStub = recurly || createRecurlyStub({});
    const templateStub = template || createTemplateStub();
    return createNotifyNewSubscription(slackStub, recurlyStub, templateStub);
  }

  function createSlackStub() {
    return {
      send: () => new Promise((resolve) => { resolve(); })
    };
  }

  function createRecurlyStub({ subscriptionRes, notesRes }) {
    return {
      getSubscription: () => new Promise((resolve) => { resolve(subscriptionRes || {}); }),
      getNotes: () => new Promise((resolve) => { resolve(notesRes || {}); })
    };
  }

  function createTemplateStub() {
    return subscription => ({ text: JSON.stringify(subscription) });
  }
});
