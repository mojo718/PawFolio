const { Schema, model } = require('mongoose');

// TODO: Finish health model to add as a subdocument schema to pet model
// TO CONSIDER: Change age to birthday then add a virtual to convert to age when needed

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
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