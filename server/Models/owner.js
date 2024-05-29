const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
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
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
