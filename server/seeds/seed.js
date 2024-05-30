const db = require('../config/connection');
const { Owner, Pet, Event } = require('../models');
const cleanDB = require('./cleanDB');

const ownerData = require('./data/ownerData.json');
const petData = require('./data/petData.json')
const eventData = require('./data/eventData.json')

db.once('open', async () => {

  await cleanDB('Owner', 'owners');
  await Owner.create(ownerData);
  console.log('----------Owner data seeded!----------');

  await cleanDB('Pet', 'pets');
  await Pet.create(petData);
  console.log('-----------Pet data seeded!-----------');

  await cleanDB('Event', 'events');
  await Event.create(eventData);
  console.log('----------Event data seeded!----------');

  process.exit(0);
});
