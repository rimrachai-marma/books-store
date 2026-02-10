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
      return bookService.getBookById(id);
    },

    books: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const bookService = new BookService(context.db);
      return bookService.getAllBooks();
    },

    authorBooks: async (
      _: unknown,
      { authorId }: { authorId: string },
      context: GraphQLContext,
    ) => {
      const bookService = new BookService(context.db);
      return bookService.getBooksByAuthorId(authorId);
    },

    userBooks: async (
      _: unknown,
      { userId }: { userId: string },
      context: GraphQLContext,
    ) => {
      const bookService = new BookService(context.db);
      return bookService.getBooksByUserId(userId);
    },

    myBooks: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const bookService = new BookService(context.db);
      return bookService.getBooksByUserId(context.user.id);
    },
  },

  Book: {
    user: async (
      parent: { userId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {
      const userService = (await import("../users/user.service")).UserService;
      const userServiceInstance = new userService(context.db);
      return userServiceInstance.getUserById(parent.userId);
    },

    author: async (
      parent: { authorId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {
      const authorService = (await import("../authors/author.service"))
        .AuthorService;
      const authorServiceInstance = new authorService(context.db);
      return authorServiceInstance.getAuthorById(parent.authorId);
    },
  },

  Mutation: {
    createBook: async (
      _: unknown,
      { title, authorId }: { title: string; authorId: string },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const bookService = new BookService(context.db);
      return bookService.createBook({
        title,
        authorId,
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
