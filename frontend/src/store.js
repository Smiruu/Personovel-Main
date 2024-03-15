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
import { interactionListByBookReducer } from './reducers/interactionReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    genreList: genreListReducer,
    interactionListByBook: interactionListByBookReducer,
    interactionList: interactionListReducer,
    interactionDetails: interactionDetailsReducer, 
    authorList: authorListReducer,
    feedback: feedbackReducer,
    bookDetails: bookDetailsReducer,
   

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
