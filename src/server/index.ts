require("dotenv").config();
const nodemailer = require("nodemailer");
const stripe = require("stripe")(`${process.env.S_SECRET_KEY}`);
const enforce = require("express-sslify");
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
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
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import depthLimit from "graphql-depth-limit";
import { Database } from "./lib/types";
import { createLoaders } from "./lib/loaders";

// CORS configuration with origin whitelist
const corsOptions = {
  credentials: true,
  origin: process.env.NODE_ENV === "production"
    ? [
        "https://platospeach.com",
        "https://www.platospeach.com",
        process.env.PUBLIC_URL || "",
      ].filter(Boolean)
    : ["http://localhost:3000", "http://localhost:9000"],
};

// Rate limiting configuration
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 login attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many login attempts, please try again later.",
});

const mount = async (app: Application) => {
  const db = await connectDatabase();

  // Trust proxy - required for rate limiting behind reverse proxy (Heroku, nginx, etc.)
  // This allows express-rate-limit to correctly identify users via X-Forwarded-For header
  app.set("trust proxy", 1);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "https:"],
        fontSrc: ["'self'", "fonts.gstatic.com", "https:"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        frameSrc: ["'self'", "https://www.youtube.com", "https://player.vimeo.com", "https://js.stripe.com"],
        connectSrc: ["'self'", "https:", "wss:"],
      },
    },
    crossOriginEmbedderPolicy: false, // Required for embedding videos
  }));

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.SECRET));
  app.use(compression());
  app.use(cors(corsOptions));

  // Rate limiting
  app.use("/api", generalLimiter);
  app.use("/contact", authLimiter);

  // HTTPS enforcement in production
  if (process.env.NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(`${__dirname}/`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/index.html`));
  }

  app.post("/contact", async (req, res) => {
    // console.log(req.body);

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
        // console.log(error);
        res.send("error");
      } else {
        // console.log("Email sent: " + info.response);
        res.send("success");
      }
    });
  });

  // const customer = await stripe.customers.search({
  //   query: `email:'drew@greadings.com'`,
  // });

  // if (customer) {
  //   const subscriptions = await stripe.customers.retrieve(
  //     `${customer.data[0].id}`,
  //     {
  //       expand: ["subscriptions"],
  //     }
  //   );

  //   const amount = subscriptions.subscriptions.data[0].plan.amount;

  //   console.log(subscriptions.subscriptions.data[0]);
  // }

  const server = new ApolloServer({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
    context: ({ req, res }) => ({
      db,
      req,
      res,
      loaders: createLoaders(db), // Create fresh loaders per request
    }),
    introspection: process.env.NODE_ENV !== "production",
    validationRules: [depthLimit(10)],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
