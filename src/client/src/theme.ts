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
