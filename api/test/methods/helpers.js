const { expect } = require('chai');

const { uuid, hmac, encode, decode } = require('../../src/methods/helpers');

describe('methods/helpers.js', () => {
  describe('uuid', () => {
    describe('when called', () => {
      it('should return a valid UUIDv4 string', () => {
        const result = uuid();
        const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

        expect(typeof result).to.eq('string');
        expect(pattern.test(result)).to.eq(true);
      });
    });
  });

  describe('hmac', () => {
    describe('when called', () => {
      it('should return a valid HMAC hex string', () => {
        const secret = 'secret';
        const message = 'message';
        const encoding = 'hex';
        const result = hmac(secret, message, encoding);
        console.log(`${result.length}: ${result}`);
        const pattern = /^[0-9a-f]{64}$/;

        expect(typeof result).to.eq('string');
        expect(pattern.test(result)).to.eq(true);
      });
    });
  });

  describe('encode', () => {
    describe('when called', () => {
      it('should return a valid hex string', () => {
        const message = 'message';
        const encoding = 'hex';
        const result = encode(message, encoding);
        const pattern = /^[0-9a-f]+$/;

        expect(typeof result).to.eq('string');
        expect(pattern.test(result)).to.eq(true);
      });
    });
  });

  describe('decode', () => {
    describe('when called', () => {
      it('should return the original text that was encoded', () => {
        const message = 'message';
        const encoding = 'hex';
        const result = decode(encode(message, encoding), encoding);

        expect(typeof result).to.eq('string');
        expect(result).to.eq(message);
      });
    });
  });
});