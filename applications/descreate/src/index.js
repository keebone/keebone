import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'; // 导入全局的 i18n 配置
//import { I18nextProvider } from 'react-i18next';
//import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import localDB from './indexedDB/localDB';
import keeBone from './utils/index';

window.$localDB = localDB;
window.$keeBone = keeBone;

//const { t } = useTranslation();

//window.$t = t


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
