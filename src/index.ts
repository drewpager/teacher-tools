require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from "./server/graphql";
import { connectDatabase } from "./server/database";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: () => ({ db })
  });

  const lessons = await db.lessons.find({}).toArray();

  await server.start();
  server.applyMiddleware({ app, path: "/api" })
  app.listen(process.env.PORT)

  console.log(`[app]: started on port ${process.env.PORT}`)
}

mount(express());