import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import { bookListReducer } from './reducers/bookReducers';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';
import { genreListReducer } from './reducers/genreReducers';
import { interactionListReducer, interactionDetailsReducer } from './reducers/interactionReducers'; // Combine these reducers
import { authorListReducer } from './reducers/authorReducers';
import { feedbackReducer } from './reducers/feedbackReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    genreList: genreListReducer,
    interactionList: interactionListReducer,
    interactionDetails: interactionDetailsReducer, // Include interactionDetails here
    authorList: authorListReducer,
    feedback: feedbackReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
