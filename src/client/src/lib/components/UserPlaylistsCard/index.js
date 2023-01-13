"use strict";
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
exports.UserPlaylistsCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const client_1 = require("@apollo/client");
const graphql_tag_1 = require("graphql-tag");
const utils_1 = require("../../utils");
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const UserPlaylistsCard = ({ playlist }) => {
    const navigation = (0, react_router_dom_1.useNavigate)();
    const DELETE_PLAYLIST = (0, graphql_tag_1.gql) `
  mutation DeletePlaylist($id: ID) {
    deletePlaylist(id: $id)
  }
`;
    const UPDATE_PLAN = (0, graphql_tag_1.gql) `
    mutation UpdatePlan($input: playlist) {
      updatePlan(input: $input)
    }
  `;
    const [deletePlaylist, { loading: DeletePlaylistLoading, error: DeletePlaylistError }] = (0, client_1.useMutation)(DELETE_PLAYLIST);
    const [updatePlan, { loading: UpdatePlanLoading, error: UpdatePlanError }] = (0, client_1.useMutation)(UPDATE_PLAN);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield deletePlaylist({ variables: { id } });
        if (res) {
            // window.location.reload();
            return ((0, jsx_runtime_1.jsx)(utils_1.DisplaySuccess, { title: "Deletion Successful!" }, void 0));
        }
    });
    const handleUpdate = (id) => __awaiter(void 0, void 0, void 0, function* () {
        navigation(`/edit/${id}`);
        yield updatePlan({ variables: { id } });
    });
    const deletePlaylistLoadingMessage = ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: {
            color: 'inherit',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1,
        } }, void 0));
    const updatePlanLoadingMessage = deletePlaylistLoadingMessage;
    const deletePlaylistErrorMessage = ((0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ variant: "outlined", severity: "error" }, { children: "Oops, something went wrong in the deletion process!" }), void 0));
    const updatePlanErrorMessage = ((0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ variant: "outlined", severity: "error" }, { children: "Oops, unable to edit playlist right now!" }), void 0));
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, lg: 4, md: 6, sm: 12, xs: 12 }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ sx: { minWidth: 350 } }, { children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/playlist/${playlist.id}`, style: { textDecoration: "none" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h4', style: { color: "#000" } }, { children: playlist.name }), void 0), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: 'h6', style: { color: "#000" } }, { children: [playlist.plan.length, " ", playlist.plan.length === 1 ? " Item" : " Items"] }), void 0)] }), void 0), UpdatePlanLoading ? updatePlanLoadingMessage : (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => handleUpdate(playlist.id) }, { children: (0, jsx_runtime_1.jsx)(Edit_1.default, {}, void 0) }), void 0), UpdatePlanError ? updatePlanErrorMessage : null, DeletePlaylistLoading ? deletePlaylistLoadingMessage : (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => handleDelete(playlist.id) }, { children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}, void 0) }), void 0), DeletePlaylistError ? deletePlaylistErrorMessage : null] }, void 0) }), void 0) }, playlist.id) }), playlist.id));
};
exports.UserPlaylistsCard = UserPlaylistsCard;
