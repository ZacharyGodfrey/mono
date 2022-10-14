const { hmac, encode } = require('../helpers');

module.exports = (id, now, secret) => {
  const body = JSON.stringify({ id, createdAt: now });
  const encodedBody = encode(body, 'hex');
  const hash = hmac(secret, encodedBody, 'hex');

  return `${encodedBody}.${hash}`;
};