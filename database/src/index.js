// TODO: Create connection
const connection = {};

const dbInterface = {
  // TODO: Implement interface
  getUser: async (userId) => {
    return {
      // Fake user for now
      id: userId,
      passwordHash: 'A1B2C3D4E5F6'
    };
  }
};

// Module exports initialized object to ensure single database connection
module.exports = dbInterface;
