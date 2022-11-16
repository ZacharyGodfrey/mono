module.exports = {
  authenticate: false,
  execute: async ({ now, env, db }, _, input) => {
    const { email, password } = input;
    const user = await db.createUser(context, email, password);

    return user;
  }
};