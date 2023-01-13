"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuizzes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const AddCircle_1 = __importDefault(require("@mui/icons-material/AddCircle"));
const components_1 = require("../../../../lib/components/");
require("./userQuizzes.scss");
const UserQuizzes = ({ userQuizzes, quizzesPage, limit, setQuizzesPage }) => {
    const { result, totalCount } = userQuizzes;
    const handleChange = (event, page) => {
        setQuizzesPage(page);
    };
    const userQuizzesList = ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "user--quizzes" }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true, spacing: 2, sx: { alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsxs)("h2", { children: [totalCount, " Quizzes"] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/quiz/create` }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Add New Quiz" }, { children: (0, jsx_runtime_1.jsx)(AddCircle_1.default, { sx: { color: "black" } }, void 0) }), void 0) }), void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true }, { children: result.map((value, index) => ((0, jsx_runtime_1.jsx)(components_1.UserQuizzesCard, { quiz: value }, index))) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Pagination, { count: Math.ceil(totalCount / limit), page: quizzesPage, onChange: handleChange }, void 0)] }), void 0));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: userQuizzesList }, void 0));
};
exports.UserQuizzes = UserQuizzes;
