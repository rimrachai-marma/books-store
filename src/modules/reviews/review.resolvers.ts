import type { GraphQLContext } from "../../types/context";
import { ReviewService } from "./review.service";

export const reviewResolvers = {
  Query: {
    review: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext,
    ) => {
      const reviewService = new ReviewService(context.db);
      return reviewService.getReviewById(id);
    },

    reviews: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const reviewService = new ReviewService(context.db);
      return reviewService.getAllReviews();
    },

    reviewsByUser: async (
      _: unknown,
      { userId }: { userId: string },
      context: GraphQLContext,
    ) => {
      const reviewService = new ReviewService(context.db);
      return reviewService.getReviewsByUserId(userId);
    },

    reviewsByBook: async (
      _: unknown,
      { bookId }: { bookId: string },
      context: GraphQLContext,
    ) => {
      const reviewService = new ReviewService(context.db);
      return reviewService.getReviewsByBookId(bookId);
    },
  },

  Review: {
    user: async (
      parent: { userId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {
      const userService = (await import("../users/user.service")).UserService;
      const userServiceInstance = new userService(context.db);
      return userServiceInstance.getUserById(parent.userId);
    },

    book: async (
      parent: { bookId: string },
      _: unknown,
      context: GraphQLContext,
    ) => {
      const bookService = (await import("../books/book.service")).BookService;
      const bookServiceInstance = new bookService(context.db);
      return bookServiceInstance.getBookById(parent.bookId);
    },
  },

  Mutation: {
    createReview: async (
      _: unknown,
      { input }: { input: { rating: number; content: string; bookId: string } },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      // Validate rating
      if (input.rating < 1 || input.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      const reviewService = new ReviewService(context.db);
      return reviewService.createReview({
        ...input,
        userId: context.user.id,
      });
    },

    deleteReview: async (
      _: unknown,
      { id }: { id: string },
      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const reviewService = new ReviewService(context.db);
      const review = await reviewService.deleteReview(id);

      if (!review) {
        throw new Error("Review not found");
      }

      return review;
    },
  },
};
