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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const index_1 = require("../index");
require("./playlistcard.scss");
// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
const PlaylistCard = ({ playlist }) => {
    var _a, _b, _c;
    // const [video, setVideo] = useState<string>()
    const [itemName, setItemName] = (0, react_1.useState)(playlist && playlist.plan ? Object.assign({}, playlist.plan[0]) : {});
    const [active, setActive] = (0, react_1.useState)(playlist && playlist.plan ? `${(_a = playlist === null || playlist === void 0 ? void 0 : playlist.plan[0]) === null || _a === void 0 ? void 0 : _a.id}` : `1`);
    const handleChange = (_a) => {
        var item = __rest(_a, []);
        setItemName(item);
        setActive(`${item.id}`);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ className: 'playlist--title', variant: "h2", sx: { py: 1 } }, { children: playlist.name }), void 0), (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true, className: 'playlistcard--grid' }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ className: 'playlistcard--grid__list' }, { children: (0, jsx_runtime_1.jsxs)(material_1.List, { children: [console.log(playlist.plan), (_b = playlist === null || playlist === void 0 ? void 0 : playlist.plan) === null || _b === void 0 ? void 0 : _b.map((item, id) => ((0, jsx_runtime_1.jsx)(material_1.ListItem, Object.assign({ disableGutters: true }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItemButton, Object.assign({ disableGutters: true, className: active === `${item === null || item === void 0 ? void 0 : item.id}` ? 'active' : '', onClick: () => handleChange(Object.assign({}, item)) }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: item === null || item === void 0 ? void 0 : item.title }, void 0) }), void 0) }), id)))] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ className: 'playlistcard--grid__video' }, { children: (_c = playlist.plan) === null || _c === void 0 ? void 0 : _c.filter((item) => (item === null || item === void 0 ? void 0 : item.id) === active).map((iter, index) => {
                            if ((iter === null || iter === void 0 ? void 0 : iter.__typename) === "Quiz") {
                                return ((0, jsx_runtime_1.jsx)(index_1.QuizPlayer, { quiz: iter }, index));
                            }
                            if ((iter === null || iter === void 0 ? void 0 : iter.__typename) === "Lesson") {
                                return ((0, jsx_runtime_1.jsx)(index_1.VideoPlayer, { url: `${iter === null || iter === void 0 ? void 0 : iter.video}` }, index));
                            }
                            return ((0, jsx_runtime_1.jsx)("h2", { children: "Failed to load resource" }, void 0));
                        }) }), void 0)] }), void 0)] }, void 0));
};
exports.PlaylistCard = PlaylistCard;
