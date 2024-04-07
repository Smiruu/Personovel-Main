import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../actions/favoriteActions'; // Import fetchFavorites action

const FavoritesList = ({ userId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavorites(userId)); // Dispatch the fetchFavorites action with the userId
    }, [dispatch, userId]);

    const favoriteBooks = useSelector(state => state.favoriteBooks);
    console.log (favoriteBooks); // Correctly access favoriteBooks from the state
    
    return (
        <div>
            <h2>Favorite Books</h2>
            <ul>
                {favoriteBooks && favoriteBooks.map(book => (
                    <li key={book._id}> {/* Assuming _id is the unique identifier for each book */}
                        <strong>{book.title}</strong> by {book.author} (Genre: {book.genre})
                        <br />
                        Mean Rating: {book.mean_rating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;
