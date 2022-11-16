const responses = require('./responses');
const { getUserFromToken } = require('./auth');

module.exports = async (context, actions, body) => {
  const { action: actionName, token, data } = body;
  const action = actions[actionName];

  if (!action) {
    return responses.notFound(token);
  }

  const { authenticate, execute } = action;
  const user = !authenticate ? null : await getUserFromToken(context, token);
  const result = await execute(context, user, data);

  return responses.success(result, token);
};