"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizPlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const QuizPlayer = ({ quiz }) => {
    const title = quiz.title;
    return ((0, jsx_runtime_1.jsx)(material_1.FormControl, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("h1", { children: title }, void 0), quiz.questions.map((i, indy) => {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.RadioGroup, { children: [(0, jsx_runtime_1.jsx)("h2", { children: i.question }, void 0), (_a = i.answerOptions) === null || _a === void 0 ? void 0 : _a.map((t, index) => ((0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: t === null || t === void 0 ? void 0 : t.answerText, label: `${t === null || t === void 0 ? void 0 : t.answerText}`, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}, void 0) }, index)))] }, indy) }, void 0));
                }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ type: "submit" }, { children: "Check Answers" }), void 0)] }, void 0) }, void 0));
};
exports.QuizPlayer = QuizPlayer;
