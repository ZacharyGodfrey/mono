const { notFound } = require('./response');

module.exports = async (actions, body) => {
  const { action: actionName, token, data } = body;
  const context = { token };
  const action = actions[actionName];

  if (!action) {
    return notFound();
  }

  const result = await action(context, data);

  return result;
};
