"use strict";
// require("dotenv").config();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_scalars_1 = require("graphql-scalars");
const graphql_1 = require("./graphql");
const database_1 = require("./database");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const corsOptions = {
    credentials: true,
    preflightContinue: true,
};
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDatabase)();
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, cookie_parser_1.default)(process.env.SECRET));
    app.use((0, compression_1.default)());
    app.use(express_1.default.static(`${__dirname}/`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/index.html`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: [graphql_1.typeDefs, ...graphql_scalars_1.typeDefs],
        resolvers: [graphql_1.resolvers, graphql_scalars_1.resolvers],
        context: ({ req, res }) => ({ db, req, res }),
    });
    yield server.start();
    server.applyMiddleware({
        app,
        path: "/api",
    });
    app.listen(process.env.PORT);
    console.log(`[app]: started on port ${process.env.PORT}`);
});
mount((0, express_1.default)());
