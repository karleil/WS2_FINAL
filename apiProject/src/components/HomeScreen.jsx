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
                "https://www.theaudiodb.com/api/v1/json/2/album.php?i=141347"
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
        <div className='bg-orange-100 pt-10'>
            <h1 className='text-center text-lime-900 font-bold text-6xl pb-4'>TWICE ALBUMS</h1>
            <div className='flex justify-center'>
                <input
                className='rounded-lg pl-1 py-1 border-2 border-lime-900'
                    type="text"
                    placeholder="Search for an album"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    />
                <button className='bg-lime-900 px-2 text-orange-200 text-lg ml-2 rounded' onClick={searchAlbums}>Search</button>
            </div>
            
                <div className='flex justify-center flex-wrap py-10'>

                
                {apiData.map(album => (
                    <div className=' bg-lime-900 rounded-xl p-4 w-[20%] mx-4 my-4 hover:scale-[105%] transition' key={album.idAlbum}>
                        <Link to={`/album/${album.idAlbum}`}>
                        <div className=''>
                            <img className='rounded' src={album.strAlbumThumb} alt="" />
                        </div>
                        </Link>
                        <p className='text-orange-200 font-bold text-3xl ml-2 mt-5 '>{album.strAlbum}</p>
                        <p className='text-white mb-5 ml-2'>({album.intYearReleased})</p>
                        <div className='flex justify-end'>
                            <button onClick={() => toggleFavourite(album)} className=' bg-orange-200 px-2 py-1 text-lime-900 font-bold rounded-xl hover:text-green-950 hover:bg-green-200 hover:scale-[105%] transition'>{favourites.includes(album.idAlbum) ? 'Unfavourite' : 'Add to Favourites'}</button>
                        </div>
                    <div>
                    </div>
                    </div>
                ))}
                </div>
        </div>
    );
}

export default HomeScreen;

