"use strict";
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
const logInViaGoogle = (code, token, db, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = yield api_1.Google.logIn(code);
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
    const updateRes = yield db.users.findOneAndUpdate({ _id: userId }, {
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
            const updateResponse = yield db.users.insertOne({
                _id: userId,
                token,
                name: userName,
                avatar: userAvatar,
                contact: userEmail,
                watched: [],
                paymentId: "1010",
                playlists: [],
            });
            viewer = yield db.users.findOne({ _id: updateResponse.insertedId });
            if (viewer) {
                return viewer;
            }
        }
        catch (e) {
            throw new Error(`Failed with code: ${e}`);
        }
    }
    if (viewer) {
        res.cookie("viewer", userId, Object.assign(Object.assign({}, cookieOptions), { maxAge: 365 * 24 * 60 * 60 * 1000 }));
    }
    else {
        throw new Error("Failed to return viewer object!");
    }
    return viewer;
});
const logInViaCookie = (token, db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateCook = yield db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } });
    const viewer = updateCook.value;
    if (!viewer) {
        res.clearCookie("viewer", Object.assign({}, cookieOptions));
    }
    else {
        return viewer;
    }
});
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
        logIn: (_root, { input }, { db, req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString("hex");
                const viewer = code
                    ? yield logInViaGoogle(code, token, db, res)
                    : yield logInViaCookie(token, db, req, res);
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
        }),
        logOut: (_root, _args, { res }) => {
            try {
                res.clearCookie("viewer", Object.assign({}, cookieOptions));
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
        playlists: (viewer, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!viewer) {
                    return null;
                }
                const data = {
                    total: 0,
                    result: [],
                };
                let cursor = yield db.playlists.find({
                    creator: { $in: [viewer && viewer._id ? viewer._id : "1010"] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query user playlists: ${e}`);
            }
        }),
    },
};
