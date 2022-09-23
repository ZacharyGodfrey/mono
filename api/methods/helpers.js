const { v4: uuidV4 } = require('uuid');
const { createHmac } = require('node:crypto');
const { Buffer } = require('node:buffer');

const hmac = (secret, value, encoding) => {
  return createHmac('sha256', secret).update(value).digest(encoding);
};

const encode = {
  hex: (value) => Buffer.from(value, 'utf8').toString('hex'),
  base64: (value) => Buffer.from(value, 'utf8').toString('base64'),
};

const decode = {
  hex: (value) => Buffer.from(value, 'hex').toString('utf8'),
  base64: (value) => Buffer.from(value, 'base64').toString('utf8'),
};

module.exports = {
  uuid: uuidV4,
  hmac,
  encode,
  decode
};