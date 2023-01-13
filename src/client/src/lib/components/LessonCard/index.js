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
exports.LessonCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const utils_1 = require("../../utils");
const graphql_tag_1 = require("graphql-tag");
const client_1 = require("@apollo/client");
const react_router_dom_1 = require("react-router-dom");
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const LessonCard = ({ lesson }) => {
    const DELETE_LESSON = (0, graphql_tag_1.gql) `
    mutation DeleteLesson($id: ID) {
      deleteLesson(id: $id)
    }
  `;
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield deleteLesson({ variables: { id } });
        if (res) {
            return (0, jsx_runtime_1.jsx)(utils_1.DisplaySuccess, { title: "Deletion Successful!" }, void 0);
        }
    });
    const [deleteLesson, { loading: deleteLessonLoading, error: deleteLessonError }] = (0, client_1.useMutation)(DELETE_LESSON);
    const { id, title, category, video, image, startDate, endDate } = lesson;
    const deleteLessonLoadingMessage = ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: {
            color: 'inherit',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1,
        } }, void 0));
    const deleteLessonErrorMessage = ((0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ variant: "outlined", severity: "error" }, { children: "Oops, something went wrong in the deletion process!" }), void 0));
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, lg: 4, md: 6, sm: 12, xs: 12 }, { children: (0, jsx_runtime_1.jsxs)(material_1.Card, Object.assign({ sx: { minWidth: 350, boxShadow: 1, padding: 3 } }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/lesson/${id}`, style: { textDecoration: "none", color: "black" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h5" }, { children: title }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h6" }, { children: category }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "body2" }, { children: startDate }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "body2" }, { children: endDate }), void 0)] }), void 0), deleteLessonLoading ? deleteLessonLoadingMessage : (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => handleDelete(id) }, { children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}, void 0) }), void 0), deleteLessonError ? deleteLessonErrorMessage : null] }), void 0) }), void 0));
};
exports.LessonCard = LessonCard;
