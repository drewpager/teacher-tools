"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const components_1 = require("../../lib/components/");
const Home = ({ viewer }) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(components_1.HomeInfo, {}, void 0), (0, jsx_runtime_1.jsx)(components_1.CardGrid, {}, void 0), (0, jsx_runtime_1.jsx)(components_1.TimelineEl, {}, void 0), (0, jsx_runtime_1.jsx)(components_1.Footer, { viewer: viewer }, void 0)] }, void 0));
};
exports.Home = Home;
