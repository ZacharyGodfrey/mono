const messages = require('./messages');

module.exports = {
  empty: () => ({
    status: 200,
    body: null
  }),
  notFound: () => ({
    status: 200,
    body: {
      ok: false,
      data: null,
      messages: [messages.errors.actionNotFound]
    }
  }),
  success: (data, messages) => ({
    status: 200,
    body: {
      ok: true,
      data,
      messages: messages || []
    }
  }),
  error: (messages) => ({
    status: 200,
    body: {
      ok: false,
      data: null,
      messages: messages || []
    }
  })
};