import artistsAPI from '@/apis/artists.api';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa';

const Artists = () => {
    
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        await artistsAPI.getArtists()
        .then(response => {
            setArtists(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (!artists.length) return <p>Loading...</p>


    return (
        <div className='flex flex-col items-center gap-6 justify-center'>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' />
            {artists.length === 0 && <h1 className='text-2xl font-bold'>No artists found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                {artists.map((artist) => (
                    <Artist key={artist._id} artist={artist} />
                ))}
            </div>
        </div>
    );
}

const Artist = ({ artist }) => {
    const showArtist = () => {
        console.log(artist);
    }

    return (
        <div className='flex items-center gap-3 hover:scale-105 transition-all cursor-pointer' onClick={showArtist}>
            <FaArrowRight className='text-2xl text-blue-300' />
            <div className='py-1 px-3 rounded-md shadow-lg bg-blue-500'>
                <span className='font-semibold text-lg'>{artist.name} </span>
                <span className='uppercase font-bold text-lg'>{artist.lastName} </span>
            </div>
        </div>
    );
}

export default Artists;
