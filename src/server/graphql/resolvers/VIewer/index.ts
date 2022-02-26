// import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Viewer, Database, User } from '../../../lib/types';
import { Google } from '../../../lib/api';
import { LogInArgs } from './types';
import crypto from "crypto";

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error(`Failed to log in with Google!`);
  }
  
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;

  const userName = userNamesList ? userNamesList[0].displayName : null;

  const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source
    ? userNamesList[0].metadata.source.id
    : null;

  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail = userEmailList && userEmailList[0].value ? userEmailList[0].value : null;

  if (!userName || !userId || !userAvatar || !userEmail ) {
    throw new Error("Google Log In Error!");
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token
      }
    },
    { upsert: true, returnDocument: 'after' }
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
        watched: [],
        walletId: "1010",
        playlists: []
      });

      let viewer = db.users.findOne({ _id: updateResponse.insertedId });
    } catch (e) {
      throw new Error(`Failed to insert one: ${e}`)
    }
  }
  if (viewer) {
    return viewer;
  } else {
    throw new Error("Failed to return viewer object!");
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
    }
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, db)
          : undefined;

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true };
      } catch (err) {
        throw new Error(`Failed to log out user: ${err}`);
      }
    }
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    }
  }
};