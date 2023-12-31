import artistsAPI from '@/apis/artists.api';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowRight, FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { ArtistModalsEdit } from './ArtistModal';

const Artists = () => {
    
    const [artists, setArtists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchArtists();
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

    if (!artists?.length) return <p>Loading...</p>

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className='flex flex-col items-center gap-6 justify-center'>
            <FaPlusCircle className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' onClick={handleShowModal} />
            {artists.length === 0 && <h1 className='text-2xl font-bold'>No artists found</h1>}
            <div className='w-full flex flex-col gap-4 justify-center'>
                {artists.map((artist) => (
                    <Artist key={artist._id} artist={artist} />
                ))}
            </div>
            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    );
}

const Artist = ({ artist }) => {
    const showArtist = () => {
        console.log(artist);
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModal = () => {
        setShowEditModal(!showEditModal);
    };
    const getRandomImage = () => {
        const random = Math.floor(Math.random() * 60);
        return `https://i.pravatar.cc/45?img=${random}`;
    }
    const deleteArtistById = async (artistId) => {
        await artistsAPI.deleteArtistById(artistId)
        .then(response => {
            console.log(response);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });

      
      };
    

    return (
        <div className='flex items-center gap-4 hover:scale-105 transition-all cursor-pointer' onClick={showArtist}>
            {/* <FaArrowRight className='text-2xl text-blue-300' /> */}
            <img src={artist.artistImage || getRandomImage()} alt='' className='rounded-full w-12 h-12' />
            <div className='py-1 px-3 rounded-md shadow-lg bg-blue-500 flex' selectedArtist={artist} onClick={handleEditModal}>
                <span className='font-semibold text-lg'>{artist.name} </span>
                <span className='uppercase font-bold text-lg'>{artist.lastName} </span>
            </div>
            {showEditModal && <ArtistModalsEdit selectedArtist={artist} closeModal={handleEditModal} />}
            <div>
                <FaMinusCircle className='text-red-500 text-xl cursor-pointer hover:scale-105 transition-all' onClick={() => deleteArtistById(artist._id)} />
            </div>
        </div>
    );
}

const Modal = ({ setShowModal }) => {
    const [artist, setArtist] = useState({
        name: '',
        lastName: '',
        artistImage: '',
    });

    const handleChange = (event) => {
        setArtist({
            ...artist,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!artist.name || !artist.lastName || !artist.artistImage) return alert('Please fill all the fields');
        await artistsAPI.createArtist(artist)
        .then(response => {
            setShowModal(false);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-[400px] bg-white rounded-md p-6 relative'>
                <AiOutlineClose className='absolute top-2 right-2 text-2xl cursor-pointer text-black' onClick={() => setShowModal(false)} />
                <h1 className='text-2xl font-bold'>New artist</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-black'>
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='name' placeholder='Name' value={artist.name} onChange={handleChange} />
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='lastName' placeholder='Last name' value={artist.lastName} onChange={handleChange} />
                    <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='artistImage' placeholder='url of artistImage' value={artist.artistImage} onChange={handleChange} />
                    <button className='py-1 px-3 rounded-md shadow-lg bg-blue-500 text-white font-bold' type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
}

export default Artists;
