import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { bookListReducer } from './reducers/bookReducers';import { combineReducers } from 'redux';

const reducer = combineReducers({
    bookList: bookListReducer,
})

const initalState = {}

const middleware = [thunk]

const store = configureStore({
    reducer, 
    initalState, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware), 
})

export default store