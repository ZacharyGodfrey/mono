const { v4: uuidV4 } = require('uuid');
const { createHmac } = require('crypto');
const { Buffer } = require('buffer');

module.exports.uuid = uuidV4;

module.exports.hmac = (secret, value, encoding) => createHmac('sha256', secret).update(value).digest(encoding);

module.exports.encode = (value, encoding) => Buffer.from(value, 'utf8').toString(encoding);

module.exports.decode = (value, encoding) => Buffer.from(value, encoding).toString('utf8');