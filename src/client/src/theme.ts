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
      // Peach
      main: "#FBC490",
    },
    error: {
      // Scarlet
      main: "#A82810",
    },
  },
});

export default theme;
