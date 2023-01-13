"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const generated_1 = require("../../graphql/generated");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const displayError_1 = require("../../lib/utils/alerts/displayError");
const components_1 = require("../../lib/components");
require("./lessonPage.scss");
const Lesson = () => {
    var _a;
    const params = (0, react_router_dom_1.useParams)();
    const { loading, data, error } = (0, generated_1.useLessonQuery)({
        variables: {
            id: `${params.id}`
        }
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(material_1.LinearProgress, {}, void 0));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(displayError_1.DisplayError, { title: 'Failed to load lesson' }, void 0) }, void 0));
    }
    const lesson = data ? data.lesson : null;
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "lesson--page" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: lesson === null || lesson === void 0 ? void 0 : lesson.title }, void 0), (_a = lesson === null || lesson === void 0 ? void 0 : lesson.category) === null || _a === void 0 ? void 0 : _a.map((i, ind) => ((0, jsx_runtime_1.jsx)(material_1.Chip, { variant: 'outlined', label: i, color: "error", className: 'lesson--category' }, ind))), (0, jsx_runtime_1.jsx)(components_1.VideoPlayer, { url: `${lesson === null || lesson === void 0 ? void 0 : lesson.video}` }, void 0)] }), void 0));
};
exports.Lesson = Lesson;
