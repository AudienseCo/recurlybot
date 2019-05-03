const should = require('should');

const newSubscriptionTemplate = require(`${specHelper.srcPath}presentation/newSubscriptionTemplate`);

describe('newSubscription Template', () => {
  it('amount less than 25 color gray and no gif', () => {
    const subscription = {
      accountId: '1',
      customerName: 'name',
      companyName: 'company',
      planName: 'plan A',
      amount: 5,
      currency: 'USD'
    };
    const msg = newSubscriptionTemplate(subscription);
    msg.should.be.eql({
      attachments: [{
        title: 'New plan A subscription',
        title_link: 'https://recurly.com/accounts/1',
        fields: [
          { title: 'Customer Name', value: 'name', short: true },
          { title: 'Company', value: 'company', short: true },
          { title: 'Plan', value: 'plan A', short: true },
          { title: 'Amount', value: '5 USD', short: true }
        ],
        color: '#ddddd',
        image_url: null
      }]
    });
  });

  it('amount grater than 25 color blue (good) and gif', () => {
    const subscription = {
      accountId: '1',
      customerName: 'name',
      companyName: 'company',
      planName: 'plan A',
      amount: 40,
      currency: 'USD'
    };
    const msg = newSubscriptionTemplate(subscription);
    msg.attachments[0].color.should.be.eql('good');
    should.exist(msg.attachments[0].image_url);
  });

  it('amount grater than 25 color blue (good) and gif from account notes', () => {
    const subscription = {
      accountId: '1',
      customerName: 'name',
      companyName: 'company',
      planName: 'plan A',
      amount: 40,
      currency: 'USD',
      gif: 'set.gif'
    };
    const msg = newSubscriptionTemplate(subscription);
    msg.attachments[0].color.should.be.eql('good');
    msg.attachments[0].image_url.should.be.eql('set.gif');
  });
});
