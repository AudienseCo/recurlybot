const { sample } = require('lodash');
const config = require('../config');

module.exports = ({
  accountId,
  customerName,
  companyName,
  planName,
  amount,
  currency,
  gif
}) => {
  const color = amount > 25 ? 'good' : '#ddddd';
  const image = amount > 25 ? getMoneyGif(gif) : null;
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
        value: `${amount} ${currency}`,
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

function getMoneyGif(gif) {
  if (gif) return gif;
  const GIFs = [
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif',
    'https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif',
    'https://media.giphy.com/media/9HQRIttS5C4Za/giphy.gif',
    'https://media.giphy.com/media/3osxYamKD88c6pXdfO/giphy.gif',
    'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
    'https://media.giphy.com/media/LCdPNT81vlv3y/giphy.gif',
    'https://media.giphy.com/media/1k4kRTdvAZPTMaxpTm/giphy.gif',
    'https://media.giphy.com/media/k4iuvHyjOVtzq/giphy.gif',
    'https://media.giphy.com/media/lptjRBxFKCJmFoibP3/giphy.gif',
    'https://media.giphy.com/media/xT8qAY7e9If38xkrIY/giphy.gif',
    'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif',
    'https://media.giphy.com/media/MdG0ZaSpScdl8VaJks/giphy.gif',
    'https://media.giphy.com/media/hTf8S01Rn6SOFFGBYc/giphy.gif',
    'https://media.giphy.com/media/lN9BJEfmy1huhxiCEw/giphy.gif'
  ];
  return sample(GIFs);
}
