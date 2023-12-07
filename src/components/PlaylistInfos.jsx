import playlistsAPI from '@/apis/playlists.api';
import songsAPI from '@/apis/songs.api';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import { PlaylistModalsEdit, PlaylistModalsAddSongs } from './PlaylistModals';

const PlaylistInfos = ({playlist, closeModal}) => {
    useEffect(() => {
        console.log("playing infos", playlist);
    }, []);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddSongsModal, setShowAddSongsModal] = useState(false);
    
    const handleEditModal = () => {
        setShowEditModal(!showEditModal);
    };
    const handleAddSongsModal = () => {
        setShowAddSongsModal(!showAddSongsModal);
        fetchPlaylistSongs();
    };

    const handleDeleteModal = () => {
        // Appelez la fonction pour supprimer l'album
        const shouldDelete = window.confirm('Are you sure you want to delete this playlist?');
        if (shouldDelete){
            deletePlaylistById();
        }
      };
    const [playlistSongs, setPlaylistSongs] = useState([]);

    useEffect(() => {
        fetchPlaylistSongs();
    }, [playlist]);

    const fetchPlaylistSongs = async () => {
        await playlistsAPI.getPlaylistById(playlist._id)
        .then(response => {
            console.log("recup musique dans playlist",response)
            setPlaylistSongs(response.songs);
        })
        .catch(error => {
            console.log(error);
        });
    }
    const deletePlaylistById = async () => {
        await playlistsAPI.deletePlaylistById(playlist._id)
        .then(response => {
            console.log(response)
            closeModal();
            window.location.reload();
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
                        <h2 className='text-xl font-bold text-center'>{playlist.title}</h2>
                    </div>
                    <div className='flex flex-col gap-4'>
        {/* Condition pour afficher le bouton Edit */}
        {!showAddSongsModal && (
            <>
                <button className='bg-orange-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75' onClick={handleEditModal}> Edit </button>
                <button className='bg-red-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75' onClick={handleDeleteModal}> Delete </button>
            </>
        )}
        <button className='bg-green-400 py-2 px-3 rounded-md shadow-xl cursor-pointer hover:opacity-75' onClick={handleAddSongsModal}> Add songs </button>
                     </div>

                    {showEditModal && <PlaylistModalsEdit closeModal={handleEditModal} />}
                    {showAddSongsModal && <PlaylistModalsAddSongs playlistId={playlist._id} closeModal={handleAddSongsModal}/>}
                </div>

                <div className='w-5/6 flex justify-start mx-auto mt-8'>
                    {playlistSongs?.length === 0 && <h1 className='text-2xl font-bold text-center w-full'>No songs found</h1>}
                    <div className='w-full flex flex-wrap gap-4 justify-start'>
                        {playlistSongs.length >0 && playlistSongs?.map((song) => (
                        <Song key={song._id} song={song} playlistId={playlist._id} fetchPlaylistSongs={fetchPlaylistSongs} />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Song = ({song, playlistId, fetchPlaylistSongs}) => {
    const updateSongPlaylistToNull = async (songId) => {

       playlistsAPI.removeSongFromPlaylist(playlistId, songId)
         .then(response => {
              console.log(response);
              fetchPlaylistSongs();
         })
            .catch(error => {
                console.log(error);
            });
      
      };
    
    return (
        <div className='flex gap-3 items-center justify-between cursor-pointer w-full'>
            <div className='flex gap-3 items-center'>
                <img className='rounded-md' width={50} src={song.coverImage} alt={song.title}  loading='lazy' />
                <h2 className='text-sm font-bold'>{song.title}</h2>
            </div>
            <div>
                <FaMinusCircle className='text-red-500 text-xl cursor-pointer hover:scale-105 transition-all' onClick={() => updateSongPlaylistToNull(song._id)} />
            </div>
        </div>
    );
}

export default PlaylistInfos;
