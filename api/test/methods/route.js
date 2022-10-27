const { expect } = require('chai');
const { stub } = require('sinon');
const proxyquire = require('proxyquire');

describe('methods/route.js', () => {
  const successStub = stub();
  const notFoundStub = stub();
  const getUserFromTokenStub = stub();
  const executeStub = stub();

  const route = proxyquire('../../../src/methods/route', {
    './responses': {
      success: successStub,
      notFound: notFoundStub
    },
    './auth': {
      getUserFromToken: getUserFromTokenStub
    }
  });

  const requestBody = {
    action: 'fake action',
    token: 'abc.123',
    data: { abc: 123 }
  };

  beforeEach(() => {
    successStub.reset();
    notFoundStub.reset();
    getUserFromTokenStub.reset();
    executeStub.reset();
  });

  describe('when the action does not exist', () => {
    it('should call the notFound response method', async () => {
      const context = {};
      const actions = {};

      const result = await route(context, actions, requestBody);

      expect(notFoundStub.called).to.eq(true);
    });
  });

  describe('when the action does exist', () => {
    describe('when the action does not require authentication', () => {
      it('should execute the action with a null user', () => {
        const user = {};
        const context = {};
        const actions = {
          'fake action': {
            authenticate: false,
            execute: executeStub
          }
        };

        await route(context, actions, requestBody);

        expect(notFoundStub.called).to.eq(false);
        expect(getUserFromTokenStub.called).to.eq(false);
        expect(executeStub.called).to.eq(true);
        expect(executeStub.getCall(0).args[1]).to.eq(null);
        expect(successStub.called).to.eq(true);
      });
    });

    describe('when the action requires authentication', () => {
      it('should get the user from the provided token', () => {
        const user = {};
        const context = {};
        const actions = {
          'fake action': {
            authenticate: true,
            execute: executeStub
          }
        };

        getUserFromTokenStub.resolves(user);

        await route(context, actions, requestBody);

        expect(notFoundStub.called).to.eq(false);
        expect(getUserFromTokenStub.called).to.eq(true);
        expect(executeStub.called).to.eq(true);
        expect(executeStub.getCall(0).args[1]).to.eq(user);
        expect(successStub.called).to.eq(true);
      });
    });

    describe('when an error occurs', () => {
      it('should not call the success response method', async () => {
        const context = {};
        const actions = {};

        notFoundStub.rejects(new Error('Test error.'));

        await route(context, actions, requestBody).catch();

        expect(successStub.called).to.eq(false);
      })
    });
  });
});