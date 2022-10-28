const { expect } = require('chai');

const { debug } = require('../../src/actions');

describe('actions/debug.js', () => {
  describe('when initialized', () => {
    it('should have the correct properties', () => {
      expect(debug.authenticate).to.eq(true);
      expect(typeof debug.execute).to.eq('function');
    });
  });

  describe('when executed', () => {
    it('should return the correct values', async () => {
      const context = {
        now: Date.now(),
        env: {},
        db: {}
      };
      const user = { id: 'abc-123'};
      const input = { abc: 123 };
      const result = await debug.execute(context, user, input);

      expect(typeof result).to.eq('object');
      expect(result.now).to.eq(context.now);
      expect(result.env).to.eq(context.env);
      expect(result.db).to.eq(Object.keys(context.db));
      expect(result.user).to.eq(user);
      expect(result.input).to.eq(input);
    });
  });
});