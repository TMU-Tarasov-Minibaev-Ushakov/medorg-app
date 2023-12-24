import React from "react";
import ReactDOM from "react-dom/client";
import {App as AntdApp, ConfigProvider, theme} from "antd";

import App from "./App";
import { DEFAULT_THEME } from "./constants";
import {ThemeProvider} from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const StyledComponentsThemeProvider = ({ children }: any) => {
    const { token: themeToken } = theme.useToken();
    return (
        <ThemeProvider theme={themeToken}>
            {children}
        </ThemeProvider>
    )
};

root.render(
  <React.StrictMode>
    <ConfigProvider theme={DEFAULT_THEME}>
        <StyledComponentsThemeProvider>
          <AntdApp notification={{placement: 'bottomLeft'}}>
            <App />
          </AntdApp>
        </StyledComponentsThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
