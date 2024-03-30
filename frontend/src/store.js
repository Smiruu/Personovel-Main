import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import { bookListReducer, bookCreateReducer, bookDetailsReducer, bookDeleteReducer, bookUpdateReducer } from './reducers/bookReducers';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';
import { genreListReducer, genreCreateReducer, genreUpdateReducer, genreDeleteReducer } from './reducers/genreReducers';
import { interactionListReducer, interactionDetailsReducer, interactionListByBookReducer, interactionCreateReducer, interactionDeleteReducer, interactionUpdateReducer} from './reducers/interactionReducers'; 
import { authorListReducer, authorDetailsReducer, authorCreateReducer, authorDeleteReducer, authorUpdateReducer} from './reducers/authorReducers';
import { feedbackReducer, feedbackListReducer, feedbackDeleteReducer } from './reducers/feedbackReducers';
import searchReducer from './reducers/searchReducers';
import { otpReducer } from './reducers/otpReducers';

const reducer = combineReducers({
    
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    otp: otpReducer, 
    search: searchReducer,

    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    bookCreate: bookCreateReducer,
    bookUpdate: bookUpdateReducer,
    bookDelete: bookDeleteReducer,

    genreList: genreListReducer,
    genreCreate: genreCreateReducer,
    genreUpdate: genreUpdateReducer,
    genreDelete: genreDeleteReducer,

    interactionListByBook: interactionListByBookReducer,
    interactionList: interactionListReducer,
    interactionDetails: interactionDetailsReducer, 
    interactionCreate : interactionCreateReducer,
    interactionDelete: interactionDeleteReducer,
    interactionUpdate: interactionUpdateReducer,
    

    feedback: feedbackReducer,
    feedbackList: feedbackListReducer,
    feedbackDelete: feedbackDeleteReducer,

    authorList: authorListReducer,
    authorDetails: authorDetailsReducer,
    authorCreate: authorCreateReducer,
    authorDelete: authorDeleteReducer,
    authorUpdate: authorUpdateReducer,


});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: {userInfo: userInfoFromStorage},
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
