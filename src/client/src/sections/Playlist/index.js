"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const generated_1 = require("../../graphql/generated");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const displayError_1 = require("../../lib/utils/alerts/displayError");
const components_1 = require("../../lib/components/");
const Playlist = () => {
    const params = (0, react_router_dom_1.useParams)();
    const { data, loading, error } = (0, generated_1.usePlaylistQuery)({
        variables: {
            id: `${params.id}`
        }
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(material_1.LinearProgress, {}, void 0));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { marginLeft: 5 } }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Playlist Not Found" }, void 0), (0, jsx_runtime_1.jsx)("h4", { children: "Here are a few available playlists or you can try searching again." }, void 0), (0, jsx_runtime_1.jsx)(components_1.Search, {}, void 0), (0, jsx_runtime_1.jsx)(displayError_1.DisplayError, { title: 'Failed to load playlist' }, void 0)] }), void 0));
    }
    const playlist = data ? data.playlist : null;
    if (playlist) {
        console.log("Playlist from Index: ", playlist);
        return ((0, jsx_runtime_1.jsx)(components_1.PlaylistCard, { playlist: playlist }, void 0));
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { marginLeft: 5 } }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "No Playlist By This ID" }, void 0), (0, jsx_runtime_1.jsx)(displayError_1.DisplayError, { title: 'No Playlist By This ID' }, void 0)] }), void 0));
};
exports.Playlist = Playlist;
