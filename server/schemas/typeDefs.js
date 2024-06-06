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
    likes: String
    dislikes: String
    health: Health
    owner: Owner
    events: [Event]
    friends: [Pet]
  }

  type Health {
    allergies: [Allergy]
    vet: [Vet]
    diagnosis: [Diag]
    notes: [Note]
  }

  type Allergy {
    name: String!
  }

  type Vet {
    name: String
    location: String
    speciality: String
  }

  type Diag {
    _id: ID!
    issue: String!
    startDate: String
    endDate: String
    location: String
    pinPosition: String
  }

  type Note {
    description: String
    createdAt: String
  }

  type Event {
    _id: ID!
    title: String!
    type: String
    startTime: String
    location: String
    pet: [Pet]
    owner: [Owner]
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
    addFriend(petId: String!, friendId: String!): Pet
    removeFriend(petId: String!, friendId: String!): Pet
    updateBio(petId: String!, bio: String): Pet
    addEvent(petId: ID!, title: String!, startTime: String, location: String, type: String): Pet
    removeEvent(petId: ID!, eventId: ID!): Pet
    updatePet(petId: String!, name: String, pic: String, bio: String, species: String, breed: String, age: Int, adoptionDate: String): Pet
    addAllergy(petId: String!, name: String!): Pet
    addDiag(petId: String!, issue: String!, startDate: String, endDate: String, location: String): Pet
    removeDiag(petId: String!, diagId: String!): Pet
    setPin(petId: String!, diagId: String!, pinPosition: String!): Pet
    removePin(petId: String!, diagId: String!): Pet
  }
`;

module.exports = typeDefs;