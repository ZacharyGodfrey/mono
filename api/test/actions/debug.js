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

      expect(typeof result.data).to.eq('object');
      expect(typeof result.message).to.eq('string');
      expect(result.data.now).to.eq(context.now);
      expect(result.data.env).to.eq(context.env);
      expect(result.data.db).to.eq(context.db);
      expect(result.data.user).to.eq(user);
      expect(result.data.input).to.eq(input);
    });
  });
});