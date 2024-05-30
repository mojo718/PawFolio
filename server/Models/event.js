const { Schema, model } = require('mongoose');

// TODO: Add virtual for easily understood datetime

const eventSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    type: {
      type: String,
      enum: ['Vet Visit', 'Grooming', 'Walking', 'Play Date', 'Feeding'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    notes: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
);

const Event = model('Event', eventSchema);

module.exports = Event;