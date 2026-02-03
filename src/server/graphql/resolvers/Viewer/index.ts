import { Viewer, Database, User } from "../../../lib/types";
import { ObjectId } from "mongodb";
import { Google, Stripe } from "../../../lib/api";
import {
  LogInArgs,
  ConnectStripeArgs,
  PlaylistArgs,
  PlaylistArgsData,
  PaymentArgs,
  LogInEmailArgs,
} from "./types";
import crypto from "crypto";
import { Response, Request } from "express";
import { authorize } from "../../../lib/utils";
const stripe = require("stripe")(`${process.env.S_SECRET_KEY}`);
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// When in production w/ HTTPS, add secure setting
const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
  // domain: "localhost",
};

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error(`Failed to log in with Google!`);
  }

  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  const userName = userNamesList ? userNamesList[0].displayName : null;

  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail =
    userEmailList && userEmailList[0].value ? userEmailList[0].value : null;

  const existingUser = await db.users.findOne({ _id: userId?.toString() });
  const userPaymentId = existingUser ? `${existingUser.paymentId}` : null;

  if (!userName || !userId || !userAvatar || !userEmail) {
    throw new Error("Google Log In Error!");
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        token,
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        paymentId: userPaymentId,
        watched: [],
        playlists: [],
      },
    }
  );
  let viewer = updateRes.value;

  if (!viewer) {
    try {
      const updateResponse = await db.users.insertOne({
        _id: userId,
        token,
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        paymentId: "undefined",
        watched: [],
        playlists: [],
      });
      viewer = await db.users.findOne({ _id: updateResponse.insertedId });
      if (viewer) {
        return viewer;
      }
    } catch (e) {
      throw new Error(`Failed with code: ${e}`);
    }
  }

  if (viewer) {
    res.cookie("viewer", userId, {
      ...cookieOptions,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  } else {
    throw new Error("Failed to return viewer object!");
  }
  return viewer;
};

const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const userRes = await db.users.findOne({ _id: req.signedCookies.viewer });
  if (userRes?.token && userRes.token.length > 33) {
    // res.cookie("viewer", userRes._id, { ...cookieOptions });
    return userRes;
  }
  const updateCook = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } }
  );
  const viewer = updateCook.value;

  if (!viewer || !userRes) {
    res.clearCookie("viewer", { ...cookieOptions });
  } else {
    return viewer;
  }
};

