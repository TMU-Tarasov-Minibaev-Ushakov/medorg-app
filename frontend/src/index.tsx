import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';
import { defaultTheme } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode> 
    <ConfigProvider theme={defaultTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);