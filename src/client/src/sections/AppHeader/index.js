"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const generated_1 = require("../../graphql/generated");
const material_1 = require("@mui/material");
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const utils_1 = require("../../lib/utils");
const react_router_dom_1 = require("react-router-dom");
// import { ReactComponent as PlatosPeachIcon } from '../../lib/assets/platos-peach-logo.svg';
const peach_logo_svg_1 = require("../../lib/assets/peach-logo.svg");
const theme_1 = __importDefault(require("../../theme"));
require("./appHeader.scss");
const AppHeader = ({ viewer, setViewer }) => {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const [logOut] = (0, generated_1.useLogOutMutation)({
        onCompleted: (data) => {
            if (data && data.logOut) {
                setViewer(data.logOut);
                sessionStorage.removeItem("token");
                navigate("/login");
                return ((0, jsx_runtime_1.jsx)(utils_1.DisplaySuccess, { title: "You've Successfully logged out!" }, void 0));
            }
        }
    });
    const [anchorElNav, setAnchorElNav] = (0, react_1.useState)(null);
    const [anchorElUser, setAnchorElUser] = (0, react_1.useState)(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogOut = () => {
        logOut();
    };
    const HomeIcon = () => {
        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)(material_1.SvgIcon, { component: peach_logo_svg_1.ReactComponent, inheritViewBox: true, sx: { fontSize: 65, color: `${theme_1.default.palette.info.main}` } }, void 0) }), void 0));
    };
    return ((0, jsx_runtime_1.jsx)(material_1.AppBar, { children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, { children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ size: "small", edge: "start", color: "info", "aria-label": "home" }, { children: (0, jsx_runtime_1.jsx)(HomeIcon, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h1", className: "nav--title" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/", style: { color: `${theme_1.default.palette.secondary.light}`, textDecoration: "none", fontSize: 32, fontWeight: 800 } }, { children: "Plato's Peach" }), void 0) }), void 0), viewer && viewer.avatar ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "User Settings" }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: handleOpenUserMenu, sx: { p: 0 } }, { children: (0, jsx_runtime_1.jsx)(material_1.Avatar, { alt: "logged in user avatar", src: viewer.avatar }, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsxs)(material_1.Menu, Object.assign({ sx: { mt: '45px' }, id: "menu-appbar", anchorEl: anchorElUser, anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }, keepMounted: true, transformOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }, open: Boolean(anchorElUser), onClose: handleCloseUserMenu, className: "header--menu" }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ onClick: handleCloseUserMenu }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/user/${viewer.id}`, style: { textDecoration: "none", color: `${theme_1.default.palette.primary.light}` } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ textAlign: "center", sx: { color: `${theme_1.default.palette.primary.light}` } }, { children: "Profile" }), void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: '/catalog', style: { textDecoration: 'none' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ textAlign: "center", sx: { color: `${theme_1.default.palette.primary.light}` } }, { children: "Catalog" }), void 0) }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ onClick: handleLogOut }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ textAlign: "center", sx: { color: `${theme_1.default.palette.primary.light}` } }, { children: "Logout" }), void 0) }), void 0)] }), void 0)] }, void 0)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ size: "large", "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", onClick: handleOpenNavMenu, color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/login`, style: { textDecoration: "none" } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "login--button" }, { children: "Login" }), void 0) }), void 0)] }, void 0))] }, void 0) }, void 0));
};
exports.AppHeader = AppHeader;
