const { success } = require('../methods/responses');

exports = {
  authenticate: true,
  execute: async (context, user, input) => {
    const { now, env, db } = context;
    const message = 'Debug info returned successfully.';

    return success({ now, env, user, input }, message);
  }
};