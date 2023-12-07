import playlistsAPI from '@/apis/playlists.api';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const Playlists = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        console.log('fetching playlists')
        fetchPlaylits();
    }, []);

    const fetchPlaylits = async () => {
        await playlistsAPI.getPlaylists()
        .then(response => {
            setPlaylists(response);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleShowModal = () => {
        console.log('Show modal')
    }

    return (
        <div className='w-full items-center flex flex-col gap-6'>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' onClick={handleShowModal} />
            {playlists.length === 0 && <h1 className='text-2xl font-bold'>No Playlists found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                {playlists?.map((album) => (
                    <div>
                        play
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Playlists;
