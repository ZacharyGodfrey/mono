const { expect } = require('chai');
const { stub } = require('sinon');
const proxyquire = require('proxyquire');

const { errors } = require('../src/constants');

describe('index.js', () => {
  const buildContextStub = stub();
  const responsesErrorStub = stub();
  const responsesEmptyStub = stub();
  const routeStub = stub();
  const actionsStub = stub();

  const subject = proxyquire('../src/index', {
    './methods/responses': {
      error: responsesErrorStub,
      empty: responsesEmptyStub
    },
    './methods/route': routeStub,
    './actions': actionsStub,
    './methods/build-context': buildContextStub
  });

  beforeEach(() => {
    buildContextStub.reset();
    responsesErrorStub.reset();
    responsesEmptyStub.reset();
    routeStub.reset();
    actionsStub.reset();
  });

  describe('when an error occurs', () => {
    describe('when on Production', () => {
      it('should call the error response with the default message', async () => {
        const now = Date.now();
        const env = {};
        const db = {};
        const method = undefined;
        const requestBody = {};

        buildContextStub.returns({
          now,
          env: { isProduction: true },
          db
        });

        await subject(now, env, db, method, requestBody);

        expect(responsesErrorStub.called).to.eq(true);
        expect(responsesErrorStub.getCall(0).args).to.eql([]);
      });
    });

    describe('when not on Production', () => {
      it('should call the error response with the default message and the thrown error message', async () => {
        const now = Date.now();
        const env = {};
        const db = {};
        const method = undefined;
        const requestBody = {};

        buildContextStub.returns({
          now,
          env: { isProduction: false },
          db
        });

        await subject(now, env, db, method, requestBody);

        expect(responsesErrorStub.called).to.eq(true);
        expect(responsesErrorStub.getCall(0).args).to.eql(["Cannot read properties of undefined (reading 'toUpperCase')"]);
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