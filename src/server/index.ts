require("dotenv").config();

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

  const server = new ApolloServer({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
    context: ({ req, res }) => ({ db, req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);

  // Stripe API

  // const customers = await stripe.customers.list();

  // for (let i = 0; i < customers.data.length; i++) {
  //   const customer = customers.data[i];
  //   const values = await stripe.customers.retrieve(customer.id, {
  //     expand: ["subscriptions"],
  //   });
  //   console.log(values.subscriptions.data[0].plan.amount);
  // }

  // const contact = "drewpagerrr@gmail.com";

  // const customer = await stripe.customers.search({
  //   query: `email:\'${contact}\'`,
  // });

  // if (customer) {
  //   const subscriptions = await stripe.customers.retrieve(
  //     `${customer.data[0].id}`,
  //     {
  //       expand: ["subscriptions"],
  //     }
  //   );

  //   console.log(subscriptions.subscriptions.data[0].plan.amount);
  // }

  // app.get("/config", (req, res) => {
  //   res.send({
  //     publishableKey: `${process.env.S_PUBLISHABLE_KEY}`,
  //   });
  // });

  // app.post("/create-payment-intent", async (req, res) => {
  //   try {
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       currency: "usd",
  //       amount: 399,
  //       automatic_payment_methods: {
  //         enabled: true,
  //       },
  //     });

  //     res.send({ clientSecret: paymentIntent.client_secret });
  //   } catch (e) {
  //     throw new Error(`Failed to create payment intent: ${e}`);
  //   }
  // });

  // const configuration = await stripe.billingPortal.configurations.create({
  //   business_profile: {
  //     headline: "Platos Peach partners with Stripe for simplified billing.",
  //   },
  //   features: { invoice_history: { enabled: true } },
  // });

  // app.post("/create-customer-portal-session", async (req, res) => {
  //   // Authenticate your user.
  //   const session = await stripe.billingPortal.sessions.create({
  //     customer: req.body.customer,
  //     return_url: process.env.PUBLIC_URL,
  //   });

  //   res.redirect(session.url);
  // });

  // app.post("/create-checkout-session", async (req, res) => {
  //   const prices = await stripe.prices.list({
  //     lookup_keys: [req.body.lookup_key],
  //     expand: ["data.product"],
  //   });
  //   const session = await stripe.checkout.sessions.create({
  //     billing_address_collection: "auto",
  //     line_items: [
  //       {
  //         price: prices.data[0].id,
  //         // For metered billing, do not pass quantity
  //         quantity: 1,
  //       },
  //     ],
  //     mode: "subscription",
  //     success_url: `http://localhost:3000/?success=true&session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `http://localhost:3000?canceled=true`,
  //   });

  //   res.redirect(303, session.url);
  // });

  // app.post("/create-portal-session", async (req, res) => {
  //   // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  //   // Typically this is stored alongside the authenticated user in your database.
  //   const { session_id } = req.body;
  //   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  //   // This is the url to which the customer will be redirected when they are done
  //   // managing their billing with the portal.
  //   const returnUrl = process.env.PUBLIC_URL;

  //   const portalSession = await stripe.billingPortal.sessions.create({
  //     customer: checkoutSession.customer,
  //     return_url: returnUrl,
  //   });

  //   res.redirect(303, portalSession.url);
  // });

  // app.post(
  //   "/webhook",
  //   express.raw({ type: "application/json" }),
  //   (request, response) => {
  //     let event = request.body;
  //     // Replace this endpoint secret with your endpoint's unique secret
  //     // If you are testing with the CLI, find the secret by running 'stripe listen'
  //     // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  //     // at https://dashboard.stripe.com/webhooks
  //     const endpointSecret = "whsec_12345";
  //     // Only verify the event if you have an endpoint secret defined.
  //     // Otherwise use the basic event deserialized with JSON.parse
  //     if (endpointSecret) {
  //       // Get the signature sent by Stripe
  //       const signature = request.headers["stripe-signature"];
  //       try {
  //         event = stripe.webhooks.constructEvent(
  //           request.body,
  //           signature,
  //           endpointSecret
  //         );
  //       } catch (err: any) {
  //         console.log(
  //           `⚠️  Webhook signature verification failed.`,
  //           err.message
  //         );
  //         return response.sendStatus(400);
  //       }
  //     }
  //     let subscription;
  //     let status;
  //     // Handle the event
  //     switch (event.type) {
  //       case "customer.subscription.trial_will_end":
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription trial ending.
  //         // handleSubscriptionTrialEnding(subscription);
  //         break;
  //       case "customer.subscription.deleted":
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription deleted.
  //         // handleSubscriptionDeleted(subscriptionDeleted);
  //         break;
  //       case "customer.subscription.created":
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription created.
  //         // handleSubscriptionCreated(subscription);
  //         break;
  //       case "customer.subscription.updated":
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription update.
  //         // handleSubscriptionUpdated(subscription);
  //         break;
  //       default:
  //         // Unexpected event type
  //         console.log(`Unhandled event type ${event.type}.`);
  //     }
  //     // Return a 200 response to acknowledge receipt of the event
  //     response.send();
  //   }
  // );

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
