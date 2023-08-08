import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#fff",
    },
    // primary: amber,
    // divider: amber[200],
    // text: {
    //   primary: grey[900],
    //   secondary: grey[800],
    // },
  },
});

const themes = {
  dark: darkTheme,
};

export default themes;
