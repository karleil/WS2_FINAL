import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 

function DetailScreen() {
    const { id } = useParams(); //this extracts the album ID from the URL parameters.
    const [album, setAlbum] = useState(null); // this is the state that stores the album details.

    // this fetches the album details when the page loads or when the `id` parameter changes.
    useEffect(() => {
        fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`) //this fetches the details of the album with the specific ID.
            .then(response => response.json()) 
            .then(data => setAlbum(data.album ? data.album[0] : null)) //this updates the state with album data : (null if theres no data)
            .catch(error => console.error('Error fetching album details:', error)); //will displa and eror message when errors occur during the fetch
    }, [id]); //this ensures that this will only run when `id` changes

   
    if (!album) {
        return <div className='text-center bg-orange-100'>Loading, Please wait.</div>;
    }

    return (
        //same as the HomePage, just renders the data from the API
        <div className='bg-orange-100 py-10 pb-20'>
                <h1 className='text-3xl md:text-5xl font-bold py-5 text-center md:text-left md:pl-32 pb-10 text-lime-950'>{album.strAlbum}</h1>
            <div className='bg-lime-900 w-[90%] md:w-[70%] px-4 py-4 m-auto rounded-xl md:flex md:gap-5'>
                <img className='w-[50%] rounded' src={album.strAlbumThumb} alt={album.strAlbum} />
                <div className='text-white text-md mt-10'>
                    <p className='pb-5 text-4xl'><span className='text-orange-200 font-semibold '>Album:</span> {album.strAlbum}</p>
                    <p className=''><span className='text-orange-200 font-semibold '>Artist:</span> {album.strArtist}</p>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Year Released:</span> {album.intYearReleased}</p>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Description:</span> {album.strDescriptionEN || 'No description available.'}</p>
                </div>
            </div>
            <div className='flex justify-center mx-20'>
            <Link to="/"><button className=' bg-lime-900 px-2 py-1 mt-20 text-orange-100 font-bold rounded-xl hover:scale-[105%] transition'>Back to Home</button></Link>
            </div>
        </div>
    );
}

export default DetailScreen;
