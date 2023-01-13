"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardGrid = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const generated_1 = require("../../../graphql/generated");
const material_1 = require("@mui/material");
const displayError_1 = require("../../../lib/utils/alerts/displayError");
const CardGridSkeleton_1 = require("../CardGridSkeleton");
const __1 = require("../");
require("./cardgrid.scss");
const CardGrid = () => {
    const { data, loading, error } = (0, generated_1.useAllPlaylistsQuery)({
        variables: {
            limit: 8,
            page: 1
        },
        pollInterval: 500
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.LinearProgress, {}, void 0), (0, jsx_runtime_1.jsx)(CardGridSkeleton_1.CardGridSkeleton, {}, void 0)] }, void 0));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsx)(displayError_1.DisplayError, { title: "Failed to load playlists" }, void 0));
    }
    const playlists = data ? data.allplaylists : null;
    return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: 'grid--cards' }, { children: playlists === null || playlists === void 0 ? void 0 : playlists.result.map((i, index) => ((0, react_1.createElement)(__1.PlaylistDetails, Object.assign({}, i, { key: index })))) }), void 0));
};
exports.CardGrid = CardGrid;
