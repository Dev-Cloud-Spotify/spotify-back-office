import albumsAPI from '@/apis/albums.api';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import artistsAPI from '@/apis/artists.api';
import AlbumInfos from './AlbumInfos';

const Albums = () => {

    const [albums, setAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState({});
    const [isModify, setIsModify] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        await albumsAPI.getAlbums()
        .then(response => {
            setAlbums(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (!albums?.length) return <p>Loading...</p>


    const handleShowModal = () => {
        setIsModify(false);
        setShowModal(true);
    }


    return (
        <div className='w-full items-center flex flex-col gap-6'>
            <FaPlusCircle  className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all' onClick={handleShowModal} />
            {albums.length === 0 && <h1 className='text-2xl font-bold'>No albums found</h1>}
            <div className='w-full flex flex-wrap gap-4 justify-center'>
                {albums.map((album) => (
                    <Album key={album._id} album={album} setSelectedAlbum={setSelectedAlbum} setIsModify={setIsModify} setShowModal={setShowModal}/>
                ))}
            </div>

            {showModal && <Modal setShowModal={setShowModal} selectedAlbum={selectedAlbum} isModify={isModify}/>}
        </div>
    );
}

const Album = ({ album, setSelectedAlbum}) => {

    const [showModal, setShowModal] = useState(false);

    const showAlbum = () => {
        setSelectedAlbum(album);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <div className='flex flex-col gap-1 items-center hover:scale-105 transition-all cursor-pointer' onClick={showAlbum}>
            <img className='rounded-md object-cover w-48 h-48' width={200} src={album.coverImage} alt={album.title}  loading='lazy' />
            <h2 className='text-sm font-bold'>{album.title}</h2>
        </div>
        {showModal &&
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black'>
         <AlbumInfos setShowModal={setShowModal} album={album} closeModal={closeModal} />
        </div>

         }
        </>
    );
}


const Modal = ({ setShowModal, selectedAlbum, isModify }) => {
    const [album, setAlbum] = useState({
        title: '',
        coverImage: '',
        artist: '',
    });
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (isModify && selectedAlbum) {
            console.log(selectedAlbum.artist._id);
            // If modifying an existing album, populate the form with its details
            setAlbum({
                title: selectedAlbum.title,
                coverImage: selectedAlbum.coverImage,
                artist: selectedAlbum.artist._id, // Assuming artist is an object with an _id property
            });
        }
        fetchArtists();
    }, [isModify, selectedAlbum]);

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
        if (isModify) {
            console.log(album);
            await albumsAPI.updateAlbumById(selectedAlbum._id, album)
                .then(response => {
                    setShowModal(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });

        } else {
            await albumsAPI.createAlbum(album)
                .then(response => {
                    setShowModal(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black'>
            
            <div className='w-[400px] bg-white rounded-md p-4 relative'>
                <AiOutlineClose className='absolute top-2 right-2 text-2xl cursor-pointer hover:scale-105 transition-all' onClick={() => setShowModal(false)} />
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
                    <input type='submit'  value={isModify ? 'Modify' : 'Create'} className='bg-green-500 w-fit flex mx-auto text-white rounded-md px-5 py-2 cursor-pointer hover:bg-green-600 transition-all' />
                </form>
            </div>
        </div>
    );
}
export default Albums;
