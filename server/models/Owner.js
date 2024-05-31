const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
  {
    toJSON: {
      virtuals: true,
    },
  }
);

ownerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

ownerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

ownerSchema.virtual('petCount').get(function () {
  return this.pets.length;
});

const Owner = model('Owner', ownerSchema);

module.exports = Owner;
