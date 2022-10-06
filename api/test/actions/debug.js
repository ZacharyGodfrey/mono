const { expect } = require('chai');
const { stub } = require('sinon');
const proxyquire = require('proxyquire');

describe('actions/debug.js', () => {
  const successStub = stub();

  const action = proxyquire('../../src/acions/debug', {
    '../methods/responses': {
      success: successStub
    }
  });

  beforeEach(() => {
    successStub.reset();
  });

  describe('when initialized', () => {
    it('should have the correct properties', () => {
      expect(action.authenticate).to.eq(true);
      expect(typeof action.execute).to.eq('function');
    });
  });

  describe('when executed', () => {
    it('should call success response method', async () => {
      await action.execute({
        now: Date.now(),
        env: {},
        db: {}
      }, {}, {});

      expect(successStub.called).to.eq(true);
    });
  });
});