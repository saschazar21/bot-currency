// https://currencylayer.com
const debug = require('debug')('debug');
const request = require('request-promise');
const Promise = require('bluebird');

const baseUrl = 'https://www.exchangerate-api.com';
const prepare = (params) => {
  const paramObj = {
    api_key: process.env.CURRENCY_API_KEY,
    currency: params['compare-currency'],
  };

  if (!params.unit && !params.currency) {
    return Promise.reject('No base unit or currency given.');
  }
  if (params.unit) {
    paramObj.source = params.unit.currency;
  } else {
    paramObj.source = params.currency;
  }
  if (paramObj.source === paramObj.currencies) {
    return Promise.reject('Same currencies. Nothing to exchange.');
  }

  debug(`Base currency: ${paramObj.source}, compare currency: ${paramObj.currency}`);
  return Promise.resolve(`${baseUrl}/${paramObj.source}/${paramObj.currency}?k=${paramObj.api_key}`);
};

module.exports = params => prepare(params)
.then(urlString => request(urlString));
