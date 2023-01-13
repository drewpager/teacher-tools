"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const QuizCreate_1 = require("../QuizCreate");
require("./modal.scss");
const UseModal = ({ viewer }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleOpen, className: "modal--button" }, { children: "Add Assessment Questions" }), void 0), (0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: "modal" }, { children: (0, jsx_runtime_1.jsx)(QuizCreate_1.QuizCreate, { viewer: viewer }, void 0) }), void 0) }), void 0)] }, void 0));
};
exports.UseModal = UseModal;
