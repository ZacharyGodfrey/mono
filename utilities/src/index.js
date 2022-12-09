const { v4: uuidV4 } = require('uuid');
const { createHmac } = require('crypto');
const { Buffer } = require('buffer');
const nodemailer = require('nodemailer');

module.exports.uuid = uuidV4;

module.exports.hmac = (secret, value, encoding) => createHmac('sha256', secret).update(value).digest(encoding);

module.exports.encode = (value, encoding) => Buffer.from(value, 'utf8').toString(encoding);

module.exports.decode = (value, encoding) => Buffer.from(value, encoding).toString('utf8');

module.exports.sendEmail = async ({ from, to, subject, body }) => {
  const { user, pass } = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to: to.join(', '),
    subject,
    html: body
  });
};