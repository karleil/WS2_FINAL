import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailScreen() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        fetch(`https://www.theaudiodb.com/api/v1/json/2/album.php?m=${id}`)
            .then(response => response.json())
            .then(data => setAlbum(data.album ? data.album[0] : null))
            .catch(error => console.error('Error fetching album details:', error));
    }, [id]);

    if (!album) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-orange-100 py-10 pb-20'>
                <h1 className='text-5xl font-bold py-5 pl-7'>{album.strAlbum}</h1>
            <div className='bg-lime-900 w-[60%] px-4 py-4 m-auto rounded-xl flex gap-5'>
                <img className='w-[50%] rounded' src={album.strAlbumThumb} alt={album.strAlbum} />
                <div className='text-white text-3xl mt-20'>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Album:</span> {album.strAlbum}</p>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Artist:</span> {album.strArtist}</p>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Year Released:</span> {album.intYearReleased}</p>
                    <p className='pb-5'><span className='text-orange-200 font-semibold '>Description:</span> {album.strDescriptionEN || 'No description available.'}</p>
                </div>
            </div>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default DetailScreen;
