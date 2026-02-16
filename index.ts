import { app } from "./src/app";
import http from "http";

import { yoga } from "./src/graphql/server";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📊 GraphQL endpoint: http://localhost:${PORT}${yoga.graphqlEndpoint}`,
  );
});
