import React, { PropTypes } from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './src/components';

const store= createStore(
    null
    ,compose(
        applyMiddleware(thunkMiddleware)
    )
)

const Main = React.createClass({
    render () {
        return (
            <App />
        )
    }
})

AppRegistry.registerComponent('wrideApp', () => Main);
