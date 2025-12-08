import express from "express";
import { PORT } from "./config/envs";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./config/database";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import { GraphQLHandlerException } from "./exceptions/domain-custom-exception-graphql.handler";
import {  } from "./graphql/schemas";
import {  } from "./graphql/schemas";

async function startServer() {
  const app = express();

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: GraphQLHandlerException,
  });
  await server.start();

  await connectDB();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
