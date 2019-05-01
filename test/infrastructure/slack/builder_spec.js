require('should');

const slack = require(`${specHelper.srcPath}infrastructure/slack/`);

describe('Slack builder', () => {
  context('Interface', () => {
    it('should have the "send" method', () => {
      slack.send.should.be.a.Function();
    });
  });
});
