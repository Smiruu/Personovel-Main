import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import { bookListReducer } from './reducers/bookReducers';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';
import { genreListReducer } from './reducers/genreReducers';
import { interactionListReducer, interactionDetailsReducer } from './reducers/interactionReducers'; 
import { authorListReducer } from './reducers/authorReducers';
import { feedbackReducer } from './reducers/feedbackReducers';
import { bookDetailsReducer } from './reducers/bookReducers';
import { otpReducer } from './reducers/otpReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    genreList: genreListReducer,
    interactionList: interactionListReducer,
    interactionDetails: interactionDetailsReducer, 
    authorList: authorListReducer,
    feedback: feedbackReducer,
    bookDetails: bookDetailsReducer,
    otp: otpReducer, 
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userRegister: {userInfo: userInfoFromStorage},
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
