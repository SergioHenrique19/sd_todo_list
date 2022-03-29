import { ConfigProvider } from 'antd';
import 'antd/dist/antd.min.css';
import locale from 'antd/lib/locale/pt_BR';
import 'moment/locale/pt-br';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from 'screens/Home';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
