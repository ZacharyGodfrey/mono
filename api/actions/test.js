const { success } = require('../helpers/response');

module.exports = {
  authenticate: true,
  execute: async (context, input) => {
    const { db, user } = context;

    return success({
      now: new Date().toISOString(),
      user,
      input
    });
  }
};