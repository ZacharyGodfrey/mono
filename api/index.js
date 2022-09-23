const { error, empty } = require('./methods/responses');
const { errors } = require('./constants');
const route = require('./methods/route');
const actions = require('./actions');
const buildContext = require('./methods/build-context');

module.exports = async (now, processEnv, db, httpMethod, requestBody) => {
  let context = null;

  try {
    context = buildContext(now, processEnv, db);

    switch (httpMethod.toUpperCase()) {
      case 'OPTIONS': return empty();

      case 'POST': return await route(context, actions, requestBody);

      default: return error([errors.routing.nonPostRequest]);
    }
  } catch (e) {
    console.error(e);

    const isProduction = context && context.env && context.env.isProduction;
    const messages = isProduction ? [errors.default, e.message] : [errors.default];

    return error(messages);
  }
};
