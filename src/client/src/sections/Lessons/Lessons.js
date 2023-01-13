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
exports.Lessons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const graphql_tag_1 = require("graphql-tag");
const react_hooks_1 = require("@apollo/react-hooks");
const material_1 = require("@mui/material");
const Container_1 = __importDefault(require("@mui/material/Container"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const LESSONS = (0, graphql_tag_1.gql) `
  query Lessons {
    lessons {
      id
      category
      title
      meta
      video
      image
      startDate
      endDate
    } 
  }
`;
const DELETE_LESSON = (0, graphql_tag_1.gql) `
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;
const Lessons = ({ title }) => {
    const { data, refetch, loading, error } = (0, react_hooks_1.useQuery)(LESSONS);
    const [deleteLesson, { loading: deleteLessonLoading, error: deleteLessonError }] = (0, react_hooks_1.useMutation)(DELETE_LESSON);
    const handleDeleteLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield deleteLesson({ variables: { id } });
        refetch();
    });
    // Rendering React Elements based on object status
    const deleteLessonLoadingMessage = deleteLessonLoading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: {
            color: 'inherit',
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1,
        } }, void 0)) : null;
    if (loading) {
        for (let i = 0; i < 10; i++) {
            return ((0, jsx_runtime_1.jsx)(material_1.List, Object.assign({ sx: { width: '100%', bgcolor: 'background.paper' } }, { children: (0, jsx_runtime_1.jsxs)(material_1.ListItem, Object.assign({ divider: true, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "rectangular", width: 250, height: 150 }, void 0), " ", (0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text" }, void 0), " ", (0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "rectangular", width: 50, height: 30 }, void 0)] }), i) }), void 0));
        }
        ;
    }
    ;
    if (error) {
        return ((0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ variant: "outlined", severity: "error", sx: { padding: "5px" } }, { children: "Oops, something went horribly wrong :(" }), void 0));
    }
    const deleteLessonErrorMessage = deleteLessonError ? ((0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ variant: "outlined", severity: "error" }, { children: "Oops, something went wrong in the deletion process!" }), void 0)) : null;
    const lessons = data ? data.lessons : null;
    const lessonList = ((0, jsx_runtime_1.jsx)(material_1.List, Object.assign({ sx: { width: '100%', bgcolor: 'background.paper' } }, { children: lessons === null || lessons === void 0 ? void 0 : lessons.map(lesson => {
            return ((0, jsx_runtime_1.jsxs)(material_1.ListItem, Object.assign({ divider: true, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, { alt: lesson.title + " image with text overlay", src: lesson.image, sx: { width: 250, height: 150, padding: 2, borderRadius: 5 } }, void 0), lesson.title, " | ", lesson.category.join(", "), " ", (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: { margin: 5 }, variant: "contained", onClick: () => handleDeleteLesson(lesson.id) }, { children: "Delete" }), void 0)] }), lesson.id));
        }) }), void 0));
    return ((0, jsx_runtime_1.jsxs)(Container_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h3", component: "h1", gutterBottom: true }, { children: title }), void 0), deleteLessonErrorMessage, lessonList, deleteLessonLoadingMessage] }, void 0));
};
exports.Lessons = Lessons;
