import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { bookListReducer } from './reducers/bookReducers';import { combineReducers } from 'redux';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const reducer = combineReducers({
    bookList: bookListReducer,
    userLogin: userLoginReducer,  
});

const userInfoFromStorage = localStorage.getItem('userinfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


export default store