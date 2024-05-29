const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    dateTime: {
        type: Date,
        required: true,
      },
        pet: {
            type: Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Owner',
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
            default: Date.now,
        },
    });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;