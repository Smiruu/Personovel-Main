import { GENRE_LIST_REQUEST, GENRE_LIST_SUCCESS, GENRE_LIST_FAIL, GENRE_DETAILS_FAIL, GENRE_DETAILS_SUCCESS, GENRE_DETAILS_REQUEST} from '../constants/genreConstants';
import axios from 'axios';


export const listGenres = () => async (dispatch) => {
    try {
        dispatch({ type: GENRE_LIST_REQUEST })
        const { data } = await axios.get('http://127.0.0.1:8000/api/genres/')
        dispatch({
            type: GENRE_LIST_SUCCESS,
            payload: data
        
        })
    } catch (error) {
        dispatch({ 
            type: GENRE_DETAILS_FAIL, 
            payload: 
            error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
         });
    }


}