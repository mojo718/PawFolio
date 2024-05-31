const { Owner } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    owners: async () => {
      return Owner.find({}).populate('pets');
    },
    me: async(parents, args, context) => {
      if (context.user) {
        return Owner.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const owner = await Owner.findOne({ email });
      if (!owner) {
        throw AuthenticationError;
      }

      const correctPw = await owner.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(owner);

      return { token, owner };
    },
    createOwner: async (parent, { username, email, password }) => {
      const owner = await Owner.create({ username, email, password });
      const token = signToken(owner)
      return { token, owner };
    }
  }
}

module.exports = resolvers;