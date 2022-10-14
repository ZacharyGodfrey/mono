const { expect } = require('chai');

const buildContext = require('../../../src/methods/build-context');
const { defaults } = require('../../../src/constants');

describe('methods/build-context.js', () => {
  describe('when called', () => {
    it('should return the correct structure', () => {
      const now = Date.now();
      const processEnv = {};
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(typeof result).to.eq('object');
      expect(typeof result.now).to.eq('number');
      expect(typeof result.env).to.eq('object');
      expect(typeof result.db).to.eq('object');
      expect(result.now).to.eq(now);
      expect(result.db).to.eq(db);
    });
  });

  describe('when NODE_ENV is production', () => {
    it('should set isProduction to true', () => {
      const now = Date.now();
      const processEnv = {
        NODE_ENV: 'production'
      };
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.isProduction).to.eq(true);
    });
  });

  describe('when NODE_ENV is not production', () => {
    it('should set isProduction to false', () => {
      const now = Date.now();
      const processEnv = {
        NODE_ENV: 'development'
      };
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.isProduction).to.eq(false);
    });
  });

  describe('when TOKEN_SECRET is not set', () => {
    it('should set secret to the default value', () => {
      const now = Date.now();
      const processEnv = {};
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.token.secret).to.eq(defaults.token.secret);
    });
  });

  describe('when TOKEN_SECRET is set', () => {
    it('should set secret to the specified value', () => {
      const now = Date.now();
      const processEnv = {
        TOKEN_SECRET: 'non-default value'
      };
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.token.secret).to.eq(processEnv.TOKEN_SECRET);
    });
  });

  describe('when TOKEN_WINDOW is not set', () => {
    it('should set window to the default value', () => {
      const now = Date.now();
      const processEnv = {};
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.token.window).to.eq(defaults.token.window * 60 * 1000);
    });
  });

  describe('when TOKEN_WINDOW is set', () => {
    it('should set window to the specified value', () => {
      const now = Date.now();
      const processEnv = {
        TOKEN_WINDOW: 1
      };
      const db = {};
      const result = buildContext(now, processEnv, db);

      expect(result.env.token.window).to.eq(processEnv.TOKEN_WINDOW * 60 * 1000);
    });
  });
});