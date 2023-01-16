"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const api_1 = require("../../../lib/api");
const crypto_1 = __importDefault(require("crypto"));
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: false,
    domain: "localhost",
};
const logInViaGoogle = async (code, token, db, res) => {
    const { user } = await api_1.Google.logIn(code);
    if (!user) {
        throw new Error(`Failed to log in with Google!`);
    }
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList = user.photos && user.photos.length ? user.photos : null;
    const userEmailList = user.emailAddresses && user.emailAddresses.length
        ? user.emailAddresses
        : null;
    const userName = userNamesList ? userNamesList[0].displayName : null;
    const userId = userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
        ? userNamesList[0].metadata.source.id
        : null;
    const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
    const userEmail = userEmailList && userEmailList[0].value ? userEmailList[0].value : null;
    if (!userName || !userId || !userAvatar || !userEmail) {
        throw new Error("Google Log In Error!");
    }
    const updateRes = await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            token,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            watched: [],
            paymentId: "2020",
            playlists: [],
        },
    });
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
                paymentId: "1010",
                playlists: [],
            });
            viewer = await db.users.findOne({ _id: updateResponse.insertedId });
            if (viewer) {
                return viewer;
            }
        }
        catch (e) {
            throw new Error(`Failed with code: ${e}`);
        }
    }
    if (viewer) {
        res.cookie("viewer", userId, {
            ...cookieOptions,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        });
    }
    else {
        throw new Error("Failed to return viewer object!");
    }
    return viewer;
};
const logInViaCookie = async (token, db, req, res) => {
    const updateCook = await db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } });
    const viewer = updateCook.value;
    if (!viewer) {
        res.clearCookie("viewer", { ...cookieOptions });
    }
    else {
        return viewer;
    }
};
exports.viewerResolvers = {
    Query: {
        authUrl: () => {
            try {
                return api_1.Google.authUrl;
            }
            catch (err) {
                throw new Error(`Failed to authenticate with Google: ${err}`);
            }
        },
    },
    Mutation: {
        logIn: async (_root, { input }, { db, req, res }) => {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const viewer = code
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
            }
            catch (error) {
                throw new Error(`Failed to log in: ${error}`);
            }
        },
        logOut: (_root, _args, { res }) => {
            try {
                res.clearCookie("viewer", { ...cookieOptions });
                return { didRequest: true };
            }
            catch (err) {
                throw new Error(`Failed to log out user: ${err}`);
            }
        },
    },
    Viewer: {
        id: (viewer) => {
            return viewer._id;
        },
        hasPayment: (viewer) => {
            return viewer.paymentId ? true : undefined;
        },
        playlists: async (viewer, { limit, page }, { db }) => {
            try {
                if (!viewer) {
                    return null;
                }
                const data = {
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
            }
            catch (e) {
                throw new Error(`Failed to query user playlists: ${e}`);
            }
        },
    },
};
