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
        "username": "jane_smith",
        "email": "jane.smith@example.com",
        "password": "password123",
      }
    ]
  )

  console.log('----------Owner data seeded!----------');
  return seededOwners;
}

module.exports = seedOwner;