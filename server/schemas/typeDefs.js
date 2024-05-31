const typeDefs = `
  type Owner {
    _id: ID!
    username: String!
    email: String!
    pets: [Pet]
  }

  type Pet {
    name: String!
    pic: String
    bio: String
    species: String
    breed: String
    age: Int
    adoptionDate: String
    owner: [Owner]
    events: [Event]
  }

  type Event {
    title: String!
    startTime: String
    location: String
    pet: [Pet]
    owner: [Owner]
    type: String
    status: String
    notes: String
    createdAt: String
  }

  type Auth {
    token: ID!
    owner: Owner
  }

  type Query {
    owners: [Owner]
    me: Owner
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createOwner(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;