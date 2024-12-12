import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
 
function DetailScreen() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
 
    useEffect(() => {
        fetch(`https://ghibliapi.vercel.app/films/${id}`)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, []);
 
    if (!movie) {
        return <div>Loading...</div>;
    }
 
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Producer:</strong> {movie.producer}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rotten Tomatoes Score:</strong> {movie.rt_score}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );  
}
 
export default DetailScreen;