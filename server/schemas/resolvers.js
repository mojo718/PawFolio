const { Owner } = require('../models')

const resolvers = {
  Query: {
    owners: async () => {
      return Owner.find({});
    }
  }
}

module.exports = resolvers;