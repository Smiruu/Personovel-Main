import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import { userRegisterReducer } from './reducers/registerReducers';
import { checkPaidStatusreducer, userListReducer, userLoginReducer,  userUpdatePaidReducer, } from './reducers/userReducers';
import { genreListReducer, genreCreateReducer, genreUpdateReducer, genreDeleteReducer } from './reducers/genreReducers';
import { interactionListReducer, interactionDetailsReducer, interactionListByBookReducer, interactionCreateReducer, interactionDeleteReducer, interactionUpdateReducer} from './reducers/interactionReducers'; 
import { authorListReducer, authorDetailsReducer, authorCreateReducer, authorDeleteReducer, authorUpdateReducer} from './reducers/authorReducers';
import { feedbackReducer, feedbackListReducer, feedbackDeleteReducer } from './reducers/feedbackReducers';
import { bookListReducer, bookCreateReducer, bookDetailsReducer, bookDeleteReducer, bookUpdateReducer } from './reducers/bookReducers';

import searchReducer from './reducers/searchReducers';
import { otpReducer, verifyOtpReducer } from './reducers/otpReducers';
import {ConfirmChangePasswordReducer, SendChangePasswordReducer} from './reducers/resetpasswordReducers'
import {
    createRatingReducer,
    deleteRatingReducer,
    fetchRatingReducer,
    getRatingIdReducer,
    updateRatingReducer,
    fetchMeanRatingsReducer,
  } from "./reducers/ratingReducers";
  import { userDetailsReducer, userProfileByIdReducer, userProfileUpdateReducer } from "./reducers/profileReducers";
  import preferenceReducer from './reducers/preferenceReducers'; 
import { CommentandReplyUserReducer, commentReducer, createReplyReducer } from './reducers/commentReducers';
import favoriteReducer from './reducers/favoriteReducers';

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    search: searchReducer,
    otp: otpReducer, 
    verifyOtp: verifyOtpReducer,
    changePassword: SendChangePasswordReducer,
    confirmChangePasswordReducer: ConfirmChangePasswordReducer,    
    userUpdatePaid: userUpdatePaidReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    checkPaid: checkPaidStatusreducer,
    userList: userListReducer,
    userProfileById: userProfileByIdReducer,

    fetchRating: fetchRatingReducer,
    createRating: createRatingReducer,
    deleteRating: deleteRatingReducer,
    updateRating: updateRatingReducer,
    getRatingId: getRatingIdReducer,
    fetchMeanRatings: fetchMeanRatingsReducer,

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

    preference: preferenceReducer,

    comment: commentReducer,
    createReply: createReplyReducer,
    CommentandReplyUser: CommentandReplyUserReducer,

    favorite: favoriteReducer,
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
