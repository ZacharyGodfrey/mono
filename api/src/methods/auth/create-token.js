const { hmac, encode } = require('../helpers');

module.exports = (id, now, secret) => {
  const body = JSON.stringify({ id, createdAt: now });
  const encodedBody = encode.hex(body);
  const hash = hmac(secret, encodedBody, 'hex');

  return `${encodedBody}.${hash}`;
};