const db = require('../../../database/src/index');
const api = require('../../src/index');

// Documentation:
// https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
module.exports.handler = async (event) => {
  const now = Date.now();
  const { env } = process;
  const { httpMethod, body: httpBody } = event;
  const { status, body } = await api(now, env, db, httpMethod, httpBody);

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
