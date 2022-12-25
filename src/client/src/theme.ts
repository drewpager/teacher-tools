import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
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

      // Possible new palette
      // brown: "#bc6c25"
      // peachy: "#dda15e"
      // white: "#fefae0"
      // darkGreen: "#283618"
      // lightGreen: "#606c38"
    },
    secondary: {
      // main: '#FFE5B4',
      // White
      light: "#e3f2fd",
      // Peach
      main: "#FBC490",
    },
    error: {
      // Scarlet
      main: "#A82810",
    },
    info: {
      main: "#e3f2fd",
    },
  },
});

export default theme;
