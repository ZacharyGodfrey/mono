const { expect } = require('chai');
const { stub } = require('sinon');
const proxyquire = require('proxyquire');

const { errors } = require('../src/constants');
const AppError = require('../src/app-error');

describe('index.js', () => {
  const responsesErrorStub = stub();
  const responsesEmptyStub = stub();
  const routeStub = stub();

  const subject = proxyquire('../src/index', {
    './methods/responses': {
      error: responsesErrorStub,
      empty: responsesEmptyStub
    },
    './methods/route': routeStub
  });

  beforeEach(() => {
    responsesErrorStub.reset();
    responsesEmptyStub.reset();
    routeStub.reset();
  });

  describe('when an error occurs', () => {
    describe('when on Production', () => {
      describe('when the error is an AppError', () => {
        it('should call the error response with the thrown error message', async () => {
          const now = Date.now();
          const processEnv = { NODE_ENV: 'production' };
          const db = {};
          const method = 'POST';
          const requestBody = {};
          const error = new AppError('Test message.');

          routeStub.throws(error);

          await subject(now, processEnv, db, method, requestBody);

          expect(responsesErrorStub.called).to.eq(true);
          expect(responsesErrorStub.getCall(0).calledWithExactly(error.message)).to.eq(true);
        });
      });

      describe('when the error is not an AppError', () => {
        it('should call the error response with the default message', async () => {
          const now = Date.now();
          const processEnv = { NODE_ENV: 'production' };
          const db = {};
          const method = 'POST';
          const requestBody = {};
          const error = new Error('Test message.');

          routeStub.throws(error);

          await subject(now, processEnv, db, method, requestBody);

          expect(responsesErrorStub.called).to.eq(true);
          expect(responsesErrorStub.getCall(0).calledWithExactly(errors.default)).to.eq(true);
        });
      });
    });

    describe('when not on Production', () => {
      it('should call the error response with the thrown error message', async () => {
        const now = Date.now();
        const processEnv = { NODE_ENV: 'development' };
        const db = {};
        const method = 'POST';
        const requestBody = {};
        const error = new Error('Test message.');

        routeStub.throws(error);

        await subject(now, processEnv, db, method, requestBody);

        expect(responsesErrorStub.called).to.eq(true);
        expect(responsesErrorStub.getCall(0).calledWithExactly(error.message)).to.eq(true);
      });
    });
  });

  describe('when given an OPTIONS request', () => {
    it('should call the empty response', async () => {
      const now = Date.now();
      const env = {};
      const db = {};
      const method = 'OPTIONS';
      const requestBody = undefined;

      await subject(now, env, db, method, requestBody);

      expect(responsesErrorStub.called).to.eq(false);
      expect(responsesEmptyStub.called).to.eq(true);
    });
  });

  describe('when given a POST request', () => {
    it('should call the route method', async () => {
      const now = Date.now();
      const env = {};
      const db = {};
      const method = 'POST';
      const requestBody = { action: 'Test Action Name' };

      routeStub.resolves();
      await subject(now, env, db, method, requestBody);

      expect(responsesErrorStub.called).to.eq(false);
      expect(routeStub.called).to.eq(true);
    });
  });

  describe('when given a non-POST request', () => {
    it('should call the error response with the nonPostRequest error', async () => {
      const now = Date.now();
      const env = {};
      const db = {};
      const method = 'GET';
      const requestBody = undefined;

      await subject(now, env, db, method, requestBody);

      expect(responsesErrorStub.getCall(0).calledWithExactly(errors.routing.nonPostRequest)).to.eq(true);
      expect(routeStub.called).to.eq(false);
    });
  });
});