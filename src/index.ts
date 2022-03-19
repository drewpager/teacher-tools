require("dotenv").config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './server/graphql';
import { connectDatabase } from './server/database';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:9000"],
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  // allowHeaders: ["Content-Type", "application/json"],
  // optionsSuccessStatus: 204,
  // preflightContinue: true
}

const mount = async (app: Application) => {
  const db = await connectDatabase();
  
  app.use(cors(corsOptions))
  app.use(cookieParser(process.env.SECRET)); 

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({ req, res }) => ({ db, req, res })
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" })
  app.listen(process.env.PORT)

  console.log(`[app]: started on port ${process.env.PORT}`)
}

mount(express());