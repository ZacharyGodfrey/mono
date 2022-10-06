const db = require('../../../database/src/index');
const api = require('../../src/index');

// Documentation:
// https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
exports = async (event) => {
  const now = Date.now();
  const { status, body } = await api(now, process.env, db, event.httpMethod, event.body);

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
    body
  };
};
