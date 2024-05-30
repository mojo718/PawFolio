const db = require('../config/connection');
const cleanDB = require('./cleanDB');
const seedEvent = require('./data/seedEvent');
const seedOwner = require('./data/seedOwner')
const seedPet = require('./data/seedPet')

db.once('open', async () => {

  await cleanDB('Owner', 'owners');
  await cleanDB('Pet', 'pets');
  await cleanDB('Event', 'events');

  const owners = await seedOwner();

  const pets = await seedPet(owners);

  await seedEvent(pets);

  process.exit(0);
});
