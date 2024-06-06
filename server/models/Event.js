const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Vet Visit', 'Grooming', 'Walking', 'Play Date', 'Feeding', 'Other'],
      default: 'Other'
    },
    startTime: {
      type: Date
    },
    location: {
      type: String
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
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

// TODO: Add virtual for easily understood datetime
eventSchema.virtual('readableStartTime').get(function () {
  return moment(this.startTime).format('MM DD YYYY');
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = model('Event', eventSchema);

module.exports = Event;