import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import { yoga } from "./graphql/server";

export const app = express();

app.use(express.json());

// REST routes
app.use("/api/auth", authRoutes);

// GraphQL endpoint
app.use(yoga.graphqlEndpoint, yoga);

// Error handling
// app.use(errorHandler);
