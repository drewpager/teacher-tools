"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeInfo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const classroom_jpg_1 = __importDefault(require("../../assets/classroom.jpg"));
require("./homeinfo.scss");
const HomeInfo = () => {
    return ((0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ className: 'title--image', sx: { backgroundImage: `url(${classroom_jpg_1.default})` } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: 'box--title' }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h1', className: 'title--text' }, { children: "Interactive Lectures, Lesson Plans, and Learning." }), void 0), (0, jsx_runtime_1.jsx)(material_1.Link, Object.assign({ variant: "subtitle1", href: "#", className: 'link--start' }, { children: "Start Teaching" }), void 0), (0, jsx_runtime_1.jsx)(material_1.Link, Object.assign({ variant: "subtitle1", href: "#", className: 'link--start' }, { children: "Start Learning" }), void 0)] }), void 0) }), void 0));
};
exports.HomeInfo = HomeInfo;
