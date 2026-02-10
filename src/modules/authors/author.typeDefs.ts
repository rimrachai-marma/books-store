export const authorTypeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!

    books: [Book!]!
  }

  type Query {
    author(id: ID!): Author
    authors: [Author!]!
  }

  input CreateAuthorInput {
    name: String!
  }

  input UpdateAuthorInput {
    name: String
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
    updateAuthor(id: ID!, input: UpdateAuthorInput!): Author
    deleteAuthor(id: ID!): Author
  }
`;
