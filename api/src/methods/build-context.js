exports = (now, processEnv, db) => {
  const env = {
    isProduction: processEnv.NODE_ENV === 'production',
    token: {
      secret: processEnv.TOKEN_SECRET || 'default secret value',
      window: Number.parseInt(processEnv.TOKEN_WINDOW || '15')
    }
  };

  return { now, env, db };
};