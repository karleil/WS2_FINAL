import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function Favourites() {
    // this tracks the list of favorite album IDs
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites'); // takes the favorites from localStorage.
        return savedFavourites ? JSON.parse(savedFavourites) : []; 
    });

    // this stores the detailed data of the favorite albums.
    const [albums, setAlbums] = useState([]);

    // this one fetches the album details when the favourites list changes.
    useEffect(() => {
        async function fetchAlbums() {
            const albumData = await Promise.all(
                favourites.map(id =>
                    fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`) //this calls to fetch the album details from the API.
                        .then(response => response.json()) // then converts the response to JSON
                        .then(data => data.album ? data.album[0] : null)
                )
            );
            setAlbums(albumData.filter(album => album !== null)); //sets the albums' state and filters out null values
        }

        // Fetch albums only if there are items in the favourites list
        if (favourites.length) fetchAlbums();
        }, [favourites]); // Dependency array ensures this runs whenever `favourites` changes

    // Function to remove an album from the favourites list
        const removeFavourite = (albumId) => {
            const updatedFavourites = favourites.filter(favId => favId !== albumId); // Remove the specified album ID from the list
            setFavourites(updatedFavourites); // Update the state with the new favourites list
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // Save the updated list to localStorage
        };

        // if there are no favourite albums saved, render this code block.
        if (albums.length === 0) {
            return (
                <div className='bg-orange-100 py-10'> {/* Main container with styling */}
                    <h1 className='text-center pt-5 text-5xl font-bold text-lime-950'>No Favourite Albums Yet</h1> {/* Heading */}
                    <p className='text-center text-2xl py-72'>
                        Browse our website for albums and add them to your Favourites!!! :))
                    </p>
                    <div className='flex justify-center'> {/* Centered button */}
                        <Link to="/"> {/* Link to navigate back to the home page */}
                            <button className='bg-lime-900 px-2 py-1 mt-20 text-orange-100 font-bold rounded-xl hover:scale-[105%] transition'>
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }

    // but if there is/are, render this code block instead.
    //same with HomePage and DetailScreen, uses the data from the API and renders it.
    //button changes the state of the favourites and removes it in localStorage.
    return (
        <div className='bg-orange-100 pb-10'> {/* Main container with background color */}
            <h1 className='text-3xl text-center md:text-left md:text-5xl font-bold text-lime-950 pt-10 pb-10 md:pl-20'>
                Favourite Albums
            </h1>
            {albums.map(album => (
                <div className='flex justify-center md:justify-start md:ml-52 mt-3 gap-4 bg-lime-900 w-[73%] m-auto md:w-[20%] px-2 py-3 rounded-xl'key={album.idAlbum}>

                    <Link to={`/album/${album.idAlbum}`}>
                        <img
                            className='w-32 md:w-24 rounded-xl'
                            src={album.strAlbumThumb}
                        />
                    </Link>

                    <div className='mt-8 md:mt-5 text-orange-200 ml-5 md:ml-9'>
                        <p className='pb-3 text-xl font-semibold'>{album.strAlbum}</p>
                        <button
                            className='bg-red-200 text-red-900 font-semibold px-2 rounded-xl hover:scale-[105%] transition'
                            onClick={() => removeFavourite(album.idAlbum)}
                        >
                            Remove Favourite
                        </button>
                    </div>
                </div>
            ))}
            
            <div className='flex justify-center'>
                <Link to="/">
                    <button className='bg-lime-900 px-2 py-1 mt-20 text-orange-100 font-bold rounded-xl hover:scale-[105%] transition'>
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Favourites; 
