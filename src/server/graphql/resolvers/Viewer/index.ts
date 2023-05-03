import { Viewer, Database, User } from "../../../lib/types";
import { ObjectId } from "mongodb";
import { Google, Stripe } from "../../../lib/api";
import {
  LogInArgs,
  ConnectStripeArgs,
  PlaylistArgs,
  PlaylistArgsData,
  PaymentArgs,
} from "./types";
import crypto from "crypto";
import { Response, Request } from "express";
import { authorize } from "../../../lib/utils";

// DEPLOY TODO: When in production w/ HTTPS, add secure setting
const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  // secure: process.env.NODE_ENV === "development" ? false : true,
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
        paymentId: "undefined",
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
  const updateCook = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } }
  );

  const viewer = updateCook.value;

  if (!viewer) {
    res.clearCookie("viewer", { ...cookieOptions });
  } else {
    return viewer;
  }
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
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, db, res)
          : await logInViaCookie(token, db, req, res);

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          paymentId: viewer.paymentId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
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
    addPayment: async (
      viewer: Viewer,
      { id }: PaymentArgs,
      { db }: { db: Database }
    ): Promise<number> => {
      try {
        const user = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { paymentId: id }
        );
        viewer.paymentId = id;
        console.log(viewer);
        return user.ok;
      } catch (e) {
        throw new Error(`Failed to save paymentID: ${e}`);
      }
    },
    connectStripe: async (
      _root: undefined,
      { input }: ConnectStripeArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const { code } = input;

        let viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error(`Viewer cannot be found!`);
        }

        const wallet = await Stripe.connect(code);

        if (!wallet) {
          throw new Error("Stripe grant error");
        }

        const updateRes = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { $set: { paymentId: wallet } }
        );

        if (!updateRes) {
          throw new Error(`Failed to update user with payment information`);
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
        throw new Error(`Failed to connect with stripe: ${e}`);
      }
    },
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
          { $set: { paymentId: null } }
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

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (e) {
        throw new Error(`Failed to query user playlists: ${e}`);
      }
    },
  },
};
