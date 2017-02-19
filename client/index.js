import 'babel-polyfill';
require('file-loader?name=index.html!./index.html');
// require('file-loader?name=socket/index.js!./socket/index.js');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Layout from "./src";

const dom = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  dom
);
