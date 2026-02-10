export const userTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!

    books: [Book!]!
  }

  type Query {
    me: User
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }
`;
