const { Schema, model } = require('mongoose');

// TODO: Add virtuals for pet count

const ownerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
      },
    ],
  },
);

const Owner = model('Owner', ownerSchema);

module.exports = Owner;
