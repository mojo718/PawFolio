const { Owner, Pet } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    owners: async () => {
      return Owner.find({}).populate('pets');
    },
    pet: async (parent, { petId }) => {
      return Pet.findById(petId).populate('owner').populate('events');
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
      if (context.user) {
        const pet = await Pet.create({ ...args, owner: context.user._id });

        const owner = await Owner.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id }},
          { runValidators: true, new: true }
        )

        return owner;
      }
      throw AuthenticationError;
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndDelete({ _id: petId });

        const owner = await Owner.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: petId }},
          { runValidators: true, new: true }
        )

        return owner;
      }
      throw AuthenticationError;
    },
    updatePet: async (parent, { petId, ...rest }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { ...rest },
          { runValidators: true, new: true }
        )

        return pet;
      }
      throw AuthenticationError;
    }
  }
}

module.exports = resolvers;