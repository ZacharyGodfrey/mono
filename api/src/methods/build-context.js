const minutesToMilliseconds = (minutes) => minutes * 60 * 1000;

module.exports = (now, processEnv, db) => {
  const env = {
    isProduction: processEnv.NODE_ENV === 'production',
    token: {
      secret: processEnv.TOKEN_SECRET || 'default secret value',
      window: minutesToMilliseconds(Number.parseInt(processEnv.TOKEN_WINDOW || '15'))
    }
  };

  return { now, env, db };
};