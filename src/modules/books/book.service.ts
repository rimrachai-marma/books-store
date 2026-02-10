import { eq, and } from "drizzle-orm";

import { books } from "../../drizzle/schema";
import type { Database } from "../../config/db/database";
import type { NewBook, UpdateBook } from "./book.types";

export class BookService {
  constructor(private db: Database) {}

  async getAllBooks() {
    return this.db.select().from(books);
  }

  async getBookById(id: string) {
    const [book] = await this.db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);
    return book;
  }

  async getBooksByUserId(userId: string) {
    return this.db.select().from(books).where(eq(books.userId, userId));
  }

  async getBooksByAuthorId(authorId: string) {
    return this.db.select().from(books).where(eq(books.authorId, authorId));
  }

  async createBook(data: NewBook) {
    const [book] = await this.db.insert(books).values(data).returning();
    return book;
  }

  async updateBook(id: string, data: UpdateBook) {
    const [book] = await this.db
      .update(books)
      .set(data)
      .where(and(eq(books.id, id)))
      .returning();
    return book;
  }

  async deleteBook(id: string) {
    const [book] = await this.db
      .delete(books)
      .where(and(eq(books.id, id)))
      .returning();
    return book;
  }
}
