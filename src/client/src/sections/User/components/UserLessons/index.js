"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLessons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("../../../../lib/components/");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const AddCircle_1 = __importDefault(require("@mui/icons-material/AddCircle"));
require("./userLessons.scss");
const UserLessons = ({ userLessons, lessonsPage, limit, setLessonsPage }) => {
    const { result, totalCount } = userLessons;
    const handleChange = (event, page) => {
        setLessonsPage(page);
    };
    const userLessonsList = ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "user--lessons" }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true, spacing: 3, sx: { alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsxs)("h2", { children: [totalCount, " Lessons"] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/lesson/create` }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Add New Lesson" }, { children: (0, jsx_runtime_1.jsx)(AddCircle_1.default, { sx: { color: "black" } }, void 0) }), void 0) }), void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true }, { children: result.map((value, index) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, lg: 4, md: 6, sm: 6, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(components_1.LessonCard, { lesson: value }, void 0) }, index) }), index))) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Pagination
            // Take total number of playlists divided by number of playlists per page
            , { 
                // Take total number of playlists divided by number of playlists per page
                count: Math.ceil(totalCount / limit), page: lessonsPage, onChange: handleChange }, void 0)] }), void 0));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: userLessonsList }, void 0));
};
exports.UserLessons = UserLessons;
