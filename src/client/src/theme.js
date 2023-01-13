"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@mui/material/styles");
// A custom theme for this app
const theme = (0, styles_1.createTheme)({
    typography: {
        h1: {
            fontFamily: ['"Archivo Black"', "-apple-system"].join(","),
            fontSize: 20,
        },
        h2: {
            fontFamily: ['"Archivo Black"', "-apple-system"].join(","),
        },
    },
    palette: {
        primary: {
            // main: '#5560b9',
            // Coral https://www.canva.com/colors/color-palettes/toasted-peach/
            main: "#F67B50",
            light: "#283618"
            // Testing new palette
            // brown: "#bc6c25"
            // peachy: "#dda15e"
            // white: "#fefae0"
            // darkGreen: "#283618"
            // lightGreen: "#606c38"
        },
        secondary: {
            // main: '#FFE5B4',
            // White-ish
            light: "#fefae0",
            // Peachy
            main: "#dda15e",
        },
        error: {
            // Brown
            main: "#bc6c25",
        },
        info: {
            // lightGreen
            main: "#606c38",
        },
    },
});
exports.default = theme;
