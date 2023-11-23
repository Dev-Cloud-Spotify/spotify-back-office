
import albumsAPI from '@/apis/albums.api';
import songsAPI from '@/apis/songs.api';
import React, { useEffect, useState } from 'react';
import { FcStatistics } from 'react-icons/fc';

const Statistics = () => {

    const [numberSongs, setNumberSongs] = useState(12741);
    const [numberAlbums, setNumberAlbums] = useState(645460);
    const [numberListens, setNumberListens] = useState(798798650);

    useEffect(() => {
        fetchNumberSongs();
        fetchNumberAlbums();
        fetchNumberListens();
    }, []);

    const fetchNumberSongs = async () => {
        await songsAPI.getNumberOfSongs()
        .then((response) => {
            setNumberSongs(response.numberOfSongs);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const fetchNumberAlbums = async () => {
        await albumsAPI.getNumberOfAlbums()
        .then((response) => {
            console.log(response);
            setNumberAlbums(response.numberOfAlbums);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const fetchNumberListens = async () => {
        await songsAPI.getTotalNumberOfListens()
        .then((response) => {
            setNumberListens(response.numberOfListens[0].total);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className='flex flex-col gap-3 items-center'>
            <div className='flex items-center gap-2'>
                <FcStatistics size={40} />
                <span className='text-3xl font-semibold'>Statistics</span>
            </div>
            <div className='mt-4 flex flex-col gap-2 items-center'>
                <span className='text-xl font-semibold'>Number of Songs: <span className='font-semibold text-blue-500'>{numberSongs}</span> </span>
                <span className='text-xl font-semibold'>Number of Albums: <span className='font-semibold text-red-400'>{numberAlbums}</span></span>
                <span className='text-xl font-semibold'>Number of Listens: <span className='font-semibold text-green-400'>{numberListens}</span></span>
            <div>
                </div>

            </div>
        </div>
    );
}

export default Statistics;
