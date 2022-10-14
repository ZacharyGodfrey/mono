const { defaults } = require('../constants');

const minutesToMilliseconds = (minutes) => minutes * 60 * 1000;

const tokenWindow = (envTokenWindow) => {
  const value = Number.parseInt(envTokenWindow || `${defaults.token.window}`);

  return minutesToMilliseconds(value);
};

module.exports = (now, processEnv, db) => {
  const env = {
    isProduction: processEnv.NODE_ENV === 'production',
    token: {
      secret: processEnv.TOKEN_SECRET || defaults.token.secret,
      window: tokenWindow(processEnv.TOKEN_WINDOW)
    }
  };

  return { now, env, db };
};