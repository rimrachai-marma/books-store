import { createYoga } from "graphql-yoga";

import { schema } from "./schema";
import { createContext } from "./context";

export const yoga = createYoga({
  schema,
  context: (initialContext) => createContext(initialContext),
  graphiql: process.env.NODE_ENV !== "production",
});
