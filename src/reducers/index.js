import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import newsfeed from './newsfeed';
import profile from './profile';
import follow from './follow';
export const rootReducer=combineReducers({
    users,
    auth,
    newsfeed,
    profile,
    follow
});
