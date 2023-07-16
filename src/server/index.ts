require("dotenv").config();
const nodemailer = require("nodemailer");
const stripe = require("stripe")(`${process.env.S_SECRET_KEY}`);
const enforce = require("express-sslify");
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import http from "http";
import bodyParser from "body-parser";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "graphql-scalars";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { Database } from "./lib/types";

const corsOptions = {
  credentials: true,
  preflightContinue: true,
};

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.SECRET));
  app.use(compression());
  app.use(cors(corsOptions));

  // DEPLOY TODO: UNCOMMENT FOR PRODUCTION
  // app.use(enforce.HTTPS({ trustProtoHeader: true }));
  // app.use(express.static(`${__dirname}/`));
  // app.get("/*", (_req, res) => res.sendFile(`${__dirname}/index.html`));

  app.post("/contact", async (req, res) => {
    console.log(req.body);

    const contactEmail = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "drew@greadings.com",
        pass: `${process.env.EMAILPASSWORD}`,
      },
    });

    contactEmail.sendMail(req.body, (error: any, info: any) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("Email sent: " + info.response);
        res.send("success");
      }
    });
  });

  const server = new ApolloServer({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
    context: ({ req, res }) => ({ db, req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
