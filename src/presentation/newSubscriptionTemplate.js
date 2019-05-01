const { sample } = require('lodash');
const config = require('../config');

module.exports = ({
  accountId,
  customerName,
  companyName,
  planName,
  amount
}) => {
  const color = amount > 25 ? 'good' : '#ddddd';
  const image = amount > 25 ? getMoneyGif() : null;
  const attachment = {
    title: `New ${planName} subscription`,
    title_link: config.presentation.profileURL.replace('{accountId}', accountId),
    fields: [
      {
        title: 'Customer Name',
        value: customerName,
        short: true
      },
      {
        title: 'Company',
        value: companyName,
        short: true
      },
      {
        title: 'Plan',
        value: `${planName}`,
        short: true
      },
      {
        title: 'Amount',
        value: `$${amount}`,
        short: true
      }
    ],
    color,
    image_url: image
  };

  return {
    attachments: [attachment]
  };
};

function getMoneyGif() {
  const GIFs = [
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif',
    'https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif',
    'https://media.giphy.com/media/9HQRIttS5C4Za/giphy.gif',
    'https://media.giphy.com/media/3osxYamKD88c6pXdfO/giphy.gif'
  ];
  return sample(GIFs);
}
