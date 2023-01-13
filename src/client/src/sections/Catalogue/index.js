"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalogue = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const x_data_grid_1 = require("@mui/x-data-grid");
const react_router_dom_1 = require("react-router-dom");
const generated_1 = require("../../graphql/generated");
const utils_1 = require("../../lib/utils");
require("./catalog.scss");
const columns = [
    { field: 'id', headerName: 'Lesson', width: 70 },
    {
        field: 'title',
        headerName: 'Title',
        width: 250
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 100,
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        width: 100
    },
    {
        field: 'duration',
        headerName: 'Duration',
        description: "This column cannot be sorted.",
        sortable: false,
        width: 200,
        valueGetter: (params) => `${params.row.startDate || ''}-${params.row.endDate || ''}`
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 300
    },
];
const Catalogue = () => {
    const [start, setStart] = (0, react_1.useState)([]);
    const [category, setCategory] = (0, react_1.useState)("All");
    const [categoryList, setCategoryList] = (0, react_1.useState)([""]);
    let rows = [];
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
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0);
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("h1", { children: "Failed!" }, void 0);
    }
    if (data && categoryList && start) {
        // let lessons = data.allLessons.result;
        for (let i = 0; i < start.length; i++) {
            const items = {
                id: i + 1,
                title: start[i].title,
                startDate: (0, utils_1.formatDate)(start[i].startDate),
                endDate: (0, utils_1.formatDate)(start[i].endDate),
                category: start[i].category
            };
            rows.push(items);
        }
    }
    return (
    // DataGrid checkboxSelection set to true adds checkbox, but requires an MUI Pro plan to access data
    // TODO: Query user for # of playlists, if > 0, say "Start Building Next Lesson Plan", if 0 say "...First Lesson Plan"
    (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, sm: 12, md: 9, lg: 8 }, { children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { rows: rows, columns: columns, pageSize: 10, rowsPerPageOptions: [50], className: "catalog--dataTable" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ item: true, xs: 12, sm: 12, md: 3, lg: 4, className: "catalogGrid--item" }, { children: [categoryList.map((j, index) => ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "catalogFilters--button", onClick: () => handleClick(j) }, { children: j }), index))), (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "catalog--cta" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Start Building Your First Lesson Plan" }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/playlist/create", style: { textDecoration: "none" } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "catalogFilters--button" }, { children: "Create Lesson Plan" }), void 0) }), void 0)] }), void 0)] }), void 0)] }), void 0) }, void 0));
};
exports.Catalogue = Catalogue;
