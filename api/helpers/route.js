const { notFound, error } = require('./response');
const authenticate = require('./authenticate');

module.exports = async (db, actions, body) => {
  const { action: actionName, token, data } = body;
  const action = actions[actionName];

  if (!action) {
    return notFound();
  }

  if (!action.authenticate) {
    return await action.execute({ db, user: null }, data);
  }

  const { user, errors } = await authenticate(db, token);

  if (errors) {
    return error(errors);
  }

  return await action.execute({ db, user }, data);
};