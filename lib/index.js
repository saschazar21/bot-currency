const city = require('./city');
const country = require('./country');
const currency = require('../api/currency');
const slack = require('./slack');
const Promise = require('bluebird');

const intentBase = 'travel.currency - ';
const getIntent = (body) => {
  const intentName = body.result.metadata.intentName;
  if (!intentName || !body.result.parameters) {
    return Promise.reject('No category (intent) found');
  }

  return intentName.replace(intentBase, '');
};

const prepare = (body) => {
  const intent = getIntent(body);

  switch (intent) {
    case 'city':
      return city(body.result.parameters);
    case 'country':
      return country(body.result.parameters);
    default:
      return Promise.resolve(body.result.parameters);
  }
};

module.exports = body => prepare(body)
.then(params => currency(params))
.then((value) => {
  const params = body.result.parameters;
  const obj = {
    value: value.amount,
    rate: value.amount,
    currency: value.currency,
  };
  if (params.unit) {
    obj.value = Math.round((obj.value * params.unit.amount) * 100) / 100;
    obj.source = params.unit.currency;
    obj.unit = params.unit;
  } else {
    obj.source = params.currency;
  }

  return obj;
})
.then(obj => slack(obj));
