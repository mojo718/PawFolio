const typeDefs = `
  type Owner {
    _id: ID!
    username: String!
    email: String!
  }

  type Query {
    owners: [Owner]
  }
`;

module.exports = typeDefs;