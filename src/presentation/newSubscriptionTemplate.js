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
  const image = gif || getMoneyGif(amount);
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

function getMoneyGif(amount) {
  const LEVEL1_GIFS = [
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
    'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif'
  ];
  const LEVEL2_GIFS = [
    'https://media.giphy.com/media/MdG0ZaSpScdl8VaJks/giphy.gif',
    'https://media.giphy.com/media/hTf8S01Rn6SOFFGBYc/giphy.gif',
    'https://media.giphy.com/media/lN9BJEfmy1huhxiCEw/giphy.gif',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/charli-xcx-boys-moments-5-1501166124.gif?crop=1xw:1xh;center,top&resize=480:*'
  ];
  const LEVEL3_GIFS = [
    'http://dwigif.com/view/O42mUTl'
  ];

  if (amount > 25 && amount < 300) return sample(LEVEL1_GIFS);
  if (amount >= 300 && amount < 500) return sample(LEVEL2_GIFS);
  if (amount >= 500) return sample(LEVEL3_GIFS);
  return null;
}
