export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    userId: ID!
    createdAt: String!
    updatedAt: String!

    author: Author!
    user: User!
  }

  type Query {
    book(id: ID!): Book
    books: [Book!]!
    authorBooks(authorId: ID!): [Book!]!
    userBooks(userId: ID!): [Book!]!
    myBooks: [Book!]!
  }

  input CreateBookInput {
    title: String!
    authorId: ID!
  }

  input UpdateBookInput {
    title: String
    authorId: ID
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): Book
  }
`;
