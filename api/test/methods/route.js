const { expect } = require('chai');

const route = require('../../../src/methods/route');

describe('methods/route.js', () => {
  describe('when the action does not exist', () => {
    it('should call the notFound response method', async () => {
      const context = {
        now: Date.now(),
        env: {},
        db: {}
      };
      const actions = {};
      const body = {
        action: 'fake action',
        token: 'abc.123',
        data: { abc: 123 }
      };
      const result = await route(context, actions, body);

      throw new Error('Not implemented yet.');
    });
  });

  describe('when the action does exist', () => {
    describe('when the action does not require authentication', () => {
      it('should execute the action with a null user', () => {
        throw new Error('Not implemented yet.');
      });
    });

    describe('when the action requires authentication', () => {
      it('should get the user from the provided token', () => {
        throw new Error('Not implemented yet.');
      });

      describe('when authentication fails', () => {
        it('should...', async () => {
          const context = {
            now: Date.now(),
            env: {},
            db: {}
          };
          const actions = {
            '': {
              authenticate: false,
              execute: async () => {}
            }
          };
          const body = {
            action: 'fake action',
            token: 'abc.123',
            data: { abc: 123 }
          };
          const result = await route(context, actions, body);

          throw new Error('Not implemented yet.');
        });
      });

      describe('when authentication succeeds', () => {
        it('should...', async () => {
          const context = {
            now: Date.now(),
            env: {},
            db: {}
          };
          const actions = {
            '': {
              authenticate: false,
              execute: async () => {}
            }
          };
          const body = {
            action: 'fake action',
            token: 'abc.123',
            data: { abc: 123 }
          };
          const result = await route(context, actions, body);

          throw new Error('Not implemented yet.');
        });
      });
    });

    describe('when an error occurs', () => {
      it('should not call the success response method', async () => {
        throw new Error('Not implemented yet.');
      })
    });
  });
});