import type { YogaInitialContext } from "graphql-yoga";
import type { GraphQLContext } from "../types/context";
import { db } from "../config/db/database";
import { verifyToken } from "../utils/jwt";

export async function createContext(
  initialContext: YogaInitialContext,
): Promise<GraphQLContext> {
  const context: GraphQLContext = { db };

  console.log(initialContext.request.headers.get("cookie"));

  if (initialContext.request.headers.get("authorization")) {
    const token = initialContext.request.headers
      .get("authorization")!
      .replace("Bearer ", "");

    const payload = verifyToken(token);

    context.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
    };
  }

  return context;
}
