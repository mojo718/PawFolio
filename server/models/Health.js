const { Schema, Types } = require('mongoose');

const vetSchema = new Schema(
  {
    vetName: {
      type: String
    },
    location: {
      type: String
    },
    speciality: {
      type: String
    }
  },
  {
    _id: false
  }
)

const diagSchema = new Schema(
  {
    issue: {
      type: String
    },
    startDate: {
      type: Date,
      default: Date.now()
    },
    endDate:{
      type: Date
    },
    location: {
      type: String
    }
  },
  {
    _id: false
  }
)

const notesSchema = new Schema(
  {
    description: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    _id: false
  }
)

const healthSchema = new Schema(
  {
    allergies: {
      type: String
    },
    vet: [vetSchema],
    diagnosis: [diagSchema],
    notes: [notesSchema]
  },
  {
    _id: false
  }
)

module.exports = healthSchema;