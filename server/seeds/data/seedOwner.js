const db = require('../../config/connection');
const { Owner } = require('../../models')

const seedOwner = async () => {
  const seededOwners = await Owner.create(
    [
      {
        "username": "dummy5",
        "email": "dummy5@dummy5.com",
        "password": "dummy5",
      },
      {
        "username": "dummy6",
        "email": "dummy6@dummy6.com",
        "password": "dummy6",
      }
    ]
  )

  console.log('----------Owner data seeded!----------');
  return seededOwners;
}

module.exports = seedOwner;