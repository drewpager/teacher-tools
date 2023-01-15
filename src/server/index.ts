// require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

const corsOptions = {
  credentials: true,
  preflightContinue: true,
};

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cors(corsOptions));
  app.use(cookieParser(process.env.SECRET));
  app.use(compression());
  app.use(express.static(`${__dirname}/`));
  app.get("/*", (_req, res) => res.sendFile(`${__dirname}/index.html`));

  const server = new ApolloServer({
    typeDefs: [typeDefs, ...scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
    context: ({ req, res }) => ({ db, req, res }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/api",
  });
  app.listen(process.env.PORT);

  console.log(`[app]: started on port ${process.env.PORT}`);
};

mount(express());
