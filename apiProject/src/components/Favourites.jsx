import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
function Favourites() {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [movies, setMovies] = useState([]);
 
    useEffect(() => {
        fetch('https://ghibliapi.vercel.app/films')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);
 
    const favouriteMovies = movies.filter(movie => favourites.includes(movie.id));
 
    const removeFavourite = (movieId) => {
        const updatedFavourites = favourites.filter(favId => favId !== movieId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };
 
    if (favouriteMovies.length === 0) {
        return (
            <div>
                <h1>No Favourite Movies Yet</h1>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }
 
    return (
        <div>
            <h1>Favourite Movies</h1>
            <ul>
                {favouriteMovies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/detail/${movie.id}`}>{movie.title}</Link>
                        <button onClick={() => removeFavourite(movie.id)}>Remove Favourite</button>
                    </li>
                ))}
            </ul>
            <Link to="/">Back to Home</Link>
        </div>
    );
}
 
export default Favourites;