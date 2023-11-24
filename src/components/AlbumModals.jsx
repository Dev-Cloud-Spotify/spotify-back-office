import React, { useEffect, useState } from 'react';
import songsAPI from '@/apis/songs.api';

export const AlbumModalsEdit = ({ closeModal }) => {
    const [songsWithoutAlbum, setSongsWithoutAlbum] = useState([]);

    useEffect(() => {
        fetchSongsWithoutAlbum();
    }, []);

    const fetchSongsWithoutAlbum = async () => {
        try {
            const songs = await songsAPI.getSongsWithoutAlbum();
            setSongsWithoutAlbum(songs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit</h2>
            <ul>
                {songsWithoutAlbum.map((song) => (
                    <li key={song._id}>{song.title}</li>
                ))}
            </ul>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export const AlbumModalsAddSongs = ({ closeModal }) => {
    const [songsWithoutAlbum, setSongsWithoutAlbum] = useState([]);

    useEffect(() => {
        fetchSongsWithoutAlbum();
    }, []);

    const fetchSongsWithoutAlbum = async () => {
        try {
            const songs = await songsAPI.getSongsWithoutAlbum();
            setSongsWithoutAlbum(songs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Songs without Album</h2>
            <ul>
                {songsWithoutAlbum.map((song) => (
                    <li key={song._id}>{song.title}</li>
                ))}
            </ul>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};
