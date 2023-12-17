import React, { useEffect, useState } from 'react';
import songsAPI from '@/apis/songs.api';
import artistsAPI from '@/apis/artists.api';
import albumsAPI from '@/apis/albums.api';
import { AiOutlineClose } from 'react-icons/ai';

export const AlbumModalsEdit = ({ closeModal, selectedAlbum }) => {
    const [album, setAlbum] = useState({
        title: '',
        coverImage: '',
        artist: '',
    });
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (selectedAlbum) {
            console.log("ARTIST ID DE ALBUM : ",selectedAlbum.artist._id);
            console.log("ALBUM ID : ",selectedAlbum.artist._id);
            // If modifying an existing album, populate the form with its details
            setAlbum({
                title: selectedAlbum.title,
                coverImage: selectedAlbum.coverImage,
                artist: selectedAlbum.artist._id, // Assuming artist is an object with an _id property
            });
        }
        fetchArtists();
    }, [selectedAlbum]);

    const fetchArtists = async () => {
        await artistsAPI.getArtists()
            .then(response => {
                setArtists(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleChange = (e) => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!album.title || !album.coverImage || !album.artist) return alert('Please fill all the fields');

        // Check if it's a modification or creation
            console.log(album);
            await albumsAPI.updateAlbumById(selectedAlbum._id, album)
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
                    <input className='w-3/4' type='text' name='title' placeholder='Title' value={album.title} onChange={handleChange} />
                    {/* list artists  */}
                    <select name='artist' onChange={handleChange} value={album.artist}> 
                        <option value=''>Select an artist</option>
                        {artists.map((artist) => (
                            <option key={artist._id} value={artist._id}>{artist.name}</option>
                        ))}
                    </select>
                    <input type='text' name='coverImage' placeholder='Cover Image' value={album.coverImage} onChange={handleChange} />
                    <input type='submit'  value={'Modify'} className='bg-green-500 w-fit flex mx-auto text-white rounded-md px-5 py-2 cursor-pointer hover:bg-green-600 transition-all' />
                </form>
            </div>
        </div>
    );
};

export const AlbumModalsAddSongs = ({ closeModal, albumId }) => {
    const [songsWithoutAlbum, setSongsWithoutAlbum] = useState([]);

    useEffect(() => {
        fetchSongsWithoutAlbum();
    }, [])

    const fetchSongsWithoutAlbum = async () => {
        try {
            const songs = await songsAPI.getSongsWithoutAlbum();
            setSongsWithoutAlbum(songs);
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddToAlbum = (song) => {
        updateSongById(song._id, song);

        // Fermez le modal (si nécessaire)
        closeModal();
    };
    const updateSongById = async (songId, updatedSong) => {
        let newSong={ ...updatedSong, album: albumId }
        await songsAPI.updateSongById(songId, newSong)
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
            {songsWithoutAlbum.map((song) => (
                <li key={song._id} onClick={() => handleAddToAlbum(song)} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
