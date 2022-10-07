const { notFound, error } = require('./responses');
const getUserFromToken = require('./auth/get-user-from-token');

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

  const { user, error: e } = await getUserFromToken(context, token);

  return e ? error(e) : await action.execute(context, user, data);
};