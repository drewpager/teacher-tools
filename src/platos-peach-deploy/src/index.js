"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import http from "http";
const body_parser_1 = __importDefault(require("body-parser"));
const graphql_1 = require("./graphql");
const database_1 = require("./database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const corsOptions = {
    credentials: true,
    preflightContinue: true,
};
const mount = async (app) => {
    const db = await (0, database_1.connectDatabase)();
    app.use(body_parser_1.default.json({ limit: "2mb" }));
    app.use((0, cookie_parser_1.default)(process.env.SECRET));
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.static(`${__dirname}/`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/index.html`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: ({ req, res }) => ({ db, req, res }),
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env.PORT);
    console.log(`[app] : http://localhost:${process.env.PORT}`);
};
mount((0, express_1.default)());
