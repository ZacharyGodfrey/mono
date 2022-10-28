module.exports = {
  authenticate: true,
  execute: async ({ now, env, db }, user, input) => ({
    now,
    env,
    db: Object.keys(db),
    user,
    input
  })
};