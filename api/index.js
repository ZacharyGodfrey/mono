const { success, error, empty, notFound } = require('./helpers/response');
const route = require('./helpers/route');
const actions = require('./actions');
const { errors } = require('./helpers/messages');

module.exports = async (method, body) => {
  try {
    switch (method.toUpperCase()) {
      case 'OPTIONS': return empty();
      case 'POST': return await route(actions, body);
      default: return error([errors.nonPostRequest]);
    }
  } catch (error) {
    console.error(error);

    const isProduction = process.env.NODE_ENV === 'production';
    const messages = isProduction ? [errors.default] : [errors.default, error.message];

    return error(messages);
  }
};