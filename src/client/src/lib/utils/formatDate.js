"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date) => {
    if (date.startsWith("-", 0)) {
        return date.replace("-", "") + " BCE";
    }
    return date;
};
exports.formatDate = formatDate;
