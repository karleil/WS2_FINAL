import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomeScreen() {
    const [apiData, setApiData] = useState([]); // Data fetched from the API
    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    useEffect(() => {
        async function getMusicData() {
            const music = await fetch(
                "https://www.theaudiodb.com/api/v1/json/2/album.php?i=137425"
            );
            const response = await music.json();
            setApiData(response.album);
        }

        getMusicData();
    }, []);

    const searchAlbums = () => {
        const filteredAlbums = apiData.filter(album =>
            album.strAlbum.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setApiData(filteredAlbums);
    };

    const toggleFavourite = (album) => {
        const updatedFavourites = favourites.includes(album.idAlbum)
            ? favourites.filter(favId => favId !== album.idAlbum)
            : [...favourites, album.idAlbum];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return (
        <div className=''>
            <input
                type="text"
                placeholder="Search for an album"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={searchAlbums}>Search</button>
            
                {apiData.map(album => (
                    <div className='m-20' key={album.idAlbum}>
                        <div className=''>
                            
                        </div>
                        <p className='2-10'>{album.strAlbum}</p>
                
                    <div>
                        <button onClick={() => toggleFavourite(album)} className='bg-orange-200 px-1 rounded-xl'>{favourites.includes(album.idAlbum) ? 'Unfavourite' : 'Add to Favourites'}</button>
                    </div>
                    </div>
                ))}
        </div>
    );
}

export default HomeScreen;

