require('should');

const actions = require(`${specHelper.srcPath}actions`);

describe('Actions Builder', () => {
  it('should have a notifyNewSubscription function', () => {
    actions.notifyNewSubscription.should.be.a.Function();
  });
});
