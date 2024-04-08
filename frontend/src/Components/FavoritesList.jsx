import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../actions/favoriteActions'; // Import fetchFavorites action

const FavoritesList = ({ userId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavorites(userId)); // Dispatch the fetchFavorites action with the userId
    }, [dispatch, userId]);

    const favoriteBooks = useSelector(state => state.favorite.favoriteBooks);
    
    console.log (favoriteBooks); // Correctly access favoriteBooks from the state
    
    return (
        <div>
            <h2>Favorite Books</h2>
            <ul>
                {favoriteBooks && favoriteBooks.map(book => (
                    <li key={book._id}> {/* Assuming _id is the unique identifier for each book */}
                        <img src={book.image} alt={book.title} style={{ width: '100px', height: '150px' }} />
                        <strong>{book.title}</strong> by {book.author} (Genre: {book.genre})
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;