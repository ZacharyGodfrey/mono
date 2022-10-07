module.exports = {
  errors: {
    default: 'An error occurred.',
    routing: {
      nonPostRequest: 'Only POST requests are supported.',
      actionNotFound: 'The requested action does not exist.'
    },
    auth: {
      invalidToken: 'The provided token was invalid.',
      expiredToken: 'The provided token has expired.',
      userNotFound: 'The user account does not exist.'
    }
  }
};