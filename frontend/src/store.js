import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { bookListReducer } from './reducers/bookReducers';import { combineReducers } from 'redux';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';
import { genreListReducer } from './reducers/genreReducers';
import { interactionListReducer } from './reducers/interactionReducers';
import { interactionDetailsReducer } from './reducers/interactionReducers';
import { authorListReducer } from './reducers/authorReducers';
import { feedbackReducer } from './reducers/feedbackReducers';
import { profileReducer } from './reducers/profileReducer';

const reducer = combineReducers({
    bookList: bookListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer, 
    genreList: genreListReducer,
    interactionList: interactionListReducer,
    interactionDetails: interactionDetailsReducer,
    authorList: authorListReducer,
    feedback: feedbackReducer,
    profile: profileReducer, 
    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const initalState = {
    userLogin: { userInfo: userInfoFromStorage }
}


const store = configureStore({
    reducer, 
    preloadedState:initalState, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
})

export default store