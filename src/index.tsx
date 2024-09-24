import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterProvider from "./containers/providers/routerProvider/RouterProvider";
import { Provider } from "react-redux";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import store from "./redux/store";
import muiTheme from "./styles/muiTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <RouterProvider />
      </MuiThemeProvider>
    </Provider>
  </StrictMode>
);
