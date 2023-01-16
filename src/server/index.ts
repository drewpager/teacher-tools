require("dotenv").config();

// import express, { Application } from "express";
// import { ApolloServer } from "apollo-server-express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import express from "express";
// import http from "http";
// import bodyParser from "body-parser";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";
// import cookieParser from "cookie-parser";
import cors from "cors";
// import compression from "compression";
import { Database } from "./lib/types";

const corsOptions = {
  credentials: true,
  preflightContinue: true,
};
interface MyContext {
  db?: Database;
}

const startServer = async () => {
  const server = new ApolloServer<MyContext>({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({
      db: await connectDatabase(),
      req: req,
      res: res,
    }),
    listen: { port: 9000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
