const { success } = require('../methods/responses');

module.exports = {
  authenticate: true,
  execute: async ({ now, env, db }, user, input) => {
    const message = 'Debug info returned successfully.';

    return success({ now, env, user, input }, message);
  }
};