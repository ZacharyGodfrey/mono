const { hmac, decode } = require('../helpers');
const { errors: { auth: authErrors } } = require('../../constants');

const isValid = (token, secret) => {
  const [encodedBody, hash] = token.split('.');

  return hash === hmac(secret, encodedBody, 'hex');
};

const parseToken = (token) => {
  const [encodedBody] = token.split('.');
  const body = decode(encodedBody, 'hex');

  return JSON.parse(body);
};

const isExpired = (createdAt, now, windowMilliseconds) => {
  const expirationTime = now - windowMilliseconds;

  return createdAt < expirationTime;
};

module.exports = async (context, token) => {
  const { now, env, db } = context;
  const { secret, window } = env.token;

  if (!isValid(token, secret)) {
    return { user: null, error: authErrors.invalidToken };
  }

  const { id, createdAt } = parseToken(token);

  if (isExpired(createdAt, now, window)) {
    return { user: null, error: authErrors.expiredToken };
  }

  const user = await db.getUser(id);

  if (!user) {
    return { user: null, error: authErrors.userNotFound };
  }

  return { user, error: null };
};