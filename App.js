import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
//import Home from './src/components/Home';
//import {rootReducer} from './src/reducers';
import Main from './src/components';

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}
