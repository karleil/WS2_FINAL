import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function HomeScreen() {
    // this stores the list of albums fetched from the API.
    const [apiData, setApiData] = useState([]);

    // and this one stores the user's search input..
    const [searchTerm, setSearchTerm] = useState('');

    // this stores the albums that you added to your favourites.
    // also retrieves saved favourites from localStorage when the app is loaded.
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites'); 
        return savedFavourites ? JSON.parse(savedFavourites) : []; 
    });

    // this fetches the data from the API when the page mounts.
    useEffect(() => {
        async function getMusicData() {
            // this fetches data for Coldplay specifically using their ID.
            const music = await fetch(
                "https://www.theaudiodb.com/api/v1/json/2/album.php?i=111239"
            );
            const response = await music.json();
            setApiData(response.album); // updates the apiData state with the fetched album data.
        }

        getMusicData(); // Calls the getMusicData function to fetch data.
    }, []); // Empty dependency array ensures this effect runs only once (on mount)

    // this function filters albums based on the user's search input
    const searchAlbums = () => {
        // this function filters albums whose names matches the search term.
        const filteredAlbums = apiData.filter(album =>
            album.strAlbum.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setApiData(filteredAlbums); // updates the apiData with the filtered result.s
    };

    // this function adds or remove an album from the favourites list
    const toggleFavourite = (album) => {
        // checks if the album is already in the favourites
        const updatedFavourites = favourites.includes(album.idAlbum)
            ? favourites.filter(favId => favId !== album.idAlbum) // if it is, then it will remove it on call
            : [...favourites, album.idAlbum]; // if its not, then it will add it. 
        setFavourites(updatedFavourites); // updates the state of favourites
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // then saves the updated favourites to localStorage
    };

    
    return (
        <div className='bg-orange-100 pt-10'>
            <h1 className='text-center text-lime-950 font-bold text-6xl pb-4'>COLDPLAY ALBUMS</h1>
            <div className='flex justify-center'>
                <input className='rounded-lg pl-1 py-1 border-2 border-lime-900' type="text" placeholder="Search for an album" value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} 
                />
                <button className='bg-lime-900 px-2 text-orange-200 text-lg ml-2 rounded hover:scale-[110%] transition'
                    onClick={searchAlbums} //  this calls the searchAlbums function when clicked
                > Search
                </button>
            </div>

            
            <div className='grid grid-cols-1 place-items-center md:flex md:justify-center md:flex-wrap py-10'>
                {apiData.map(album => ( // maps over apiData to display each album with a single code block
                    <div
                        className='bg-lime-900 rounded-xl p-4 md:w-[20%] mx-4 my-4 hover:scale-[105%] transition'
                        key={album.idAlbum} // uses the albuim's id as their unique key identifyer.
                    >
                        {/* link to the album's detail page */}
                        <Link to={`/album/${album.idAlbum}`}>
                            <div>
                                {/* uses the album's image path as a src for the thumbnail */}
                                <img
                                    className='rounded'
                                    src={album.strAlbumThumb}
                                    alt={`${album.strAlbum}`}
                                />
                            </div>
                        </Link>
                        
                        {/* uses the text inside strAlbum and intYearReleased object as text */}
                        <p className='text-orange-200 font-bold text-xl ml-2 mt-5'>{album.strAlbum}</p>
                        <p className='text-white mb-5 ml-2'>({album.intYearReleased})</p>
                        
        
                        <div className='flex justify-end'>
                            <button
                                onClick={() => toggleFavourite(album)} // this toggles the favourite status on click
                                className='bg-orange-200 px-2 py-1 text-lime-900 font-bold rounded-xl hover:text-green-950 hover:bg-green-200 hover:scale-[105%] transition'
                            >
                                {/* this changes the text inside the button based on favourite's status */}
                                {favourites.includes(album.idAlbum) ? 'Unfavourite' : 'Add to Favourites'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;
