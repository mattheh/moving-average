const rp = require('request-promise');
const Promise = require('bluebird');
const _ = require('lodash');
const keys = require('./keys.js');

module.exports = function produceRecommendation (symbol, daysToAverage) {
  const baseUrl = 'https://min-api.cryptocompare.com';
  const historicalDailyEndpoint = '/data/histoday';
  const currentPriceEndpoint = '/data/price';

  const historicalRequestOptions = {
    method: 'GET',
    uri: baseUrl + historicalDailyEndpoint + '?fsym=' + symbol + '&tsym=USD&limit=' + daysToAverage,
    headers: {
      'authorization': 'Apikey ' + keys.CRYPTO_COMPARE_KEY
    },
    json: true
  };

  const priceRequestOptions = {
    method: 'GET',
    uri: baseUrl + currentPriceEndpoint + '?fsym=' + symbol + '&tsyms=USD',
    headers: {
      'authorization': 'Apikey ' + keys.CRYPTO_COMPARE_KEY
    },
    json: true
  };

  return Promise.all([
    rp(priceRequestOptions),
    rp(historicalRequestOptions)
  ]).spread( (priceRes, historicalRes) => {
    let responseObject = {}
    let currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let currentPrice = priceRes.USD;
    let movingAverage = _.meanBy(historicalRes.Data, (data) => { return data.close });

    responseObject.currentPrice = currentPrice
    responseObject.daysToAverage = daysToAverage
    responseObject.movingAverage = movingAverage
    responseObject.symbol = symbol

    console.log(
      'The current time is ' + currentTime +
      '\nThe current price of ' + symbol + ' is ' + currentPrice +
      '\nThe ' + daysToAverage + ' day moving average is ' + movingAverage
      );

    if ( currentPrice > movingAverage ) {
      console.log('The recommended action is to HODL\n');
      responseObject.recommendation = 'HODL'
    } else {
      console.log('The recommended action is to sell all holdings into USD\n');
      responseObject.recommendation = 'SELL'
    }
    return responseObject
  });
};
