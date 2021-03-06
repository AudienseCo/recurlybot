require('should');
const sinon = require('sinon');
const fs = require('fs');

const createLambdaHandler = require(`${specHelper.srcPath}application/lambdaHandler`);

const newSubscriptionFixture = fs.readFileSync(`${__dirname}/../fixtures/newSubscription.xml`);

describe('lambdaHandler Application', () => {
  it('should not handle notifications from non trusted IPs', async () => {
    const notifyNewSubscription = createNotifyNewSubscriptionStub();
    const notifyNewSubscriptionSpy = sinon.spy(notifyNewSubscription);
    const config = createConfigDummy();
    const lambdaHandler = createLambdaHandler(notifyNewSubscriptionSpy, config);
    const event = {
      requestContext: {
        identity: {
          sourceIp: ''
        }
      },
      body: newSubscriptionFixture
    };
    const response = await lambdaHandler(event);
    response.should.be.eql({
      statusCode: 200,
      body: '"OK"'
    });
    notifyNewSubscriptionSpy.notCalled.should.be.ok();
  });

  it('should handle notifications from trusted IPs', async () => {
    const notifyNewSubscription = createNotifyNewSubscriptionStub();
    const notifyNewSubscriptionSpy = sinon.spy(notifyNewSubscription);
    const config = createConfigDummy();
    const lambdaHandler = createLambdaHandler(notifyNewSubscriptionSpy, config);
    const event = {
      requestContext: {
        identity: {
          sourceIp: '50.18.192.89'
        }
      },
      body: newSubscriptionFixture
    };
    const response = await lambdaHandler(event);
    response.should.be.eql({
      statusCode: 200,
      body: '"OK"'
    });
    notifyNewSubscriptionSpy.calledOnce.should.be.ok();
  });

  function createConfigDummy() {
    return {
      slack: {
        channel: 'test-channel'
      },
      ipWhitelist: ['50.18.192.88', '50.18.192.89']
    };
  }

  function createNotifyNewSubscriptionStub() {
    return () => new Promise((resolve) => { resolve(); });
  }
});
