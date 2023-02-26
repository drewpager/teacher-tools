import { createTheme } from "@mui/material/styles";

export const colors = {
  grey: {
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
  },
  primary: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    450: "#BC4710",
    500: "#141b2d",
    550: "#FAF9F6",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  greenAccent: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },
  redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },
  blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },
};

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 18,
    },
    h6: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
    },
  },
  palette: {
    // palette values for dark mode
    primary: {
      // Dark
      main: colors.primary[500],
      // Orange
      light: colors.primary[450],
    },
    secondary: {
      main: colors.greenAccent[500],
    },
    info: {
      dark: colors.grey[700],
      main: colors.grey[500],
      // White
      light: colors.primary[550],
    },
    background: {
      default: colors.primary[500],
    },
    error: {
      main: colors.primary[450],
    },
    // primary: {
    //   // main: '#5560b9',
    //   // Coral https://www.canva.com/colors/color-palettes/toasted-peach/
    //   main: "#F67B50",
    //   light: "#283618",
    //   // Testing new palette
    //   // brown: "#bc6c25"
    //   // peachy: "#dda15e"
    //   // white: "#fefae0"
    //   // darkGreen: "#283618"
    //   // lightGreen: "#606c38"
    // },
    // secondary: {
    //   // main: '#FFE5B4',
    //   // White-ish
    //   light: "#fefae0",
    //   // Peachy
    //   main: "#dda15e",
    // },
    // error: {
    //   // Brown
    //   main: "#bc6c25",
    // },
    // info: {
    //   // lightGreen
    //   main: "#606c38",
    // },
  },
});

export default theme;
