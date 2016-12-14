// Slack chat integration format
// https://api.slack.com/docs/attachments
// https://api.slack.com/docs/formatting#formatting_and_attachments

module.exports = (data) => {
  const response = {};
  const date = new Date();
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (data.unit) {
    response.speech = `${data.unit.amount} ${data.source} are ${data.value} ${data.currency}.`;
  } else {
    response.speech = `Exchange rate for ${data.source} in ${data.currency} is ${data.value}.`;
  }
  response.displayText = response.speech;
  response.data = {};

  response.data.slack = {
    text: response.speech,
    attachments: [{
      color: '#a1ff59',
      title: `Exchange rate ${data.source} - ${data.currency}`,
      fields: [{
        title: dateString,
        value: `1.00 ${data.source}: ${data.rate} ${data.currency}`,
        short: true,
      }],
    }],
  };

  return response;
};

// Sample format:
// Body:
// {
// "speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
// "displayText": "Barack Hussein Obama II is the 44th and current President of the United States
// "data": {...},
// "contextOut": [...],
// "source": "DuckDuckGo"
// }
