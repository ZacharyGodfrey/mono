const responses = require('./methods/responses');
const { errors } = require('./constants');
const route = require('./methods/route');
const actions = require('./actions');
const buildContext = require('./methods/build-context');
const AppError = require('./app-error');

module.exports = async (now, processEnv, db, httpMethod, requestBody) => {
  let context = null;

  try {
    context = buildContext(now, processEnv, db);

    switch (httpMethod.toUpperCase()) {
      case 'OPTIONS': return responses.empty();

      case 'POST': return await route(context, actions, requestBody);

      default: return responses.error(errors.routing.nonPostRequest);
    }
  } catch (error) {
    console.error(error);

    const isDevelopment = context && !context.env.isProduction;
    const isAppError = error instanceof AppError;
    const message = isDevelopment || isAppError ? error.message : errors.default;

    return responses.error(message);
  }
};
