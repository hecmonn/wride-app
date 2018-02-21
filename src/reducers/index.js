import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import newsfeed from './newsfeed'
export const rootReducer=combineReducers({
    users,
    auth,
    newsfeed
});
