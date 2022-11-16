const { uuid, hmac } = require('../../utilities/src/index')

exports.getUser = (connection) => async (userId) => {
  return {
    id: userId,
    email: 'test@fake.com',
    passwordHash: 'A1B2C3D4E5F6'
  };
};

exports.createUser = (connection) => async (context, email, password) => {
  return {
    id: uuid(),
    email,
    passwordHash: hmac(context.env.token.secret, password, 'hex')
  };
};