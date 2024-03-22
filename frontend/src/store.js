import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import { bookListReducer } from './reducers/bookReducers';
import { userRegisterReducer } from './reducers/registerReducers';
import { userLoginReducer } from './reducers/userReducers';
import { genreListReducer } from './reducers/genreReducers';
import { interactionListReducer, interactionDetailsReducer, interactionListByBookReducer} from './reducers/interactionReducers'; 
import { authorListReducer } from './reducers/authorReducers';
import { feedbackReducer } from './reducers/feedbackReducers';
import { bookDetailsReducer } from './reducers/bookReducers';
import searchReducer from './reducers/searchReducers';
import { otpReducer } from './reducers/otpReducers';
import { createRatingReducer, deleteRatingReducer, fetchRatingReducer, getRatingIdReducer, updateRatingReducer, fetchMeanRatingsReducer } from './reducers/ratingReducers';

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
    search: searchReducer,
    otp: otpReducer, 
    fetchRating: fetchRatingReducer,
    createRating : createRatingReducer,
    deleteRating : deleteRatingReducer,
    updateRating  : updateRatingReducer,
    getRatingId : getRatingIdReducer,
    fetchMeanRatings : fetchMeanRatingsReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const currentRatingFromStorage = localStorage.getItem('CurrentRating') ? JSON.parse(localStorage.getItem('CurrentRating')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: {userInfo: userInfoFromStorage},
    ratings: {ratings: currentRatingFromStorage}
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
