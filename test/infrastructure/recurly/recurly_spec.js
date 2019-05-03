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
    it('should have the "getNotes" method', () => {
      recurlyClient.getNotes.should.be.a.Function();
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

  it('should get the account notes', async () => {
    const notesFixture = {
      data: {
        notes: [{
          message: ''
        }]
      }
    };
    const recurly = createRecurlyDummy(notesFixture);
    const recurlyClient = createRecurlyClient(recurly);
    const spy = sinon.spy(recurly.accounts, 'notes');

    const accountId = '123';
    const notes = await recurlyClient.getNotes(accountId);
    notes.should.be.eql(notesFixture);
    spy.calledWith(accountId).should.be.ok();
  });

  function createRecurlyDummy(res) {
    return {
      subscriptions: {
        get: () => new Promise((resolve) => { resolve(res || {}); })
      },
      accounts: {
        notes: () => new Promise((resolve) => { resolve(res || {}); })
      }
    };
  }
});