const logInViaEmail = async (
  { input }: LogInArgs,
  res: Response,
  db: Database
): Promise<User | undefined> => {
  if (!input?.email?.length || !input?.password?.length) {
    throw new Error("Please enter your email and password!");
  }

  const user = await db?.users?.findOne({ contact: `${input?.email}` });

  if (user) {
    const passwordCorrect = await bcrypt.compare(input.password, user.token);
    if (passwordCorrect) {
      res.cookie("viewer", user._id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
      return user;
    }

    if (!passwordCorrect) {
      throw new Error("Invalid Password or Combination!");
    }

    throw new Error(
      "Email already in use. Try logging in with your password or using Google to login instead."
    );
  }

  const userId = new ObjectId().toHexString();
  const userName = input.email.split("@")[0];
  const userPass = await bcrypt.hash(input.password, 10);
  const userAvatar =
    "https://img.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg";
  // const token = crypto.randomBytes(16).toString("hex");

  const insertUser = await db.users.insertOne({
    _id: userId,
    token: userPass,
    name: userName,
    avatar: userAvatar,
    contact: input.email,
    paymentId: "undefined",
    watched: [],
    playlists: [],
    bookmarks: [],
    lessons: [],
  });

  const viewer = await db.users.findOne({ _id: insertUser.insertedId });

  if (viewer) {
    res.cookie("viewer", userId, {
      ...cookieOptions,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  } else {
    throw new Error("Failed to return viewer object!");
  }
  return viewer;
};

export const viewerResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (err) {
        throw new Error(`Failed to authenticate with Google: ${err}`);
      }
    },
  },
  Mutation: {
    requestPasswordReset: async (
      _root: undefined,
      { email }: { email: string },
      { db, req }: { db: Database; req: Request; res: Response }
    ): Promise<boolean> => {
      try {
        const user = await db.users.findOne({ contact: `${email}` });
        // Always return true to avoid account enumeration
        if (!user) {
          return true;
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = Date.now() + 1000 * 60 * 60; // 1 hour

        await db.users.updateOne(
          { _id: user._id },
          { $set: { passwordResetToken: token, passwordResetExpires: expires } }
        );

        const resetUrl = `${process.env.PUBLIC_URL}/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp-relay.sendinblue.com",
          port: Number(process.env.SMTP_PORT || 587),
          auth: {
            user: process.env.SMTP_USER || "drew@greadings.com",
            pass: `${process.env.EMAILPASSWORD}`,
          },
        });

        await transporter.sendMail({
          from:
            process.env.SMTP_FROM || "Plato's Peach <no-reply@platospeach.com>",
          to: email,
          subject: "Reset your Plato's Peach password",
          text: `Click the link to reset your password: ${resetUrl}`,
          html: `<p>You requested a password reset.</p><p><a href="${resetUrl}">Click here to reset your password</a></p><p>This link will expire in 1 hour.</p>`,
        });

        return true;
      } catch (e) {
        // Do not leak details
        return true;
      }
    },
    resetPassword: async (
      _root: undefined,
      { token, password }: { token: string; password: string },
      { db }: { db: Database }
    ): Promise<boolean> => {
      try {
        const user = await db.users.findOne({
          passwordResetToken: token,
          passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
          throw new Error("Invalid or expired token");
        }

        const hashed = await bcrypt.hash(password, 10);
        await db.users.updateOne(
          { _id: user._id },
          {
            $set: { token: hashed },
            $unset: { passwordResetToken: "", passwordResetExpires: "" },
          }
        );

        return true;
      } catch (e) {
        throw new Error(`Failed to reset password: ${e}`);
      }
    },
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Viewer> => {
      try {
        if (!input?.code && input?.email && input?.password) {
          const email = input?.email;
          const password = input?.password;
          const emailInput = { input: { email: email, password: password } };
          const emailLogin = await logInViaEmail(emailInput, res, db);
          // Generate a session token instead of exposing password
          const sessionToken = crypto.randomBytes(16).toString("hex");
          return {
            _id: emailLogin?._id,
            token: sessionToken,
            avatar: emailLogin?.avatar,
            contact: input?.email,
            paymentId: emailLogin?.paymentId,
            didRequest: true,
          };
        }

        const code = input ? input.code : null;
        const tokener = crypto.randomBytes(16).toString("hex");

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, tokener, db, res)
          : await logInViaCookie(tokener, db, req, res);

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          contact: viewer.contact,
          paymentId: viewer.paymentId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: Record<string, never>,
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie("viewer", { ...cookieOptions });
        return { didRequest: true };
      } catch (err) {
        throw new Error(`Failed to log out user: ${err}`);
      }
    },
    // addPayment: async (
    //   viewer: Viewer,
    //   { id }: PaymentArgs,
    //   { db }: { db: Database }
    // ): Promise<Viewer | string> => {
    //   const user = await db.users.findOne({ _id: `${viewer._id}` });
    //   const customer = await stripe.customers.search({
    //     query: `email:\'${user?.contact}\'`,
    //   });

    //   try {
    //     if (!!customer) {
    //       const customerPay = await db.users.findOneAndUpdate(
    //         { _id: `${viewer._id}` },
    //         { $set: { paymentId: `${customer.data[0].id}` } }
    //       );
    //       viewer.paymentId = customer.data[0].id;
    //       return customerPay.value ? `${viewer.paymentId}` : "undefined";
    //     }

    //     const userPay = await db.users.findOneAndUpdate(
    //       { _id: `${viewer._id}` },
    //       { $set: { paymentId: `${id}` } }
    //     );
    //     viewer.paymentId = id;
    //     return userPay.value ? `${id}` : "undefined";
    //   } catch (err) {
    //     throw new Error(`Error adding payment in Mutation: ${err}`);
    //   }
    // },
    // connectStripe: async (
    //   _root: undefined,
    //   { input }: ConnectStripeArgs,
    //   { db, req }: { db: Database; req: Request }
    // ): Promise<Viewer> => {
    //   try {
    //     const { code } = input;

    //     let viewer = await authorize(db, req);

    //     if (!viewer) {
    //       throw new Error(`Viewer cannot be found!`);
    //     }

    //     const wallet = await Stripe.connect(code);

    //     if (!wallet) {
    //       throw new Error("Stripe grant error");
    //     }

    //     const updateRes = await db.users.findOneAndUpdate(
    //       { _id: viewer._id },
    //       { $set: { paymentId: `${wallet}` } }
    //     );

    //     if (!updateRes) {
    //       throw new Error(`Failed to update user with payment information`);
    //     }

    //     viewer = updateRes.value;

    //     return {
    //       _id: viewer?._id,
    //       token: viewer?.token,
    //       avatar: viewer?.avatar,
    //       paymentId: wallet,
    //       didRequest: true,
    //     };
    //   } catch (e) {
    //     throw new Error(`Failed to connect with stripe: ${e}`);
    //   }
    // },
    disconnectStripe: async (
      _root: undefined,
      _args: Record<string, unknown>,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        let viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error(`Failed to authorize viewer!`);
        }

        const updateRes = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { $set: { paymentId: "undefined" } }
        );

        if (!updateRes.value) {
          throw new Error(`Viewer could not be updated`);
        }

        viewer = updateRes.value;

        return {
          _id: viewer?._id,
          token: viewer?.token,
          avatar: viewer?.avatar,
          paymentId: viewer?.paymentId,
          didRequest: true,
        };
      } catch (e) {
        throw new Error(`Failed to disconnect Stripe: ${e}`);
      }
    },
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    paymentId: (viewer: Viewer): string | undefined => {
      return viewer.paymentId ? viewer.paymentId : undefined;
    },
    contact: (viewer: Viewer): string | undefined => {
      return viewer.contact ? viewer.contact : undefined;
    },
    playlists: async (
      viewer: Viewer,
      { limit, page }: PlaylistArgs,
      { db }: { db: Database }
    ): Promise<PlaylistArgsData | null> => {
      try {
        if (!viewer) {
          return null;
        }

        const data: PlaylistArgsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.playlists.find({
          creator: { $in: [viewer && viewer._id ? viewer._id : "1010"] },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();
        data.total = data.result.length;

        return data;
      } catch (e) {
        throw new Error(`Failed to query user playlists: ${e}`);
      }
    },
  },
};
