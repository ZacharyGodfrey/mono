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
      messages: [errors.routing.actionNotFound]
    })
  }),
  success: (data, messages) => ({
    status: 200,
    body: toJson({
      ok: true,
      data,
      messages: messages || []
    })
  }),
  error: (messages) => ({
    status: 200,
    body: toJson({
      ok: false,
      data: null,
      messages: messages || []
    })
  })
};