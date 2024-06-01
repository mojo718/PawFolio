const db = require('../../config/connection');
const { Owner } = require('../../models')

const seedOwner = async () => {
  const seededOwners = await Owner.create(
    [
      {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "password123",
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