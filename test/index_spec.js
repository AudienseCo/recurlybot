require('should');
const { handle } = require('../index');

describe('function handler', () => {
  it('handler should work', async () => {
    const response = await handle();
    response.should.be.eql({
      statusCode: 200,
      body: '"OK"'
    });
  });
});
