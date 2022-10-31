const { hmac, encode, decode } = require('../../../utilities/src/index');
const { errors: { auth: authErrors } } = require('../constants');
const AppError = require('../app-error');

const createSignature = (secret, value) => {
  return hmac(secret, value, 'hex').toUpperCase();
};

const isValid = (token, secret) => {
  const [encodedBody, signature] = token.split('.');

  return signature === createSignature(secret, encodedBody);
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
  const encodedBody = encode(body, 'hex').toUpperCase();
  const signature = createSignature(secret, encodedBody);

  return `${encodedBody}.${signature}`;
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