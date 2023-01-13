"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPlaylists = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const AddCircle_1 = __importDefault(require("@mui/icons-material/AddCircle"));
const components_1 = require("../../../../lib/components");
require("./userPlaylists.scss");
const UserPlaylists = ({ userPlaylists, playlistsPage, limit, setPlaylistsPage }) => {
    const { result, totalCount } = userPlaylists;
    const handleChange = (event, page) => {
        setPlaylistsPage(page);
    };
    const userPlaylistsList = ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ className: "user--playlists" }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true, spacing: 2, sx: { alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsxs)("h2", { children: [totalCount, " Playlists"] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/playlist/create` }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Add New Playlist" }, { children: (0, jsx_runtime_1.jsx)(AddCircle_1.default, { sx: { color: "black" } }, void 0) }), void 0) }), void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true }, { children: result.map((value, index) => ((0, jsx_runtime_1.jsx)(components_1.UserPlaylistsCard, { playlist: value }, index))) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Pagination, { count: Math.ceil(totalCount / limit), page: playlistsPage, onChange: handleChange }, void 0)] }), void 0));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: userPlaylistsList }, void 0));
};
exports.UserPlaylists = UserPlaylists;
