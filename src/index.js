import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Pages/Main';
import { ConfigProvider } from 'antd';
// import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
// moment.locale(locale)

ReactDOM.render(
  <React.Fragment>
    <ConfigProvider locale={locale}>
      <Main />
    </ConfigProvider>
  </React.Fragment>,
  document.getElementById('root')
);
