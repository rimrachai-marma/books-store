import type { Database } from "../config/db/database";

export interface GraphQLContext {
  db: Database;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
