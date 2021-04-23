import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import articles from './articles/index.js';
import user from './user/index.js';

const reducer = combineReducers({
    articles,
    user
})

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
