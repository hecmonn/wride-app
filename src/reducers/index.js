import {combineReducers} from 'redux';
import users from './users';
import auth from './auth';
import newsfeed from './newsfeed';
import profile from './profile';
import follow from './follow';
import followers from './followers';
import likes from './likes';
import notifications from './notifications';
import search from './search';
import settings from './settings';
import collection from './collection';
import fb from './fb';
import modal from './modal';
import drafts from './drafts';
import options from './options';

export const rootReducer=combineReducers({
    users,
    auth,
    newsfeed,
    profile,
    follow,
    followers,
    likes,
    notifications,
    search,
    settings,
    collection,
    fb,
    modal,
    drafts,
    options
});
