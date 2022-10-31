const connection = {};

const getUser = (conn) => {
  return async (userId) => {
    return {
      id: userId,
      email: 'test@fake.com',
      passwordHash: 'A1B2C3D4E5F6'
    };
  };
};

const createUser = (conn) => {
  return async (email, password) => {
    return {
      id: 'abc-123',
      email,
      passwordHash: 'A1B2C3D4E5F6'
    };
  };
};

// Export an initialized object to ensure single database connection
module.exports = {
  getUser: getUser(connection),
  createUser: createUser(connection),
};
