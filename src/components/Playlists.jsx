import playlistsAPI from '@/apis/playlists.api';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import PlaylistInfos from './Playlistinfos';
import { AiOutlineClose } from 'react-icons/ai';
import Error from './utilities/Error';

const Playlists = () => {

    const [playlists, setPlaylists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('fetching playlists')
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        await playlistsAPI.getPlaylists()
        .then(response => {
            setPlaylists(response);
        })
        .catch(error => {
            console.log(error);
            setError(error);
        });
    };
    if (!playlists?.length) return <p>Loading...</p>

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className='w-full items-center flex flex-col gap-6'>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' onClick={handleShowModal} />
            {playlists.length === 0 && <h1 className='text-2xl font-bold'>No Playlists found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                {playlists.map((playlist) => (
                    <Playlist key={playlist._id} playlist={playlist} setSelectedPlaylist={setSelectedPlaylist} setShowModal={setShowModal}/>
                ))}
            </div>
            {showModal && <Modal setShowModal={setShowModal} selectedPlaylist={selectedPlaylist}/>}
            {error && (
        // Afficher l'erreur en utilisant le composant Error
        <Error message={error} />
      )}
        </div>
    );
}

const AddPlaylist = () => {
    return (
        <div>
            Add playlist
        </div>
    )
}
const Playlist = ({ playlist, setSelectedPlaylist}) => {

    const [showModal, setShowModal] = useState(false);

    const showPlaylist = () => {
        setSelectedPlaylist(playlist);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <div className='flex flex-col gap-1 items-center hover:scale-105 transition-all cursor-pointer' onClick={showPlaylist}>
            <h2 className='text-sm font-bold'>{playlist.title}</h2>
        </div>
        {showModal &&
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black'>
         <PlaylistInfos setShowModal={setShowModal} playlist={playlist} closeModal={closeModal} />
        </div>

         }
        </>
    );
}

const Modal = ({ setShowModal, selectedPlaylist }) => {
    const [playlist, setPlaylist] = useState({
        title: '',
    });
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (selectedPlaylist) {
            console.log(selectedPlaylist._id);
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
        
           await playlistsAPI.createPlaylist(playlist)
                .then(response => {
                    setShowModal(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black'>
            
            <div className='w-[400px] bg-white rounded-md p-4 relative'>
                <AiOutlineClose className='absolute top-2 right-2 text-2xl cursor-pointer hover:scale-105 transition-all' onClick={() => setShowModal(false)} />
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input className='w-3/4' type='text' name='title' placeholder='Title' value={playlist.title} onChange={handleChange} />
                    <input type='submit'  value={'Create'} className='bg-green-500 w-fit flex mx-auto text-white rounded-md px-5 py-2 cursor-pointer hover:bg-green-600 transition-all' />
                </form>
            </div>
        </div>
    );
}
export default Playlists;
