import React from "react";

import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";

import themes from "@style/theme";

import router from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={themes.dark}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
