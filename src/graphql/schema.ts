import { makeExecutableSchema } from '@graphql-tools/schema';
import { userTypeDefs } from '../modules/users/user.typeDefs';
import { userResolvers } from '../modules/users/user.resolvers';
import { bookTypeDefs } from '../modules/books/book.typeDefs';
import { bookResolvers } from '../modules/books/book.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, bookTypeDefs],
  resolvers: [userResolvers, bookResolvers],
});