const { errors } = require('../constants');

const toJson = (value) => JSON.stringify(value, null, 2);

exports.empty = () => ({
  status: 200,
  body: ''
});

exports.notFound = (token) => ({
  status: 200,
  body: toJson({
    ok: false,
    message: errors.routing.actionNotFound,
    token,
    data: null
  })
});

exports.success = (data, token) => ({
  status: 200,
  body: toJson({
    ok: true,
    message: '',
    token,
    data: data === undefined ? null : data
  })
});

exports.error = (message, token) => ({
  status: 200,
  body: toJson({
    ok: false,
    message,
    token,
    data: null
  })
});