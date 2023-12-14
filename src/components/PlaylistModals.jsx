import React, { useEffect, useState } from 'react';
import songsAPI from '@/apis/songs.api';
import playlistsAPI from '@/apis/playlists.api';
import Error from './utilities/Error';
import { AiOutlineClose } from 'react-icons/ai';

export const PlaylistModalsEdit = ({ closeModal, selectedPlaylist }) => {
    const [playlist, setPlaylist] = useState({
        title: '',
    });
    const [playlists, setPlaylists] = useState([]);
    console.log("PLAYLIST ID : ",selectedPlaylist._id);
    useEffect(() => {
        if (selectedPlaylist) {
            console.log("PLAYLIST ID : ",selectedPlaylist._id);
            setPlaylist({
                title: selectedPlaylist.title,
            });
        }
        fetchPlaylists();
    }, [selectedPlaylist]);

    const fetchPlaylists = async () => {
        await playlistsAPI.getPlaylists()
        .then(response => {
            setPlaylists(response);
        })
        .catch(error => {
            console.log(error);
        });
    };
    const handleChange = (e) => {
        setPlaylist({
            ...playlist,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playlist.title) return alert('Please fill all the fields');

        // Check if it's a modification or creation
        
           await playlistsAPI.updatePlaylist(selectedPlaylist._id, playlist)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black'>
            
            <div className='w-[400px] bg-white rounded-md p-4 relative'>
                <AiOutlineClose className='absolute top-2 right-2 text-2xl cursor-pointer hover:scale-105 transition-all' onClick={closeModal} />
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input className='w-3/4' type='text' name='title' placeholder='Title' value={playlist.title} onChange={handleChange} />
                    <input type='submit'  value={'Modify'} className='bg-green-500 w-fit flex mx-auto text-white rounded-md px-5 py-2 cursor-pointer hover:bg-green-600 transition-all' />
                </form>
            </div>
        </div>
    );
};

export const PlaylistModalsAddSongs = ({ closeModal, playlistId }) => {
    const [songsWithoutPlaylist, setSongsWithoutPlaylist] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchSongs();
    }, []);
    const fetchSongs = async () => {
        try {
            const songs = await songsAPI.getSongs();
            setSongsWithoutPlaylist(songs);
        } catch (error){
            console.error(error);
            setError(error);
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
            setError(error);
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
            {error && (
        // Afficher l'erreur en utilisant le composant Error
        <Error message={error} />
      )}
        </div>
    );
};
