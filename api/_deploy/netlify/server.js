const db = require('../../../database/index');
const api = require('../../index');

// Documentation:
// https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
module.exports = async (event) => {
  const now = Date.now();
  const { status, body } = await api(now, process.env, db, event.httpMethod, event.body);
  const data = body === null ? '' : JSON.stringify(body, null, 2);

  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/json',
      'x-powered-by': ''
    },
    isBase64Encoded: false,
    body: data
  };
};
