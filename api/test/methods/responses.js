const { expect } = require('chai');

const { empty, notFound, success, error } = require('../../src/methods/responses');
const { errors: errorMessages } = require('../../src/constants');

describe('methods/responses.js', () => {
  describe('empty', () => {
    describe('when called', () => {
      it('should return the correct structure', () => {
        const result = empty();

        expect(typeof result).to.eq('object');
        expect(typeof result.status).to.eq('number');
        expect(typeof result.body).to.eq('string');
        expect(result.status).to.eq(200);
        expect(result.body).to.eq('');
      });
    });
  });

  describe('notFound', () => {
    describe('when called', () => {
      it('should return the correct structure', () => {
        const result = notFound();

        expect(result.status).to.eq(200);
        expect(typeof result.body).to.eq('string');

        const body = JSON.parse(result.body);

        expect(body.ok).to.eq(false);
        expect(body.error).to.eq(errorMessages.routing.actionNotFound);
        expect(body.data).to.eq(null);
      });
    });

    describe('when given a token', () => {
      it('should return the token in the response', () => {
        const token = 'abc.123';
        const result = notFound(token);
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(token);
      });
    });

    describe('when not given a token', () => {
      it('should return a null token in the response', () => {
        const result = notFound();
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(null);
      });
    });
  });

  describe('success', () => {
    describe('when called', () => {
      it('should return the correct structure', () => {
        const result = success();

        expect(result.status).to.eq(200);
        expect(typeof result.body).to.eq('string');

        const body = JSON.parse(result.body);

        expect(body.ok).to.eq(true);
        expect(body.message).to.eq(null);
      });
    });

    describe('when given data', () => {
      it('should return the data in the response', () => {
        const data = { abc: 123 };
        const result = success(data);
        const body = JSON.parse(result.body);

        expect(body.data).to.eql(data);
      });
    });

    describe('when not given data', () => {
      it('should return null data in the response', () => {
        const result = success();
        const body = JSON.parse(result.body);

        expect(body.data).to.eq(null);
      });
    });

    describe('when given a token', () => {
      it('should return the token in the response', () => {
        const token = 'abc.123';
        const result = success(null, token);
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(token);
      });
    });

    describe('when not given a token', () => {
      it('should return a null token in the response', () => {
        const result = success();
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(null);
      });
    });
  });

  describe('error', () => {
    describe('when called', () => {
      it('should return the correct structure', () => {
        const result = error();

        expect(result.status).to.eq(200);
        expect(typeof result.body).to.eq('string');

        const body = JSON.parse(result.body);

        expect(body.ok).to.eq(false);
        expect(typeof body.error).to.eq('string');
        expect(body.data).to.eq(null);
      });
    });

    describe('when given an error message', () => {
      it('should return the message in the response', () => {
        const message = 'Test message.';
        const result = error(message);
        const body = JSON.parse(result.body);

        expect(body.error).to.eq(message);
      });
    });

    describe('when not given an error message', () => {
      it('should return the default error message in the response', () => {
        const result = error();
        const body = JSON.parse(result.body);

        expect(body.error).to.eq(errorMessages.default);
      });
    });

    describe('when given a token', () => {
      it('should return the token in the response', () => {
        const token = 'abc.123';
        const result = error(null, token);
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(token);
      });
    });

    describe('when not given a token', () => {
      it('should return a null token in the response', () => {
        const result = error();
        const body = JSON.parse(result.body);

        expect(body.token).to.eq(null);
      });
    });
  });
});