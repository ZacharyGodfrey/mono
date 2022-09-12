const { success } = require('../helpers/response');

module.exports = {
  authenticate: true,
  execute: async (context, input) => {
    const { user } = context;

    return success({
      serverTime: new Date().toISOString(),
      user,
      input
    });
  }
};