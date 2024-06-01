const { Schema, model } = require('mongoose');
const healthSchema = require('./Health');

// TO CONSIDER: Change age to birthday then add a virtual to convert to age when needed
// NOTE: picLink may not work yet, need testing

const petSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "Unnamed"
    },
    pic: {
      type: String,
      default: './assets/profilePic/projects/catPFP360x360.jpg'
    },
    bio: {
      type: String,
      // Does this need a character limit?
    },
    species: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },  
    adoptionDate: {
      type: Date,
    },
    health: healthSchema,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner'
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  }
);
  
  const Pet = model('Pet', petSchema);
  
  module.exports = Pet;