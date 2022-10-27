const { hmac, encode, decode } = require('./helpers');
const { errors: { auth: authErrors } } = require('../constants');
const AppError = require('../app-error');

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

module.exports.createToken = (id, now, secret) => {
  const body = JSON.stringify({ id, createdAt: now });
  const encodedBody = encode(body, 'hex');
  const hash = hmac(secret, encodedBody, 'hex');

  return `${encodedBody}.${hash}`;
};

module.exports.getUserFromToken = async (context, token) => {
  const { now, env, db } = context;
  const { secret, window } = env.token;

  if (!isValid(token, secret)) {
    throw new AppError(authErrors.invalidToken);
  }

  const { id, createdAt } = parseToken(token);

  if (isExpired(createdAt, now, window)) {
    throw new AppError(authErrors.expiredToken);
  }

  const user = await db.getUser(id);

  if (!user) {
    throw new AppError(authErrors.userNotFound);
  }

  return user;
};