require('should');
const fs = require('fs');
const { handle } = require('../index');

const newSubscriptionFixture = fs.readFileSync(`${__dirname}/fixtures/newSubscription.xml`);

describe('handler end to end test', () => {
  it('handler should work', async () => {
    const event = {
      requestContext: {
        identity: {
          sourceIp: '50.18.192.88'
        }
      },
      body: newSubscriptionFixture.toString()
    };
    const response = await handle(event);
    response.should.be.eql({
      statusCode: 200,
      body: '"OK"'
    });
  });
});
