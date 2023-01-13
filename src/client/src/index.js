"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTypenameFromMutation = exports.removeTypenameFromMutationLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const client_1 = require("@apollo/client");
const omit_deep_lodash_1 = __importDefault(require("omit-deep-lodash"));
const context_1 = require("@apollo/client/link/context");
const sections_1 = require("./sections");
const utils_1 = require("./lib/utils");
const react_router_dom_1 = require("react-router-dom");
require("@fontsource/noto-serif/");
const styles_1 = require("@mui/material/styles");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const material_1 = require("@mui/material");
const theme_1 = __importDefault(require("./theme"));
// import { Viewer } from './lib/types';
const generated_1 = require("./graphql/generated");
const initialViewer = {
    id: null,
    token: null,
    avatar: null,
    hasPayment: null,
    didRequest: false
};
const App = () => {
    const [viewer, setViewer] = (0, react_1.useState)(initialViewer);
    const [logIn, { error }] = (0, generated_1.useLogInMutation)({
        onCompleted: data => {
            if (data && data.logIn) {
                setViewer(data.logIn);
                if (data.logIn.token) {
                    sessionStorage.setItem("token", data.logIn.token);
                }
                else {
                    sessionStorage.removeItem("token");
                }
            }
        }
    });
    const logInRef = (0, react_1.useRef)(logIn);
    (0, react_1.useEffect)(() => {
        logInRef.current();
    }, []);
    if (!viewer.didRequest && !error) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { backgroundColor: "#fefae0" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "rectangular", animation: "wave", width: "100%", height: "50px" }, void 0), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { textAlign: "center" } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: "primary" }, void 0) }), void 0)] }), void 0));
    }
    const LogInError = error ? ((0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "We weren't able to verify you were logged in. Please try again!" }, void 0)) : null;
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [LogInError, (0, jsx_runtime_1.jsx)(sections_1.AppHeader, { viewer: viewer, setViewer: setViewer }, void 0), (0, jsx_runtime_1.jsx)("main", Object.assign({ className: 'mainPanel' }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(sections_1.Home, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/teach", element: (0, jsx_runtime_1.jsx)(sections_1.Teach, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/catalog", element: (0, jsx_runtime_1.jsx)(sections_1.Catalogue, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/lesson/:id", element: (0, jsx_runtime_1.jsx)(sections_1.Lesson, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/lessons/:filter?", element: (0, jsx_runtime_1.jsx)(sections_1.Lessons, { title: "Plato's Peach" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/user/:id", children: (props) => ((0, jsx_runtime_1.jsx)(sections_1.User, Object.assign({}, props, { viewer: viewer }), void 0)), element: (0, jsx_runtime_1.jsx)(sections_1.User, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/terms", element: (0, jsx_runtime_1.jsx)(sections_1.Terms, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/privacy", element: (0, jsx_runtime_1.jsx)(sections_1.Privacy, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", children: (props) => ((0, jsx_runtime_1.jsx)(sections_1.Login, Object.assign({}, props, { setViewer: setViewer }), void 0)), element: (0, jsx_runtime_1.jsx)(sections_1.Login, { setViewer: setViewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/playlist/:id", element: (0, jsx_runtime_1.jsx)(sections_1.Playlist, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/playlist/create", element: (0, jsx_runtime_1.jsx)(sections_1.CreatePlaylist, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/quiz/:id", element: (0, jsx_runtime_1.jsx)(sections_1.Quiz, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/quiz/create", element: (0, jsx_runtime_1.jsx)(sections_1.QuizCreate, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/edit/:id", element: (0, jsx_runtime_1.jsx)(sections_1.EditPlaylist, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/lesson/create", children: (props) => ((0, jsx_runtime_1.jsx)(sections_1.CreateLesson, Object.assign({}, props, { viewer: viewer }), void 0)), element: (0, jsx_runtime_1.jsx)(sections_1.CreateLesson, { viewer: viewer }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { element: (0, jsx_runtime_1.jsx)(sections_1.NotFound, {}, void 0) }, void 0)] }, void 0) }), void 0)] }, void 0));
};
const removeTypenameFromMutation = (operation, forward) => {
    var _a, _b;
    const definition = (_b = (_a = operation === null || operation === void 0 ? void 0 : operation.query) === null || _a === void 0 ? void 0 : _a.definitions.filter((def) => def.kind === 'OperationDefinition')) === null || _b === void 0 ? void 0 : _b[0];
    const mutation = 'mutation';
    if ((definition === null || definition === void 0 ? void 0 : definition.kind) == 'OperationDefinition' && (definition === null || definition === void 0 ? void 0 : definition.operation) === mutation) {
        operation.variables = (0, omit_deep_lodash_1.default)(operation.variables, '__typename');
        return forward(operation);
    }
    return forward(operation);
};
exports.removeTypenameFromMutation = removeTypenameFromMutation;
const removeTypenameFromMutationLink = new client_1.ApolloLink(removeTypenameFromMutation);
exports.removeTypenameFromMutationLink = removeTypenameFromMutationLink;
const httpLink = (0, client_1.createHttpLink)({
    uri: '/api'
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            "X-CSRF-TOKEN": token || ""
        }
    };
});
const client = new client_1.ApolloClient({
    link: (0, client_1.from)([removeTypenameFromMutationLink, authLink.concat(httpLink)]),
    cache: new client_1.InMemoryCache(),
});
react_dom_1.default.render((0, jsx_runtime_1.jsxs)(styles_1.ThemeProvider, Object.assign({ theme: theme_1.default }, { children: [(0, jsx_runtime_1.jsx)(client_1.ApolloProvider, Object.assign({ client: client }, { children: (0, jsx_runtime_1.jsx)(App, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}, void 0)] }), void 0), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
