# bot-currency
An api.ai [Slack](https://slack.com) bot for handling currency exchange queries, featuring ISO 4217 currency codes, capitals and countries.

## Prerequisites
* Node.JS v6 LTS
* NPM (usually included in Node.JS)
* Publicly available server
* API key from [exchangerate-api.com](https://www.exchangerate-api.com)
* API.ai setup (see [API.ai settings](#apiai-settings))
* Slack account

## Install
1. `git clone https://github.com/saschazar21/bot-currency.git`
2. change directory into `bot-currency`
3. `npm install` to install dependencies
4. create `.env` file and set necessary variables according to `.env.sample`

## Functionality
`GET /` - Returns a simple status message, that the bot is listening.  
`POST /action` - Needs a JSON body from API.ai. This is the endpoint you may configure in your API.ai account. It will return a preformatted JSON object for Slack.

## Slack settings
Please refer to the [Slack docs](https://get.slack.help/hc/en-us) for integrating a bot account into your channel.

## API.ai settings
This bot listens for three different API.ai intents:

* `travel.currency - city`  
Features 2 out of 3 fields: `city` (mandatory), `unit`, `currency`

* `travel.currency - country`  
Features 2 out of 3 fields: `country` (mandatory), `unit`, `currency`

* `travel.currency - rate`  
Features 2 out of 3 fields: `compare-currency` (mandatory), `unit`, `currency`

### Fields
`currency` always features an ISO 4217 currency code, whereas `unit` always is a JSON object like this:  
```javascript
{
  amount: 10,
  currency: USD
}
```
Example above goes for *10 Dollars*.

## Copyright
2016/2017 - Sascha Zarhuber
