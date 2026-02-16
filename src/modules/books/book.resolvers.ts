import type { GraphQLContext } from "../../types/context";
import { BookService } from "./book.service";

export const bookResolvers = {
  Query: {
    book: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext,
    ) => {
      const bookService = new BookService(context.db);
    },

    books: async (
      _: unknown,
      args: {
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          authorId?: string;
          titleContains?: string;
          createdAfter?: string;
          createdBefore?: string;
        };
        sort: {
          field: "TITLE" | "CREATED_AT";
          direction: "ASC" | "DESC";
        };
      },
      context: GraphQLContext,
    ) => {
      const bookService = new BookService(context.db);
    },
  },

  Book: {
    user: async (
      parent: { userId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {},

    author: async (
      parent: { authorId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {},
  },

  Mutation: {
    createBook: async (
      _: unknown,
      { input }: { input: { title: string; authorId: string } },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const bookService = new BookService(context.db);
      return bookService.createBook({
        title: input.title,
        authorId: input.authorId,
        userId: context.user.id,
      });
    },

    updateBook: async (
      _: unknown,
      {
        id,
        input,
      }: { id: string; input: { title?: string; authorId?: string } },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const bookService = new BookService(context.db);
      const book = await bookService.updateBook(id, input);

      if (!book) {
        throw new Error("Book not found or unauthorized");
      }

      return book;
    },

    deleteBook: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const bookService = new BookService(context.db);
      const book = await bookService.deleteBook(id);

      if (!book) {
        throw new Error("Book not found or unauthorized");
      }

      return book;
    },
  },
};
