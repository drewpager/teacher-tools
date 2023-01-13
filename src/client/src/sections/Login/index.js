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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_hooks_1 = require("@apollo/react-hooks");
const index_1 = require("../../lib/graphql/queries/AuthUrl/index");
const generated_1 = require("../../graphql/generated");
const react_router_dom_1 = require("react-router-dom");
const utils_1 = require("../../lib/utils");
require("./login.scss");
const Login = ({ setViewer }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(true);
    const client = (0, react_hooks_1.useApolloClient)();
    const [logIn, { data: Mutation, loading: LogInLoading, error: LogInError }] = (0, generated_1.useLogInMutation)({
        onCompleted: data => {
            if (data && data.logIn && data.logIn.token) {
                setViewer(data.logIn);
                sessionStorage.setItem("token", data.logIn.token);
                return ((0, jsx_runtime_1.jsx)(utils_1.DisplaySuccess, { title: "You've successfully logged in!" }, void 0));
            }
        },
        onError: error => {
            if (error) {
                setError(true);
            }
        }
    });
    const logInRef = (0, react_1.useRef)(logIn);
    (0, react_1.useEffect)(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            });
        }
    }, []);
    const handleAuthorize = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield client.query({
                query: index_1.AUTH_URL
            });
            window.location.href = data.authUrl;
        }
        catch (_a) {
            setError(true);
        }
    });
    if (Mutation && Mutation.logIn) {
        const { id: viewerId } = Mutation.logIn;
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: `/user/${viewerId}` }, void 0), (0, jsx_runtime_1.jsx)(utils_1.DisplaySuccess, { title: "Logged in successfully!" }, void 0)] }, void 0));
    }
    const handleClose = () => {
        setOpen(false);
    };
    if (LogInLoading) {
        return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { margin: 50 } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: "primary" }, void 0) }), void 0));
    }
    const LogInCard = ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: "login--box" }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ className: "login--card" }, { children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h4", className: 'login--text' }, { children: "Login to Teacher Tools" }), void 0), (0, jsx_runtime_1.jsx)(material_1.CardActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "login--button", onClick: handleAuthorize, size: "small" }, { children: "Sign In With Google!" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ sx: { fontStyle: 'italic' } }, { children: "Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account." }), void 0)] }, void 0) }), void 0) }), void 0));
    if (LogInError) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [LogInCard, (0, jsx_runtime_1.jsx)(utils_1.DisplayError, { title: "Error Logging In!" }, void 0)] }, void 0));
    }
    // if (open) {
    //   return (
    //     <Box>
    //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //           Logged In Successfully!
    //         </Alert>
    //       </Snackbar>
    //     </Box>
    //   )
    // }
    if (document.location.href.indexOf("user") > -1) {
        return ((0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Snackbar, Object.assign({ open: open, autoHideDuration: 6000, onClose: handleClose }, { children: (0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ onClose: handleClose, severity: "success", sx: { width: '100%' } }, { children: "Logged In Successfully!" }), void 0) }), void 0) }, void 0));
    }
    return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { minWidth: 275, width: 500, height: 500, margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Card, Object.assign({ className: "login--card" }, { children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h4", color: "text.secondary" }, { children: "Login to Plato's Peach" }), void 0), (0, jsx_runtime_1.jsx)(material_1.CardActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "login--button", onClick: handleAuthorize, size: "small" }, { children: "Sign In With Google!" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ sx: { fontStyle: 'italic' } }, { children: "Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account." }), void 0)] }, void 0) }), void 0) }), void 0));
};
exports.Login = Login;
