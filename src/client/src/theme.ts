import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
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
      main: "#e3f2fd"
    }
  },
});

export default theme;
