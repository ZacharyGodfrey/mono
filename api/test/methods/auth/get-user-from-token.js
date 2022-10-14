const { expect } = require('chai');
const { stub } = require('sinon');

const { errors: { auth: authErrors } } = require('../../../src/constants');
const createToken = require('../../../src/methods/auth/create-token');
const { getUserFromToken } = require('../../../src/methods/auth');

describe('methods/auth/create-token.js', () => {
  const dbGetUserStub = stub();

  const id = 'abc-123';
  const now = Date.now();
  const secret = 'super secret value';
  const context = {
    now,
    env: {
      token: {
        secret,
        window: 15
      }
    },
    db: {
      getUser: dbGetUserStub
    }
  };

  beforeEach(() => {
    dbGetUserStub.reset();
  });

  describe('when the token is invalid', () => {
    it('should return an error', async () => {
      const token = 'INVALID.TOKEN';
      const result = await getUserFromToken(context, token);

      expect(result.user).to.eq(null);
      expect(result.error).to.eq(authErrors.invalidToken);
      expect(dbGetUserStub.called).to.eq(false);
    });
  });

  describe('when the token is expired', () => {
    it('should return an error', async () => {
      const createdAt = now - ((context.env.token.window + 1) * 60 * 1000);
      const token = createToken(id, createdAt, secret);
      const result = await getUserFromToken(context, token);

      expect(result.user).to.eq(null);
      expect(result.error).to.eq(authErrors.expiredToken);
      expect(dbGetUserStub.called).to.eq(false);
    });
  });

  describe('when the token is not expired', () => {
    it('should request the user from the database', async () => {
      dbGetUserStub.resolves({ id });

      const token = createToken(id, now, secret);

      await getUserFromToken(context, token);

      expect(dbGetUserStub.called).to.eq(true);
    });
  });

  describe('when the user is not found in the database', () => {
    it('should return an error', async () => {
      dbGetUserStub.resolves(null);

      const token = createToken(id, now, secret);
      const result = await getUserFromToken(context, token);

      expect(dbGetUserStub.called).to.eq(true);
      expect(result.user).to.eq(null);
      expect(result.error).to.eq(authErrors.userNotFound);
    });
  });

  describe('when the user is found in the database', () => {
    it('should return the user', async () => {
      const dbResult = { id };
      dbGetUserStub.resolves(dbResult);

      const token = createToken(id, now, secret);
      const result = await getUserFromToken(context, token);

      expect(dbGetUserStub.called).to.eq(true);
      expect(result.user).to.eq(dbResult);
      expect(result.error).to.eq(null);
    });
  });
});