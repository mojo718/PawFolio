const { Owner, Pet } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    owners: async () => {
      return Owner.find({}).populate('pets');
    },
    pet: async (parent, { petId }) => {
      return Pet.findById(petId).populate('owner').populate('events').populate('friends');
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
    addFriend: async (parent, { petId, friendId } , context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $addToSet: { friends: friendId } },
          { runValidators: true, new: true }
        )

        return pet;
      }
      throw AuthenticationError;
    },
    removeFriend: async (parent, { petId, friendId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $pull: { friends: friendId } },
          { runValidators: true, new: true }
        )

        return pet;
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
    },
    // Used for testing; Unused in client-side
    addAllergy: async (parent, { petId, name }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $addToSet: { "health.allergies": { name } } },
          { runValidators: true, new: true }
        )

        return pet;
      }
      throw AuthenticationError;
    },
    addDiag: async (parent, { petId, ...rest }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $addToSet: { "health.diagnosis": { ...rest } } },
          { runValidators: true, new: true }
        )

        return pet;
      }
      throw AuthenticationError;
    },
    removeDiag: async (parent, { petId, diagId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $pull: { "health.diagnosis": { _id: diagId } } },
          { runValidators: true, new: true }
        )
        return pet
      }
      throw AuthenticationError;
    },
    setPin: async (parent, { petId, diagId, pinPosition }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId, "health.diagnosis._id": diagId },
          { $set: { "health.diagnosis.$.pinPosition": pinPosition}},
          { runValidators: true, new: true }
        )
        return pet
      }
      throw AuthenticationError;
    },
    removePin: async (parent, { petId, diagId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndUpdate(
          { _id: petId, "health.diagnosis._id": diagId },
          { $unset: { "health.diagnosis.$.pinPosition": "" }},
          { runValidators: true, new: true }
        )
        return pet
      }
      throw AuthenticationError;
    }
  }
}

module.exports = resolvers;