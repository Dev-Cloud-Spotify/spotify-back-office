import albumsAPI from '@/apis/albums.api';
import artistsAPI from '@/apis/artists.api';
import songsAPI from '@/apis/songs.api';
import React, { Suspense, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPlay, FaPlusCircle } from 'react-icons/fa';

const Songs = () => {

    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    if (!songs?.length) return <p>Loading...</p>

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className='flex flex-col gap-6 items-center justify-center '>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' onClick={handleShowModal} />
            {songs.length === 0 && <h1 className='text-2xl font-bold'>No songs found</h1>}
            <div className='w-full flex flex-col gap-4 justify-center'>
                {songs.map((song) => (
                    <Song key={song._id} song={song} />
                ))}
            </div>
            {showModal && <Modal setShowModal={setShowModal} />}
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

const Modal = ({ setShowModal }) => {
    const [song, setSong] = useState({
        title: '',
        artist: '',
        // duration: '',
        releaseDate: '',
        coverImage: '',
        audioFile: '',
        album: '',
    });

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchArtists();
        fetchAlbums();
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

    const fetchAlbums = async () => {
        await albumsAPI.getAlbums()
        .then(response => {
            setAlbums(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleChange = (event) => {
        setSong({
            ...song,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(song);
        await songsAPI.createSong(song)
        .then(response => {
            setShowModal(false);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-[400px] bg-white p-10 rounded-md relative'>
                <AiOutlineClose className='absolute top-2 right-2 text-2xl text-black cursor-pointer hover:scale-105 transition-all' onClick={() => setShowModal(false)} />
                <h1 className='text-2xl font-bold mb-5'>Add a new song</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-black'>
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='title' placeholder='Title' value={song.title} onChange={handleChange} />
                    <select className='py-1 px-3 rounded-md shadow-lg' name='artist' value={song.artist} onChange={handleChange}>
                        <option value=''>Select an artist</option>
                        {artists.map((artist) => (
                            <option key={artist._id} value={artist._id}>{artist.name}</option>
                        ))}
                    </select>
                    <input className='py-1 px-3 rounded-md shadow-lg' type='date' name='releaseDate' placeholder='Release date' value={song.releaseDate} onChange={handleChange} />
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='coverImage' placeholder='Cover image' value={song.coverImage} onChange={handleChange} />
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='audioFile' placeholder='Audio file' value={song.audioFile} onChange={handleChange} />
                    <select className='py-1 px-3 rounded-md shadow-lg' name='album' value={song.album} onChange={handleChange}>
                        <option value=''>Select an album</option>
                        {albums.map((album) => (
                            <option key={album._id} value={album._id}>{album.title}</option>
                        ))}
                    </select>
                    <button className='w-3/4 mx-auto py-1 px-3 rounded-md shadow-lg bg-green-500 text-white font-bold'>Add</button>
                </form>
            </div>
        </div>
    );
}
export default Songs;
