"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineEl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const lab_1 = require("@mui/lab");
const generated_1 = require("../../../graphql/generated");
const utils_1 = require("../../utils");
const theme_1 = __importDefault(require("../../../theme"));
require("./timeline.scss");
const TimelineEl = () => {
    const [start, setStart] = (0, react_1.useState)([]);
    const [category, setCategory] = (0, react_1.useState)("All");
    const [categoryList, setCategoryList] = (0, react_1.useState)([""]);
    // 1. Get All Start Dates from All Lessons
    const { data, loading, error } = (0, generated_1.useAllLessonsQuery)({
        variables: {
            limit: 10,
            page: 1
        }
    });
    const handleClick = (category) => {
        setCategory(category);
        let allArray = [];
        if (category === "All") {
            let result = data === null || data === void 0 ? void 0 : data.allLessons.result;
            result === null || result === void 0 ? void 0 : result.map((i) => (allArray.push(i)));
            setStart(allArray);
        }
    };
    (0, react_1.useEffect)(() => {
        // Create an array to push the resulting lesson objects
        let sorted = [];
        const categories = ["All"];
        const res = data === null || data === void 0 ? void 0 : data.allLessons.result;
        res === null || res === void 0 ? void 0 : res.map((i) => (sorted.push(i)));
        // get categories
        sorted.map((i) => (categories.push(`${i.category}`)));
        // Isolate one word categories
        categories.forEach((c, i) => {
            if (c.includes(",")) {
                categories.splice(i, i + 1);
                const litter = c.split(",");
                litter.map((e) => (categories.push(`${e}`)));
            }
        });
        // 2. Organize/sort lessons in descending order of start dates
        sorted.sort((a, b) => {
            if (a.startDate.startsWith("-")) {
                // if negative, multiply by number of seconds per year to get epoch value
                let start = a.startDate * 31556926 * 1000;
                return start;
            }
            let start = Date.parse(a.startDate);
            let end = Date.parse(b.startDate);
            return start - end;
        });
        // Default State & If "All" is selected, setStart to initialState
        if (category === "All") {
            let initialState = [];
            sorted.map((i) => (initialState.push(i)));
            setStart(initialState);
        }
        else {
            // Filter the sorted list based on the category set in state
            sorted = sorted.filter((l) => `${l.category}`.includes(category));
            setStart(sorted);
        }
        let uniqueCategories = Array.from(new Set(categories));
        setCategoryList(uniqueCategories);
    }, [data, category]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { padding: 5 } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0) }), void 0));
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: 'Failed to query Lessons' }, void 0);
    }
    // 3. Display in Timeline component
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: 'timeline--wrapper' }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h4" }, { children: "Teach History Chronologically" }), void 0), categoryList.map((j, index) => ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "categoryList--button", onClick: () => handleClick(j) }, { children: j }), index))), (0, jsx_runtime_1.jsx)(lab_1.Timeline, Object.assign({ className: 'timeline--outer', nonce: undefined, onResize: undefined, onResizeCapture: undefined }, { children: start.map((i, index) => ((0, jsx_runtime_1.jsxs)(lab_1.TimelineItem, Object.assign({ className: 'timeline--item' }, { children: [(0, jsx_runtime_1.jsxs)(lab_1.TimelineOppositeContent, Object.assign({ sx: { m: 'auto 0' }, align: "left", variant: "body2", color: "text.secondary", className: 'timeline--date' }, { children: [(0, utils_1.formatDate)(i.startDate), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, utils_1.formatDate)(i.endDate)] }), void 0), (0, jsx_runtime_1.jsxs)(lab_1.TimelineSeparator, { children: [(0, jsx_runtime_1.jsx)(lab_1.TimelineConnector, { sx: { backgroundColor: `${theme_1.default.palette.primary.main}` } }, void 0), (0, jsx_runtime_1.jsx)(lab_1.TimelineDot, { sx: { backgroundColor: `${theme_1.default.palette.primary.main}` } }, void 0), (0, jsx_runtime_1.jsx)(lab_1.TimelineConnector, { sx: { backgroundColor: `${theme_1.default.palette.primary.main}` } }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(lab_1.TimelineContent, Object.assign({ className: 'timeline--title' }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h6", component: "p" }, { children: i.title }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ className: 'timeline--description' }, { children: i.meta }), void 0)] }), void 0)] }), index))) }), void 0)] }), void 0));
};
exports.TimelineEl = TimelineEl;
