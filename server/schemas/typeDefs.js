const typeDefs = `
  type Owner {
    _id: ID!
    username: String!
    email: String!
    pets: [Pet]
    petCount: Int
  }

  type Pet {
    _id: ID!
    name: String
    pic: String
    bio: String
    species: String
    breed: String
    age: Int
    adoptionDate: String
    health: Health
    owner: Owner
    events: [Event]
  }

  type Health {
    allergies: String
    vet: [Vet]
    diagnosis: [Diag]
    notes: [Note]
  }

  type Vet {
    name: String
    location: String
    speciality: String
  }

  type Diag {
    _id: ID!
    issue: String
    startDate: String
    endDate: String
    location: String
  }

  type Note {
    description: String
    createdAt: String
  }

  type Event {
    _id: ID!
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
    pet(petId: String!): Pet
    me: Owner
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createOwner(username: String!, email: String!, password: String!): Auth
    addPet(name: String, pic: String, bio: String, species: String!, breed: String, age: Int, adoptionDate: String): Owner
    removePet(petId: String!): Owner
    updatePet(petId: String!, name: String, pic: String, bio: String, species: String!, breed: String, age: Int, adoptionDate: String): Pet
  }
`;

module.exports = typeDefs;