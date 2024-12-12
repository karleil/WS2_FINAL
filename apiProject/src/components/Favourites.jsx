import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favourites() {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        async function fetchAlbums() {
            const albumData = await Promise.all(
                favourites.map(id =>
                    fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`)
                        .then(response => response.json())
                        .then(data => data.album ? data.album[0] : null)
                )
            );
            setAlbums(albumData.filter(album => album !== null));
        }
        if (favourites.length) fetchAlbums();
    }, [favourites]);

    const removeFavourite = (albumId) => {
        const updatedFavourites = favourites.filter(favId => favId !== albumId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (albums.length === 0) {
        return (
            <div>
                <h1>No Favourite Albums Yet</h1>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Favourite Albums</h1>
            <ul>
                {albums.map(album => (
                    <li key={album.idAlbum}>
                        <Link to={`/album/${album.idAlbum}`}>{album.strAlbum}</Link>
                        <button onClick={() => removeFavourite(album.idAlbum)}>Remove Favourite</button>
                    </li>
                ))}
            </ul>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Favourites;
