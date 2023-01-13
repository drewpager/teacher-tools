"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.QuizCreate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const formik_1 = require("formik");
const generated_1 = require("../../graphql/generated");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const react_router_dom_1 = require("react-router-dom");
const utils_1 = require("../../lib/utils");
require("./createQuiz.scss");
const yup = __importStar(require("yup"));
const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    creator: yup
        .string()
        .required('Creator ID is required'),
    questions: yup
        .array().of(yup.object().shape({
        question: yup.string().min(4, "Question should be greater than 4 characters!"),
        answerType: yup.mixed().oneOf([generated_1.AnswerFormat.Multiplechoice, generated_1.AnswerFormat.Truefalse]).defined().required("Required"),
        answerOptions: yup.array().of(yup.object().shape({
            isCorrect: yup.boolean(),
            answerText: yup.string().min(1)
        }).required("Required"))
    }))
});
const Input = ({ field, form: { errors, touched } }) => {
    const errorMessage = (0, formik_1.getIn)(errors, field.name);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, field, { placeholder: `Question/Prompt`, fullWidth: true, sx: { paddingTop: "0.5rem", gridColumn: 4 } }), void 0), !!touched && errors && (0, jsx_runtime_1.jsx)("div", { children: errorMessage }, void 0)] }, void 0));
};
// TODO: Click to switch answerOption value from True to False
const checkInput = ({ field, form: { errors, touched } }) => {
    const errorMessage = (0, formik_1.getIn)(errors, field.name);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(formik_1.Field, { type: "checkbox", name: field.name, default: true, sx: { padding: "0.5rem", gridColumn: 4 } }, void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: `${field.value}` }, void 0), !!touched && errors && (0, jsx_runtime_1.jsx)("div", { children: errorMessage }, void 0)] }, void 0));
};
const QuizCreate = ({ viewer }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [createQuiz, { loading, error }] = (0, generated_1.useCreateQuizMutation)({
        variables: {
            input: {
                title: "",
                questions: [{}],
                creator: ""
            }
        }
    });
    if (loading) {
        (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: 'primary' }, void 0) }, void 0);
    }
    if (error) {
        (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Failed to create assessment" }, void 0) }, void 0);
    }
    return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: "quizCreate--form" }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ initialValues: {
                title: "",
                questions: [
                    {
                        question: "",
                        answerType: generated_1.AnswerFormat.Truefalse || generated_1.AnswerFormat.Multiplechoice,
                        answerOptions: [
                            { answerText: "", isCorrect: true },
                        ]
                    },
                ],
                creator: `${viewer.id}`,
            }, validationSchema: validationSchema, onSubmit: (values) => __awaiter(void 0, void 0, void 0, function* () {
                yield createQuiz({
                    variables: {
                        input: values
                    }
                });
                navigate(`../user/${viewer.id}`, { replace: true });
            }) }, { children: ({ values, errors, touched, handleSubmit, handleChange }) => ((0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Create Assessment" }, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, type: "text", name: "title", label: "Assessment Title", value: values.title, onChange: handleChange, error: Boolean(errors.title), helperText: errors.title, sx: {
                            gridColumn: 3
                        } }, void 0), (0, jsx_runtime_1.jsx)(formik_1.FieldArray, Object.assign({ name: "questions" }, { children: ({ insert, remove, push }) => ((0, jsx_runtime_1.jsxs)("div", { children: [values.questions.length > 0 &&
                                    values.questions.map((question, index) => {
                                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'row' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col' }, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { placeholder: `Question/Prompt`, fullWidth: true, sx: { paddingTop: "0.5rem", gridColumn: 4 }, name: `questions[${index}].question`, onChange: handleChange, InputProps: {
                                                            endAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, Object.assign({ position: "end" }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.Cancel, { onClick: () => remove(index), className: "button--cancel" }, void 0) }), void 0))
                                                        } }, void 0) }), index), (0, jsx_runtime_1.jsx)(material_1.FormLabel, { children: "Answer Type" }, void 0), (0, jsx_runtime_1.jsxs)(material_1.RadioGroup, Object.assign({ defaultValue: "TRUEFALSE" }, { children: [(0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { name: `questions[${index}].answerType`, value: "TRUEFALSE", control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}, void 0), label: "True/False", onChange: handleChange }, void 0), (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { name: `questions[${index}].answerType`, value: "MULTIPLECHOICE", control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}, void 0), label: "Multiple Choice", onChange: handleChange }, void 0)] }), void 0), question.answerType === "MULTIPLECHOICE" ? ((0, jsx_runtime_1.jsx)(formik_1.FieldArray, Object.assign({ name: `questions[${index}].answerOptions` }, { children: ({ insert, remove, push }) => ((0, jsx_runtime_1.jsx)("div", { children: values.questions[index].answerOptions.length > 0 &&
                                                            values.questions[index].answerOptions.map((option, indy) => {
                                                                return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "quiz__multiAnswerArea" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "quiz__multiAnswers" }, { children: [(0, jsx_runtime_1.jsx)(formik_1.Field, { name: `questions[${index}].answerOptions[${indy}].isCorrect`, component: checkInput }, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Enter Answer Option", fullWidth: true, sx: { marginTop: 2 }, name: `questions[${index}].answerOptions[${indy}].answerText`, onChange: handleChange }, void 0), (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Add another answer option", className: "quiz--modicons" }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.ControlPoint, { onClick: () => push({ answerText: "", isCorrect: false }) }, void 0) }), void 0), (indy === 0) ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0)) : ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Remove answer option", className: "quiz--modicons" }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.Remove, { onClick: () => remove(indy) }, void 0) }), void 0))] }), void 0) }), void 0));
                                                            }) }, void 0)) }), void 0)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0)), question.answerType === "TRUEFALSE" ? (
                                                /* TODO: disable remove button on last item and only render +/- buttons when last index of array */
                                                (0, jsx_runtime_1.jsx)(formik_1.FieldArray, Object.assign({ name: `questions[${index}].answerOptions` }, { children: ({ insert, remove, push }) => ((0, jsx_runtime_1.jsx)("div", { children: values.questions[index].answerOptions.length > 0 &&
                                                            values.questions[index].answerOptions.map((option, indy) => {
                                                                return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "quiz__multiAnswerArea" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "quiz__multiAnswers" }, { children: (0, jsx_runtime_1.jsx)(formik_1.Field, { name: `questions[${index}].answerOptions[${indy}].isCorrect`, component: checkInput }, void 0) }), void 0) }), void 0));
                                                            }) }, void 0)) }), void 0)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0))] }), index));
                                    }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "outlined", className: "quiz--button-add", onClick: () => push({ question: '', answerType: generated_1.AnswerFormat,
                                        answerOptions: [
                                            { answerText: "", isCorrect: true },
                                        ] }) }, { children: "Add Question" }), void 0)] }, void 0)) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "outlined", type: "submit", className: "quiz--button-submit" }, { children: "Submit" }), void 0)] }), void 0)) }), void 0) }), void 0));
};
exports.QuizCreate = QuizCreate;
