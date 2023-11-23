import songsAPI from '@/apis/songs.api';
import React, { Suspense, useEffect, useState } from 'react';
import { FaPlay, FaPlusCircle } from 'react-icons/fa';

const Songs = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        await songsAPI.getSongs()
        .then(response => {
            console.log(response);
            setSongs(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (!songs.length) return <p>Loading...</p>

    return (
        <div className='flex flex-col gap-6 items-center justify-center '>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' />
            {songs.length === 0 && <h1 className='text-2xl font-bold'>No songs found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                    {songs.map((song) => (
                            <Song key={song._id} song={song} />
                    ))}
            </div>
        </div>
    );
}

const Song = ({ song }) => {
    const showSong = () => {
        console.log(song);
    }

    return (
        <div className='flex items-center gap-3 hover:scale-105 transition-all cursor-pointer' onClick={showSong}>
            <div className='py-1 px-3 rounded-md shadow-lg items-center flex gap-3'>
                <FaPlay className='text-2xl text-blue-300' />
                <span className='font-semibold text-lg text-blue-500'>{song.title} </span>
                par <span className='uppercase font-bold text-lg'>{song.autor} </span>
            </div>
        </div>
    );
}

export default Songs;
