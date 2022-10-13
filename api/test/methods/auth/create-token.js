const { expect } = require('chai');
const { stub } = require('sinon');
const proxyquire = require('proxyquire');

const createToken = require('../../../src/methods/auth/create-token');

describe('methods/auth/create-token.js', () => {
  describe('when called', () => {
    it('should return a string with two hex values separated by a period', () => {
      const id = 'abc-123';
      const now = Date.now();
      const secret = 'super secret value';
      const result = createToken(id, now, secret);
      const pattern = /^[0-9A-F]+\.[0-9A-F]+$/;

      expect(typeof result).to.eq('string');
      expect(pattern.test(result)).to.eq(true);
    });
  });
});