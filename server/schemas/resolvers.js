const { Owner, Pet } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const ObjectId = require('mongoose');

const resolvers = {
  Query: {
    owners: async () => {
      return Owner.find({}).populate('pets');
    },
    me: async(parents, args, context) => {
      if (context.user) {
        return Owner.findOne({ _id: context.user._id });
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
    },
    addPet: async (parent, args, context) => {
      const pet = await Pet.create({ ...args, owner: context.user._id });

      await Owner.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { pets: pet._id }},
        { runValidators: true, new: true }
      )

      return pet 
    }
  }
}

module.exports = resolvers;