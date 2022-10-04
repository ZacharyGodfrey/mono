const { errors } = require('../constants');

const toJson = (value) => JSON.stringify(value, null, 2);

module.exports = {
  empty: () => ({
    status: 200,
    body: ''
  }),
  notFound: () => ({
    status: 200,
    body: toJson({
      ok: false,
      data: null,
      message: errors.routing.actionNotFound
    })
  }),
  success: (data, message) => ({
    status: 200,
    body: toJson({
      ok: true,
      data,
      message: message || null
    })
  }),
  error: (message) => ({
    status: 200,
    body: toJson({
      ok: false,
      data: null,
      message: message || errors.default
    })
  })
};