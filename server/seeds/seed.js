const db = require('../config/connection');
const { Owner, Pet, Event } = require('../models');
const cleanDB = require('./cleanDB');

const techData = require('./techData.json');

db.once('open', async () => {
  // await cleanDB('Owner', 'teches');
  // await cleanDB('Pet', 'teches');
  // await cleanDB('Event', 'teches');

  await Tech.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});
