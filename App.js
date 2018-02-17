import React, {Component} from 'react';
import { AppRegistry,AsyncStorage } from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {rootReducer} from './src/reducers';
import Main from './src/components';

const store=createStore(
  rootReducer
  ,compose(
    applyMiddleware(thunkMiddleware)
  )
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
