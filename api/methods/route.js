const { notFound, error } = require('./responses');
const { authenticate } = require('./methods/auth');

module.exports = async (context, actions, body) => {
  const { now, env, db } = context;
  const { action: actionName, token, data } = body;
  const action = actions[actionName];

  if (!action) {
    return notFound();
  }

  if (!action.authenticate) {
    return await action.execute(context, null, data);
  }

  const { user, errors } = await authenticate(context, token);

  if (errors) {
    return error(errors);
  }

  return await action.execute(context, user, data);
};