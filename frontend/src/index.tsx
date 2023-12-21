import React from "react";
import ReactDOM from "react-dom/client";
import { App as AntdApp, ConfigProvider } from "antd";

import App from "./App";
import { DEFAULT_THEME } from "./constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={DEFAULT_THEME}>
      <AntdApp notification={{placement: 'bottomLeft'}}>
        <App />
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);
