const petSchema = new Schema({
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
    PetEvents: [
      {
        date: Date,
        type: String,
        description: String,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    AdoptionDate: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Pet = mongoose.model('Pet', petSchema);
  
  module.exports = Pet;