const connection = require('./connection');
const {
  getUser,
  createUser
} = require('./methods');

module.exports = {
  getUser: getUser(connection),
  createUser: createUser(connection),
};
