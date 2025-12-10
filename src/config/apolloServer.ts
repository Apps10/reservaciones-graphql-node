import { Express } from "express";
import { GraphQLHandlerException } from "../exceptions/domain-custom-exception-graphql.handler";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/schemas";
import { ApolloServer } from "apollo-server-express";

export const InitApolloServer = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: GraphQLHandlerException,
    debug: true,
    context: ({ req }) => {
      return {
        req,
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  return server;
};
