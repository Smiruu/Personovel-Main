import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { bookListReducer } from './reducers/bookReducers';import { combineReducers } from 'redux';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userinfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const initalState = {
    userLogin: { userInfo: userInfoFromStorage }
}


const store = configureStore({
    reducer, 
    initalState, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
})

export default store