import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import newsfeed from './newsfeed';
import profile from './profile';
import follow from './follow';
import followers from './followers';
import likes from './likes';
import notifications from './notifications';
export const rootReducer=combineReducers({
    users,
    auth,
    newsfeed,
    profile,
    follow,
    followers,
    likes,
    notifications
});
