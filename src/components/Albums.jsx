import albumsAPI from '@/apis/albums.api';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const Albums = () => {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        await albumsAPI.getAlbums()
        .then(response => {
            setAlbums(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (!albums.length) return <p>Loading...</p>


    return (
        <div className='w-full items-center flex flex-col gap-6'>
            <FaPlusCircle  className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' />
            {albums.length === 0 && <h1 className='text-2xl font-bold'>No albums found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                {albums.map((album) => (
                    <Album key={album._id} album={album} />
                ))}
            </div>
        </div>

    );
}

const Album = ({ album }) => {
    const showAlbum = () => {
        console.log(album);
    }

    return (
        <div className='flex flex-col gap-1 items-center hover:scale-105 transition-all cursor-pointer' onClick={showAlbum}>
            <img className='rounded-md' width={200} src={album.coverImage} alt={album.title}  loading='lazy' />
            <h2 className='text-sm font-bold'>{album.title}</h2>
        </div>
    );
}

export default Albums;
