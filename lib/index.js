const city = require('./city');
const country = require('./country');
const currency = require('../api/currency');
const Promise = require('bluebird');

const intentBase = 'travel.currency - ';

const prepare = (body) => {
  const intentName = body.result.metadata.intentName;
  if (!intentName || !body.result.parameters) {
    return Promise.reject('No category (intent) found');
  }
  const intent = intentName.replace(intentBase, '');

  switch (intent) {
    case 'city':
      return city(body.result.parameters);
    case 'country':
      return country(body.result.parameters);
    default:
      return body.result.parameters;
  }
};

module.exports = body => prepare(body)
.then(params => currency(params));
