"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const generated_1 = require("../../graphql/generated");
const components_1 = require("./components/");
const displayError_1 = require("../../lib/utils/alerts/displayError");
const components_2 = require("../../lib/components/");
const components_3 = require("../../lib/components/");
const User = ({ viewer }) => {
    const [playlistsPage, setPlaylistsPage] = (0, react_1.useState)(1);
    const [lessonsPage, setLessonsPage] = (0, react_1.useState)(1);
    const [quizzesPage, setQuizzesPage] = (0, react_1.useState)(1);
    const pageLimit = 3;
    const params = (0, react_router_dom_1.useParams)();
    const { data, loading, error } = (0, generated_1.useUserQuery)({
        variables: {
            id: `${params.id}`,
            playlistsPage: playlistsPage,
            lessonsPage: lessonsPage,
            quizzesPage: quizzesPage,
            limit: pageLimit
        }
    });
    const user = data ? data.user : null;
    const viewerIsUser = viewer.id === params.id;
    const UserProfileElement = user ? (0, jsx_runtime_1.jsx)(components_1.UserProfile, { user: user, viewerIsUser: viewerIsUser }, void 0) : null;
    const userLessons = user ? user.lessons : null;
    const userPlaylists = user ? user.playlists : null;
    const userQuizzes = user ? user.quizzes : null;
    const userLessonsElement = (0, react_1.useMemo)(() => userLessons ? ((0, jsx_runtime_1.jsx)(components_1.UserLessons, { userLessons: userLessons, lessonsPage: lessonsPage, limit: pageLimit, setLessonsPage: setLessonsPage }, void 0)) : ((0, jsx_runtime_1.jsx)("h2", { children: "UserLessons Not Working" }, void 0)), [userLessons, lessonsPage]);
    const userPlaylistsElement = (0, react_1.useMemo)(() => userPlaylists ? ((0, jsx_runtime_1.jsx)(components_1.UserPlaylists, { userPlaylists: userPlaylists, playlistsPage: playlistsPage, limit: pageLimit, setPlaylistsPage: setPlaylistsPage }, void 0)) : ((0, jsx_runtime_1.jsx)("h2", { children: "UserPlaylists Not Working" }, void 0)), [userPlaylists, playlistsPage]);
    const userQuizzesElement = (0, react_1.useMemo)(() => userQuizzes ? ((0, jsx_runtime_1.jsx)(components_1.UserQuizzes, { userQuizzes: userQuizzes, quizzesPage: quizzesPage, limit: pageLimit, setQuizzesPage: setQuizzesPage }, void 0)) : ((0, jsx_runtime_1.jsx)("h2", { children: "Failed to load quizzes" }, void 0)), [userQuizzes, quizzesPage]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(components_2.PageSkeleton, {}, void 0));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(displayError_1.DisplayError, { title: "Failed to find user profile" }, void 0), console.log(error)] }, void 0));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [UserProfileElement, userLessonsElement, userPlaylistsElement, userQuizzesElement, (0, jsx_runtime_1.jsx)(components_3.Footer, { viewer: viewer }, void 0)] }, void 0));
};
exports.User = User;
