require('should');

const recurly = require(`${specHelper.srcPath}infrastructure/recurly/`);

describe('Recurly builder', () => {
  context('Interface', () => {
    it('should have the "getSubscription" method', () => {
      recurly.getSubscription.should.be.a.Function();
    });
    it('should have the "getNotes" method', () => {
      recurly.getNotes.should.be.a.Function();
    });
  });
});
