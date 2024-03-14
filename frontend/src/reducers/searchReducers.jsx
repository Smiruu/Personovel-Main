import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/searchConstants'

const initialState = {
    loading: false,
    results: [],
    error: null,
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SEARCH_SUCCESS:
        return {
          ...state,
          loading: false,
          results: action.payload,
          error: null,
        };
      case SEARCH_FAILURE:
        return {
          ...state,
          loading: false,
          results: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchReducer;