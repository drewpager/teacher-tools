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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLesson = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const react_1 = require("react");
const formik_1 = require("formik");
const yup = __importStar(require("yup"));
const react_router_dom_1 = require("react-router-dom");
const generated_1 = require("../../graphql/generated");
const utils_1 = require("../../lib/utils");
const moment_1 = __importDefault(require("moment"));
require("./createLesson.scss");
const initialData = {
    title: "",
    meta: "",
    category: [],
    startDate: "",
    endDate: "",
    video: "",
    image: ""
};
const validationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .max(61, 'Title should be less than 60 characters'),
    meta: yup
        .string()
        .min(150, 'Meta should be 160 characters or longer')
        .required('Meta description is required'),
    category: yup
        .array().of(yup.string().min(1, "Please select at least one category.")).min(2, "Please select at least two categories.")
        .required('Please select a category'),
    startDate: yup
        .date()
        .required('Please add a start date'),
    endDate: yup
        .date().transform((value, originalValue, context) => {
        // check to see if the previous transform already parsed the date
        if (context.isType(value))
            return value;
        // the default coercion failed so let's try it with Moment.js instead
        value = (0, moment_1.default)(originalValue, "YYYY-MM-DD");
        // if it's valid return the date object, otherwise return an `InvalidDate`
        return value.isValid() ? value.toDate() : new Date('');
    })
        .required('Please add an end date'),
    video: yup
        .string()
        .required('A video or lecture is required, please upload.'),
    image: yup
        .string(),
});
const CreateLesson = ({ viewer }) => {
    const [formData, setFormData] = (0, react_1.useState)(initialData);
    const [errorState, setError] = (0, react_1.useState)(false);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [imageProgress, setImageProgress] = (0, react_1.useState)(0);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [createLesson, { loading, error }] = (0, generated_1.useCreateLessonMutation)({
        variables: {
            input: {
                title: "",
                meta: "",
                category: [],
                startDate: "",
                endDate: "",
                video: "",
                image: ""
            }
        }
    });
    // TODO - Restrict Video Uploads by File Type and Size
    const handleVideoUpload = (files) => {
        const file = files ? files[0] : null;
        // Set your cloud name and unsigned upload preset here:
        var YOUR_CLOUD_NAME = "drewpager";
        var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach";
        var POST_URL = "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";
        var XUniqueUploadId = new Date().toString();
        handleVideoUpload(file);
        function handleVideoUpload(file) {
            var size = file ? file.size : 0;
            var sliceSize = 10000000;
            var start = 0;
            setTimeout(loop, 3);
            function loop() {
                let end = start + sliceSize;
                if (end > size) {
                    end = size;
                    setProgress(100);
                }
                const s = slice(file, start, end);
                send(s, start, end - 1, size);
                if (end < size) {
                    start += sliceSize;
                    setTimeout(loop, 3);
                    setProgress((end / size) * 100);
                }
            }
        }
        function send(piece, start, end, size) {
            const regex = /\s+|\W+/gm;
            const publicId = formData.title.replaceAll(regex, "-");
            console.log("PublicID: ", publicId);
            console.log("start ", start);
            console.log("end", end);
            var formdata = new FormData();
            console.log(XUniqueUploadId);
            formdata.append("file", piece);
            formdata.append("cloud_name", YOUR_CLOUD_NAME);
            formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
            formdata.append("chunk_size", "6000000");
            formdata.append("public_id", publicId);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", POST_URL, false);
            xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
            xhr.setRequestHeader("Content-Range", "bytes " + start + "-" + end + "/" + size);
            xhr.onload = function () {
                // do something to response
                console.log("Cloudinary Response: ", this.responseText);
                const res = JSON.parse(this.response);
                console.log("URL: ", res.secure_url);
                formData.video = res.secure_url;
                setFormData(Object.assign(Object.assign({}, formData), { video: formData.video }));
            };
            xhr.send(formdata);
        }
        function slice(file, start, end) {
            const slice = file
                ? file.slice
                : noop;
            return slice.bind(file)(start, end);
        }
        function noop() { }
        return formData.video;
    };
    const handleImageUpload = (files) => __awaiter(void 0, void 0, void 0, function* () {
        const file = files ? files[0] : null;
        // Set your cloud name and unsigned upload preset here:
        var YOUR_CLOUD_NAME = "drewpager";
        var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach-image";
        var POST_URL = "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";
        var XUniqueUploadId = new Date().toString();
        handleImageUpload(file);
        function handleImageUpload(file) {
            var size = file ? file.size : 0;
            var sliceSize = 10000000;
            var start = 0;
            setTimeout(loop, 3);
            function loop() {
                let end = start + sliceSize;
                if (end > size) {
                    end = size;
                    setImageProgress(100);
                }
                const s = slice(file, start, end);
                send(s, start, end - 1, size);
                if (end < size) {
                    start += sliceSize;
                    setTimeout(loop, 3);
                    setImageProgress((end / size) * 100);
                }
            }
        }
        function send(piece, start, end, size) {
            console.log("start ", start);
            console.log("end", end);
            var formdata = new FormData();
            console.log(XUniqueUploadId);
            formdata.append("file", piece);
            formdata.append("cloud_name", YOUR_CLOUD_NAME);
            formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
            formdata.append("chunk_size", "6000000");
            formdata.append("public_id", file.name);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", POST_URL, false);
            xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
            xhr.setRequestHeader("Content-Range", "bytes " + start + "-" + end + "/" + size);
            xhr.onload = function () {
                // do something to response
                const res = JSON.parse(this.response);
                formData.image = res.url;
                console.log(formData.image);
            };
            xhr.send(formdata);
        }
        function slice(file, start, end) {
            const slice = file
                ? file.slice
                : noop;
            return slice.bind(file)(start, end);
        }
        function noop() { }
        return formData.image;
    });
    const LabelProgress = ({ progress }) => {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { position: 'relative', display: 'inline-flex' } }, { children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: "primary", variant: 'determinate', value: progress }, void 0), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 2,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "caption", component: "div", color: "text.secondary" }, { children: `${Math.round(progress)}%` }), void 0) }), void 0)] }), void 0));
    };
    if (!viewer.id || !viewer.hasPayment) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: 'createLesson--error' }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: "h3" }, { children: ["You Must Be ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ style: { textDecoration: 'none', color: "#F67B50" }, to: "/login" }, { children: "Logged In" }), void 0), " Using an Active Account."] }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h4" }, { children: "We require content creators to be paying users to avoid fraudulent content." }), void 0)] }), void 0));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: 'createLesson--page' }, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: 'createLesson--form' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Create a New Lesson" }, void 0), (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ initialValues: {
                            title: "",
                            meta: "",
                            category: [],
                            startDate: "",
                            endDate: "",
                            video: "",
                            image: ""
                        }, validationSchema: validationSchema, onSubmit: (values) => __awaiter(void 0, void 0, void 0, function* () {
                            values.video = formData.video;
                            values.image = formData.image;
                            yield createLesson({
                                variables: {
                                    input: values
                                }
                            });
                            navigate(`../user/${viewer.id}`, { replace: true });
                        }) }, { children: ({ values, errors, touched, isSubmitting, handleSubmit, handleChange, setFieldValue }) => ((0, jsx_runtime_1.jsxs)(formik_1.Form, Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { variant: "outlined", label: "Title", helperText: errors.title ? `${errors.title}` : "Add a Lesson Title (Max Character Count of 160)", sx: { width: "45%" }, value: values.title, name: "title", onChange: handleChange, required: true, error: touched && errors.title ? true : false }, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { type: "file", id: "video", variant: 'outlined', helperText: errors.video ? `${errors.video}` : "Upload a Video or Lecture", className: 'file--upload', sx: { width: "45%", marginTop: 1 }, name: "video", onChange: (e) => __awaiter(void 0, void 0, void 0, function* () { setFieldValue("video", yield handleVideoUpload(e.target.files)); }), InputProps: {
                                        endAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, Object.assign({ position: "end" }, { children: (0, jsx_runtime_1.jsx)(LabelProgress, { progress: progress }, void 0) }), void 0)),
                                        startAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, Object.assign({ position: "start" }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.VideoLibrary, {}, void 0) }), void 0))
                                    }, required: true, error: errors.video || touched.video ? true : false }, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { type: "file", id: "image", variant: 'outlined', helperText: "Image", sx: { width: "45%", marginTop: 1 }, name: "image", onChange: (e) => __awaiter(void 0, void 0, void 0, function* () { setFieldValue("image", yield handleImageUpload(e.target.files)); }), InputProps: {
                                        endAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, Object.assign({ position: "end" }, { children: (0, jsx_runtime_1.jsx)(LabelProgress, { progress: imageProgress }, void 0) }), void 0)),
                                        startAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, Object.assign({ position: "start" }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.AddPhotoAlternate, {}, void 0) }), void 0))
                                    }, color: "primary", required: true }, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { variant: "outlined", label: "Description", multiline: true, rows: 3, helperText: "Min Character Count of 160", sx: { width: "45%", marginTop: 1 }, value: values.meta, name: "meta", onChange: handleChange, required: true, error: touched.meta && errors.meta ? true : false }, void 0), (0, jsx_runtime_1.jsxs)(material_1.FormGroup, Object.assign({ sx: { marginTop: 1 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h5" }, { children: "Category" }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "body2", style: { color: "gray" } }, { children: "Select All That Apply" }), void 0), (0, jsx_runtime_1.jsx)(formik_1.FieldArray, Object.assign({ name: "category" }, { children: ({ insert, remove, push }) => (
                                            // TODO: Render categories
                                            (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "field--checkboxes" }, { children: utils_1.categories.map((cat, index) => ((0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "field--checkboxes-label" }, { children: [(0, jsx_runtime_1.jsx)(formik_1.Field, { type: "checkbox", name: "category", value: cat.name, className: "field--checkbox", error: touched.category && errors.category ? true : false }, void 0), cat.name] }), index))) }), void 0)) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { variant: 'outlined', name: "startDate", label: "Start Date or Year", helperText: errors.startDate ? `${errors.startDate}` : "Add a time period start date as YYYY-MM-DD or -33,000 for 33,000 BCE", sx: { width: "45%", marginTop: 1 }, value: values.startDate, onChange: handleChange, error: touched.startDate && errors.startDate ? true : false, required: true }, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(material_1.TextField, { variant: 'outlined', name: "endDate", label: "End Date or Year", helperText: "YYYY-MM-DD or 1052", sx: { width: "45%", marginTop: 1 }, value: values.endDate, onChange: handleChange, required: true, error: touched.endDate && errors.endDate ? true : false }, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), errors ? setError(true) : setError(false), console.log(errors), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: { marginTop: 2 }, disabled: !values.title || !values.endDate || errorState || isSubmitting, variant: 'contained', color: 'primary', type: "submit" }, { children: "Submit" }), void 0)] }), void 0)) }), void 0)] }), void 0) }), void 0));
    }
};
exports.CreateLesson = CreateLesson;
