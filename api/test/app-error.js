const { expect } = require('chai');

const AppError = require('../../../src/app-error');

describe('app-error.js', () => {
  describe('when initialized', () => {
    it('should pass the provided message to the base Error', () => {
      const message = 'Test error.';
      const error = new AppError(message);

      expect(error.message).to.eq(message);
    });
  });
});