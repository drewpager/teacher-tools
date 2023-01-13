"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const generated_1 = require("../../graphql/generated");
const components_1 = require("../../lib/components");
const utils_1 = require("../../lib/utils");
const Quiz = () => {
    const params = (0, react_router_dom_1.useParams)();
    const { data, loading, error } = (0, generated_1.useQuizQuery)({
        variables: {
            id: `${params.id}`
        }
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(material_1.LinearProgress, {}, void 0));
    }
    if (error) {
        (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: 'Failed to load this Quiz' }, void 0);
    }
    const quiz = data && data.quiz ? data.quiz : null;
    if (quiz) {
        console.log(quiz);
        return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { marginTop: 7 } }, { children: (0, jsx_runtime_1.jsx)(components_1.QuizPlayer, { quiz: quiz }, void 0) }), void 0));
    }
    return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { marginLeft: 5 } }, { children: (0, jsx_runtime_1.jsx)("h2", { children: "No Quiz By This ID" }, void 0) }), void 0));
};
exports.Quiz = Quiz;
