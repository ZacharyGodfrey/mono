const connection = {};

// Module exports initialized object to ensure single database connection
module.exports = {
  getUser: async (userId) => {
    return {
      id: userId,
      passwordHash: 'A1B2C3D4E5F6'
    };
  }
};
