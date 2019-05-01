require('should');

const application = require(`${specHelper.srcPath}application`);

describe('Application Builder', () => {
  it('should have a lambdaHandler function', () => {
    application.lambdaHandler.should.be.a.Function();
  });
});
