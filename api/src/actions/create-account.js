const constants = require('../constants');

const getEmailBody = (userId) => {
  const link = `${constants.email.verifyAccount.link}?id=${userId}`;

  return `
    <h1>Welcome!</h1>
    <p>Please click <a href="${link}">here</a> to verify your email address.</p>
  `;
};

module.exports = {
  authenticate: false,
  execute: async ({ now, env, db, utilities }, _, input) => {
    const { email, password } = input;
    const user = await db.createUser(context, email, password);

    await utilities.sendEmail({
      from: constants.email.fromAddress,
      to: [email],
      subject: constants.email.verifyAccount.subject,
      body: getEmailBody(user.id)
    });

    return user;
  }
};