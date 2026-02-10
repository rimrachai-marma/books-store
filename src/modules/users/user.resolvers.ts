import { UserService } from "./user.service";
import type { GraphQLContext } from "../../types/context";

export const userResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const userService = new UserService(context.db);
      return userService.getUserById(context.user.id);
    },

    user: async (
      _: unknown,
      { userId }: { userId: string },
      context: GraphQLContext,
    ) => {
      const userService = new UserService(context.db);
      return userService.getUserById(userId);
    },

    users: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const userService = new UserService(context.db);
      return userService.getAllUsers();
    },
  },

  User: {
    books: async (
      parent: { id: string },
      _: unknown,
      context: GraphQLContext,
    ) => {
      const bookService = (await import("../books/book.service")).BookService;
      const bookServiceInstance = new bookService(context.db);
      return bookServiceInstance.getBooksByUserId(parent.id);
    },
  },

  Mutation: {
    updateUser: async (
      _: unknown,
      { input }: { input: { name?: string; email?: string } },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const userService = new UserService(context.db);
      return userService.updateUser(context.user.id, input);
    },
  },
};
