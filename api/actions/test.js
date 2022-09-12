const { success } = require('../helpers/response');

module.exports = async (context, input) => {
  return success({ abc: 123, def: 456 });
};
