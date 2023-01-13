"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
require("./search.scss");
const Search = () => {
    const history = (0, react_router_dom_1.useNavigate)();
    const onSearch = (value, e) => {
        e.preventDefault();
        history(`/playlist/${value}`);
    };
    const [input, setInput] = (0, react_1.useState)('search playlists');
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: 'search--wrapper' }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { className: 'search--input', variant: 'outlined', placeholder: input, onChange: (e) => setInput(`${e.target.value}`) }, void 0), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: 'search--submit', onClick: (event) => onSearch(input, event) }, { children: (0, jsx_runtime_1.jsx)(Search_1.default, {}, void 0) }), void 0)] }), void 0));
};
exports.Search = Search;
