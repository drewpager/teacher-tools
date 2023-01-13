"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
function DisplayError({ title }) {
    const [error, setError] = (0, react_1.useState)(true);
    const handleClose = () => {
        setError(false);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Snackbar, Object.assign({ open: error, autoHideDuration: 6000, onClose: handleClose }, { children: (0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ onClose: handleClose, severity: "error", sx: { width: '100%' } }, { children: title }), void 0) }), void 0) }, void 0));
}
exports.DisplayError = DisplayError;
