import React from 'react';
import ReactDOM from 'react-dom';
import '@src/assets/less/normal.less';
import '@src/assets/less/global.less';
import BasicRoute from '@src/router/index.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BasicRoute/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
