"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// import express, { Application } from "express";
// import { ApolloServer } from "apollo-server-express";
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import express from "express";
// import http from "http";
// import bodyParser from "body-parser";
const graphql_scalars_1 = require("graphql-scalars");
const graphql_1 = require("./graphql");
const database_1 = require("./database");
const corsOptions = {
    credentials: true,
    preflightContinue: true,
};
const startServer = async () => {
    const server = new server_1.ApolloServer({
        typeDefs: [graphql_1.typeDefs, graphql_scalars_1.typeDefs],
        resolvers: [graphql_1.resolvers, graphql_scalars_1.resolvers],
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async ({ req, res }) => ({
            db: await (0, database_1.connectDatabase)(),
            req: req,
            res: res,
        }),
        listen: { port: 9000 },
        // listen: { path: "/api" },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
startServer();
