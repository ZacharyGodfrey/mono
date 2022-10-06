const connection = {};

// Export an initialized object to ensure single database connection
exports = {
  getUser: async (userId) => {
    return {
      id: userId,
      passwordHash: 'A1B2C3D4E5F6'
    };
  }
};
