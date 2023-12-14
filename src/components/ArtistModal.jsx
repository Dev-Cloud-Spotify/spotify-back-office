import React, { useEffect, useState } from 'react';
import artistsAPI from '@/apis/artists.api';
import { AiOutlineClose } from 'react-icons/ai';

export const ArtistModalsEdit = ({ closeModal, selectedArtist }) => {
    const [artist, setArtist] = useState({
        name: '',
        lastName: '',
        artistImage: '',
    });
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (selectedArtist) {
            console.log("ARTIST ID : ",selectedArtist._id);
            // If modifying an existing album, populate the form with its details
            setArtist({
                name: selectedArtist.name,
                lastName: selectedArtist.lastName,
                artistImage: selectedArtist.artistImage, // Assuming artist is an object with an _id property
            });
        }
        fetchArtists();
    }, [selectedArtist]);

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
        setArtist({
            ...artist,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!artist.name || !artist.lastName || !artist.artistImage) return alert('Please fill all the fields');

        // Check if it's a modification or creation
            console.log(artist);
            await artistsAPI.updateArtistById(selectedArtist._id, artist)
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
                    <input className='w-3/4' type='text' name='name' placeholder='Name' value={artist.name} onChange={handleChange} />
                    <input className='w-3/4' type='text' name='lastName' placeholder='lastName' value={artist.lastName} onChange={handleChange} />
                    <input type='text' name='artistImage' placeholder='artist Image' value={artist.artistImage} onChange={handleChange} />
                    <input type='submit'  value={'Modify'} className='bg-green-500 w-fit flex mx-auto text-white rounded-md px-5 py-2 cursor-pointer hover:bg-green-600 transition-all' />
                </form>
            </div>
        </div>
    );
};
