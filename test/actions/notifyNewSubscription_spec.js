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
    const notifyNewSubscription = createNotifyNewSubscriptionWithStubs({ slack });

    const channel = 'channel';
    await notifyNewSubscription(channel, newSubscriptionFixture);
    const expectedMsg = {
      text: JSON.stringify({
        companyName: 'Company, Inc.',
        customerName: 'Verena Example',
        email: 'verena@example.com',
        accountId: '1',
        planName: 'Bronze Plan',
        amount: 170
      })
    };
    spy.calledWith(channel, expectedMsg).should.be.ok();
  });

  function createNotifyNewSubscriptionWithStubs({ slack, template }) {
    const slackStub = slack || createSlackStub();
    const templateStub = template || createTemplateStub();
    return createNotifyNewSubscription(slackStub, templateStub);
  }

  function createSlackStub() {
    return {
      send: () => new Promise((resolve) => { resolve(); })
    };
  }

  function createTemplateStub() {
    return subscription => ({ text: JSON.stringify(subscription) });
  }
});
