"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const CardContent_1 = __importDefault(require("@mui/material/CardContent"));
const CardActions_1 = __importDefault(require("@mui/material/CardActions"));
const Collapse_1 = __importDefault(require("@mui/material/Collapse"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Favorite_1 = __importDefault(require("@mui/icons-material/Favorite"));
const Share_1 = __importDefault(require("@mui/icons-material/Share"));
const ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
require("./playlistdetails.scss");
const ExpandMore = (0, styles_1.styled)((props) => {
    const { expand } = props, more = __rest(props, ["expand"]);
    return (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({}, more), void 0);
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const PlaylistDetails = (playlist) => {
    var _a;
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.Card, { children: [(0, jsx_runtime_1.jsx)(CardContent_1.default, Object.assign({ className: 'card--content' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/playlist/${playlist.id}`, style: { textDecoration: "none" } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ className: 'card--title', variant: "h3" }, { children: playlist.name }), void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsxs)(CardActions_1.default, Object.assign({ className: 'card--actions', disableSpacing: true }, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ "aria-label": "add to favorites" }, { children: (0, jsx_runtime_1.jsx)(Favorite_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ "aria-label": "share" }, { children: (0, jsx_runtime_1.jsx)(Share_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(ExpandMore, Object.assign({ expand: expanded, onClick: handleExpandClick, "aria-expanded": expanded, "aria-label": "show more" }, { children: (0, jsx_runtime_1.jsx)(ExpandMore_1.default, {}, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Collapse_1.default, Object.assign({ in: expanded, timeout: "auto", unmountOnExit: true }, { children: (0, jsx_runtime_1.jsx)(CardContent_1.default, { children: (0, jsx_runtime_1.jsx)("ul", { children: (_a = playlist === null || playlist === void 0 ? void 0 : playlist.plan) === null || _a === void 0 ? void 0 : _a.map((j) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ paragraph: true }, { children: j === null || j === void 0 ? void 0 : j.title }), void 0) }, j === null || j === void 0 ? void 0 : j.id))) }, void 0) }, void 0) }), void 0)] }, void 0) }, void 0));
};
exports.PlaylistDetails = PlaylistDetails;
