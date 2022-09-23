const db = require('database');
const api = require('..');

// Documentation:
// https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
module.exports = async (event) => {
  const now = Date.now();
  const { status, body } = await api(now, process.env, db, event.httpMethod, event.body);

  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST',
      'x-powered-by': ''
    },
    isBase64Encoded: false,
    body: body === null ? '' : JSON.stringify(body, null, 2)
  };
};
