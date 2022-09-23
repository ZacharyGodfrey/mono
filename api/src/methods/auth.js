const { hmac, encode, decode } = require('./helpers');
const { errors: { auth: authErrors } } = require('../constants');

const createToken = (id, now, secret) => {
  const body = JSON.stringify({ id, createdAt: now });
  const encodedBody = encode.hex(body);
  const hash = hmac(secret, encodedBody, 'hex');

  return `${encodedBody}.${hash}`;
};

const isValid = (token, secret) => {
  const [encodedBody, hash] = token.split('.');

  return hash === hmac(secret, encodedBody, 'hex');
};

const parseToken = (token) => {
  const [encodedBody] = token.split('.');
  const body = decode.hex(encodedBody);

  return JSON.parse(body);
};

const isExpired = (createdAt, now, windowMinutes) => {
  const expirationTime = now - (windowMinutes * 60 * 1000);

  return createdAt < expirationTime;
};

const authenticate = async (context, token) => {
  const { now, env, db } = context;
  const { secret, window } = env.token;

  if (!isValid(token, secret)) {
    return {
      user: null,
      errors: [authErrors.invalidToken]
    };
  }

  const { id, createdAt } = parseToken(token);

  if (isExpired(createdAt, now, window)) {
    return {
      user: null,
      errors: [authErrors.expiredToken]
    };
  }

  const user = await db.getUser(id);

  if (!user) {
    return {
      user: null,
      errors: [authErrors.userNotFound]
    };
  }

  return {
    user,
    errors: []
  };
};

module.exports = {
  createToken,
  validateToken,
  parseToken,
  authenticate
};