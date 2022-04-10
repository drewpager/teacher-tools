import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#5560b9',
    },
    secondary: {
      main: '#FFE5B4',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
