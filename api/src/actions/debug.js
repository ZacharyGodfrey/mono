const { success } = require('../methods/responses');

module.exports = {
  authenticate: true,
  execute: async (context, user, input) => {
    const { now, env, db } = context;

    return success({ now, env, user, input });
  }
};