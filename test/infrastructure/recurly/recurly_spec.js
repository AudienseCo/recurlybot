require('should');
const sinon = require('sinon');

const createRecurlyClient = require(`${specHelper.srcPath}infrastructure/recurly/recurly`);

describe('Recurly API wrapper', () => {
  context('Interface', () => {
    const recurly = createRecurlyDummy();
    const recurlyClient = createRecurlyClient(recurly);
    it('should have the "getSubscription" method', () => {
      recurlyClient.getSubscription.should.be.a.Function();
    });
  });

  context('Behaviour', async () => {
    it('should get the subscription', async () => {
      const subscriptonFixture = {
        data: {
          subscription: {
            currency: 'EUR'
          }
        }
      };
      const recurly = createRecurlyDummy(subscriptonFixture);
      const recurlyClient = createRecurlyClient(recurly);
      const spy = sinon.spy(recurly.subscriptions, 'get');

      const id = '123';
      const subscription = await recurlyClient.getSubscription(id);
      subscription.should.be.eql(subscriptonFixture);
      spy.calledWith(id).should.be.ok();
    });
  });

  function createRecurlyDummy(res) {
    return {
      subscriptions: {
        get: () => new Promise((resolve) => { resolve(res || {}); })
      }
    };
  }
});
