const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const debug = require('debug')('debug');
const logger = require('morgan');
const currency = require('./lib');

dotenv.config();
const app = express();

debug('App invoked.');
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(logger('tiny'));

app.get('/', (req, res) => res.json({
  message: 'API bot listening.',
}));

app.post('/action', (req, res) => {
  if (req.body.result) {
    return currency(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({
      error: err.message || err,
    }));
  }
  return res.status(401).json({
    error: 'No parsing result available...',
  });
});

app.listen(process.env.PORT || 3000, () => {
  const tpl = `App listening on port ${process.env.PORT || 3000}`;
  debug(tpl);
});
