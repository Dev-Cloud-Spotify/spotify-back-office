
import albumsAPI from '@/apis/albums.api';
import playlistsAPI from '@/apis/playlists.api';
import songsAPI from '@/apis/songs.api';
import React, { useEffect, useState } from 'react';
import { FcStatistics } from 'react-icons/fc';

const Statistics = () => {

    const [numberSongs, setNumberSongs] = useState(0);
    const [numberAlbums, setNumberAlbums] = useState(0);
    const [numberListens, setNumberListens] = useState(0);
    const [numberPlaylists, setNumberPlaylists] = useState(0);

    useEffect(() => {
        fetchNumberSongs();
        fetchNumberAlbums();
        fetchNumberListens();
        fetchNumberPlaylists();
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
    const fetchNumberPlaylists = async () => {
        await playlistsAPI.getNumberOfPlaylists()
        .then((response) => {
            setNumberPlaylists(response.numberOfPlaylists);
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
                <span className='text-xl font-semibold'>Number of Playlists: <span className='font-semibold text-yellow-400'>{numberPlaylists}</span></span>
            <div>
                </div>

            </div>
        </div>
    );
}

export default Statistics;
