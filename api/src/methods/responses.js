const { errors } = require('../constants');

const toJson = (value) => {
  return JSON.stringify(value, null, 2);
};

exports.empty = () => ({
  status: 200,
  body: ''
});

exports.notFound = (token) => ({
  status: 200,
  body: toJson({
    ok: false,
    error: errors.routing.actionNotFound,
    token: token || null,
    data: null
  })
});

exports.success = (data, token) => ({
  status: 200,
  body: toJson({
    ok: true,
    error: null,
    token: token || null,
    data: data === undefined ? null : data
  })
});

exports.error = (message, token) => ({
  status: 200,
  body: toJson({
    ok: false,
    error: message || errors.default,
    token: token || null,
    data: null
  })
});