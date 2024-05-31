const db = require('../../config/connection');
const { Owner, Pet, Event } = require('../../models')

const seedEvent = async (pets) => {
  const seededEvents = await Event.create(
    [
      {
        "startTime": "2024-06-01T10:00:00Z",
        "pet": pets[0],
        "owner": pets[0].owner._id,
        "type": "Vet Visit",
        "status": "Scheduled",
        "notes": "Check for ticks",
        "title": "Routine check-up"
      },
      {
        "startTime": "2024-06-05T15:00:00Z",
        "pet": pets[2],
        "owner": pets[2].owner._id,
        "type": "Grooming",
        "status": "Scheduled",
        "notes": "Full",
        "title": "Grooming session"
      }
    ]
  )

  for (let i = 0; i < seededEvents.length; i++) {
    const event = seededEvents[i]
    await Pet.findOneAndUpdate(
      { _id: event.pet._id },
      { $addToSet: { events: event._id } },
      { new: true, runValidators: true }
    )
  }

  console.log('----------Event data seeded!----------');
  return seededEvents;
}

module.exports = seedEvent;