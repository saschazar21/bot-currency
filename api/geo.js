// http://restcountries.eu
const request = require('request-promise');
const debug = require('debug')('debug');
const Promise = require('bluebird');

const baseUrl = 'https://restcountries.eu/rest/v1';
const prepare = (params) => {
  if (!params.country && !params.city) {
    return Promise.reject('No country or city specified.');
  }
  if (params.country) {
    return Promise.resolve(`${baseUrl}/name/${params.country}?fullText=true`);
  }
  return Promise.resolve(`${baseUrl}/capital/${params.city}`);
};

module.exports = params => prepare(params)
.then(urlString => request(urlString))
.then((data) => {
  const body = JSON.parse(data);
  const entry = Array.isArray(body) ? body[0] : body;
  const currency = Array.isArray(entry.currencies) ? entry.currencies[0] : entry.currencies;
  return currency;
})
.then((data) => {
  const struct = params;
  struct['compare-currency'] = data;
  if (struct.currency && struct.unit) {
    debug(`Doubled values - Currency: ${struct.currency}, Unit: ${struct.unit.currency}`);
    delete struct.currency;
  }
  return struct;
});
