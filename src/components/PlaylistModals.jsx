import React, { useEffect, useState } from 'react';
import songsAPI from '@/apis/songs.api';
import playlistsAPI from '@/apis/playlists.api';

export const PlaylistModalsEdit = ({ closeModal }) => {
    const [songsWithoutPlaylist, setSongsWithoutPlaylist] = useState([]);

    useEffect(() => {
        fetchSongsWithoutAlbum();
    }, []);

    const fetchSongsWithoutAlbum = async () => {
        try {
            const songs = await songsAPI.getSongs();
            setSongsWithoutPlaylist(songs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit</h2>
            <ul>
                {songsWithoutPlaylist.map((song) => (
                    <li key={song._id}>{song.title}</li>
                ))}
            </ul>

            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export const PlaylistModalsAddSongs = ({ closeModal, playlistId }) => {
    const [songsWithoutPlaylist, setSongsWithoutPlaylist] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);
    const fetchSongs = async () => {
        try {
            const songs = await songsAPI.getSongs();
            setSongsWithoutPlaylist(songs);
        } catch (error){
            console.error(error);
        }
    };
    const handleAddToPlaylist = (song) => {
        console.log(song);
        addSongToPlaylist(song._id);
        // Fermez le modal (si nécessaire)
        closeModal();
    };
    const addSongToPlaylist = async (songId) => {
        console.log("playlist id : ",playlistId)
        console.log("song id : ",songId)
        await playlistsAPI.addSongToPlaylist(playlistId, songId)
        .then(response => {
            console.log(response)
            closeModal();
        })
        .catch(error => {
            console.log(error);
        });
    }
    return (
        <div>
        <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
            {songsWithoutPlaylist.map((song) => (
                <li key={song._id} onClick={() => handleAddToPlaylist(song)} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <img src={song.coverImage} alt={song.title} style={{ marginRight: '8px', borderRadius: '50%', width: '50px', height: '50px' }} />
                    <div>
                        <h3 style={{ margin: 0 }}>{song.title}</h3>
                        {/* Vous pouvez également ajouter d'autres informations ici, si nécessaire */}
                    </div>
                </li>
            ))}
        </ul>
            <button className='bg-red-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75' onClick={closeModal}>Close</button>
        </div>
    );
};
