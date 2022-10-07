const { v4: uuidV4 } = require('uuid');
const { createHmac } = require('crypto');
const { Buffer } = require('buffer');

module.exports.uuid = uuidV4;

module.exports.hmac = (secret, value, encoding) => {
  return createHmac('sha256', secret).update(value).digest(encoding);
};

module.exports.encode = {
  hex: (value) => Buffer.from(value, 'utf8').toString('hex'),
  base64: (value) => Buffer.from(value, 'utf8').toString('base64'),
};

module.exports.decode = {
  hex: (value) => Buffer.from(value, 'hex').toString('utf8'),
  base64: (value) => Buffer.from(value, 'base64').toString('utf8'),
};