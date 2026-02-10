export const reviewTypeDefs = /* GraphQL */ `
  type Review {
    id: ID!
    rating: Int!
    content: String!
    userId: ID!
    bookId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    review(id: ID!): Review
    reviews: [Review!]!
    reviewsByUser(userId: ID!): [Review!]!
    reviewsByBook(bookId: ID!): [Review!]!
  }

  input CreateReviewInput {
    rating: Int!
    content: String!
    bookId: ID!
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: ID!): Review
  }
`;
