import albumsAPI from '@/apis/albums.api';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';

const AlbumInfos = ({album, closeModal}) => {

    const [albumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        fetchAlbumSongs();
    }, [album]);

    const fetchAlbumSongs = async () => {
        await albumsAPI.getAlbumSongs(album._id)
        .then(response => {
            console.log(response)
            setAlbumSongs(response.album.songs);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='bg-gray-300 flex justify-center rounded-md shadow-xl'>
            <div className='w-full p-8 relative'>
                <AiOutlineClose className='absolute text-xl top-2 right-2 cursor-pointer' onClick={() => closeModal()} />
                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col gap-1'>
                        <img className='rounded-md' width={400} src={album.coverImage} alt={album.title}  loading='lazy' />
                        <h2 className='text-xl font-bold text-center'>{album.title}</h2>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button className='bg-orange-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75'> Edit </button>
                        <button className='bg-red-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75'> Delete </button>
                        <button className='bg-green-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75'> Add songs </button>
                    </div>
                </div>

                <div className='w-5/6 flex justify-start mx-auto mt-8'>
                    {albumSongs?.length === 0 && <h1 className='text-2xl font-bold text-center w-full'>No songs found</h1>}
                    <div className='w-full flex flex-wrap gap-4 justify-start'>
                        {albumSongs.length >0 && albumSongs?.map((song) => (
                            <Song key={song._id} song={song} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Song = ({song}) => {

    return (
        <div className='flex gap-3 items-center justify-between cursor-pointer w-full'>
            <div className='flex gap-3 items-center'>
                <img className='rounded-md' width={50} src={song.coverImage} alt={song.title}  loading='lazy' />
                <h2 className='text-sm font-bold'>{song.title}</h2>
            </div>
            <div>
                <FaMinusCircle className='text-red-500 text-xl cursor-pointer hover:scale-105 transition-all' />
            </div>
        </div>
    );
}

export default AlbumInfos;
