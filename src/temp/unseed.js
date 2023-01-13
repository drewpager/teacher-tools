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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const database_1 = require("../server/database");
const unseed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Unseeding...");
        const db = yield (0, database_1.connectDatabase)();
        db.lessons.deleteMany({});
        // db.users.deleteMany({})
        // db.quizzes.deleteMany({})
        console.log("Successfully unseeded DB!");
    }
    catch (error) {
        throw new Error("Failed to unseed properly!");
    }
});
unseed();
