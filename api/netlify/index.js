const db = require('database')();
const api = require('api')(db);

/*
  Documentation:
  https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html#apigateway-example-event
*/
module.exports = async (event) => {
  const { httpMethod, body: input } = event;
  const { status, body: output } = await api(httpMethod, input);

  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST',
      'x-powered-by': ''
    },
    isBase64Encoded: false,
    body: output === null ? '' : JSON.stringify(output, null, 2)
  };
};
