import { eq } from "drizzle-orm";
import type { Database } from "../../config/db/database";
import { reviews } from "../../drizzle/schema";
import type { NewReview } from "./review.types";

export class ReviewService {
  constructor(private db: Database) {}

  async getAllReviews() {
    return this.db.select().from(reviews);
  }

  async getReviewById(id: string) {
    const [review] = await this.db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id))
      .limit(1);
    return review;
  }

  async getReviewsByUserId(userId: string) {
    return this.db.select().from(reviews).where(eq(reviews.userId, userId));
  }

  async getReviewsByBookId(bookId: string) {
    return this.db.select().from(reviews).where(eq(reviews.bookId, bookId));
  }

  async createReview(data: NewReview) {
    const [review] = await this.db.insert(reviews).values(data).returning();
    return review;
  }

  async deleteReview(id: string) {
    const [review] = await this.db
      .delete(reviews)
      .where(eq(reviews.id, id))
      .returning();
    return review;
  }
}
