import albumsAPI from '@/apis/albums.api'
import artistsAPI from '@/apis/artists.api'
import songsAPI from '@/apis/songs.api'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaPause, FaPlay, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { DefaultLoader } from './utilities/Loaders'

import { FixedSizeList } from 'react-window'

const Songs = () => {
  const [songs, setSongs] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    await songsAPI
      .getSongs()
      .then((response) => {
        console.log(response)
        setSongs(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (!songs?.length) return <p>Loading...</p>

  const handleShowModal = () => {
    setShowModal(true)
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      <Song key={songs[index]._id} song={songs[index]} />
    </div>
  )

  return (
    <div className='flex flex-col gap-6 items-center justify-center w-full'>
      <FaPlusCircle
        className='text-4xl text-green-500 cursor-pointer hover:scale-105 transition-all'
        onClick={handleShowModal}
      />
      {songs.length === 0 && (
        <h1 className='text-2xl font-bold'>No songs found</h1>
      )}
      <div className='w-full flex flex-col gap-4 justify-center'>
        <FixedSizeList
          height={500}
          width={600}
          itemSize={80}
          itemCount={songs.length}
          className='w-full no-scrollbar'
        >
          {Row}
        </FixedSizeList>
      </div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  )
}

const Song = ({ song }) => {
  const [playing, setPlaying] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const showSong = () => {
    console.log(song)
  }

  useEffect(() => {
    if (!playing) return
    const audio = new Audio(song.CFurl) //maintenant, on utilise CFurl au lieu de l'url de s3 = économies !
    if (playing) audio.play()
    else audio.pause()

    return () => {
      audio.pause()
    }
  }, [playing])

  return (
    <div className='flex gap-3 items-center justify-between cursor-pointer w-full'>
      <div className='flex gap-3 items-center'>
        {playing ? (
          <FaPause
            className='text-2xl text-blue-300'
            onClick={() => setPlaying(false)}
          />
        ) : (
          <FaPlay
            className='text-2xl text-blue-300'
            onClick={() => setPlaying(true)}
          />
        )}
        <img
          className='rounded-md'
          width={50}
          src={song.coverImage}
          alt={song.title}
          loading='lazy'
        />
        <h2 className='text-lg font-bold'>{song.title}</h2> by{' '}
        <h2 className='text-sm font-bold'>
          {song.artist?.name} {song.artist?.lastName}{' '}
        </h2>
      </div>
      <div>
        <FaTrash
          className='text-red-500 text-xl cursor-pointer hover:scale-105 transition-all'
          onClick={() => setDeleteDialog(true)}
        />
      </div>
    </div>
  )
}

const Modal = ({ setShowModal }) => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    // duration: '',
    releaseDate: '',
    coverImage: '',
    audioFile: null,
    album: '',
  })

  const defaultDate = new Date().toISOString().slice(0, 10)

  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

  const [listAlbums, setListAlbums] = useState([])

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setSong({
      ...song,
      releaseDate: defaultDate,
    })
    fetchArtists()
    fetchAlbums()
  }, [])

  const fetchArtists = async () => {
    await artistsAPI
      .getArtists()
      .then((response) => {
        setArtists(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    console.log(song.artist)
    const alb = listAlbums?.filter((album) => album.artist._id === song.artist)
    setAlbums(alb)
  }, [song.artist])

  useEffect(() => {
    console.log(song.album)
  }, [song.album])

  const fetchAlbums = async () => {
    await albumsAPI
      .getAlbums()
      .then((response) => {
        setListAlbums(response)
        setAlbums(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    setSong({
      ...song,
      [event.target.name]: event.target.value,
    })
  }

  const handleAudioChange = (event) => {
    setSong({
      ...song,
      audioFile: event.target.files[0],
    })
  }

  const handleSubmit = async (event) => {
    setLoader(true)
    event.preventDefault()
    const formData = new FormData()
    formData.append('title', song.title)
    formData.append('artist', song.artist)
    formData.append('releaseDate', song.releaseDate)
    formData.append('coverImage', song.coverImage)
    formData.append('audioFile', song.audioFile)
    formData.append('album', song.album)

    console.log(song)
    await songsAPI
      .createSong(formData)
      .then((response) => {
        if (response.error) return alert(response.error)
        setShowModal(false)
        setLoader(false)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)

        // Display an alert with an OK button
        const shouldReload = window.confirm(
          'An error occurred. Do you want to reload the page?'
        )

        if (shouldReload) {
          window.location.reload() // Reload the page
          setLoader(false)
          setShowModal(false)
          setLoading(false)
        }
      })
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='w-[400px] bg-white p-10 rounded-md relative'>
        <AiOutlineClose
          className='absolute top-2 right-2 text-2xl text-black cursor-pointer hover:scale-105 transition-all'
          onClick={() => setShowModal(false)}
        />
        <h1 className='text-2xl font-bold mb-5'>Add a new song</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 text-black'
        >
          <input
            className='py-1 px-3 rounded-md shadow-lg'
            type='text'
            name='title'
            placeholder='Title'
            value={song.title}
            onChange={handleChange}
          />
          <select
            className='py-1 px-3 rounded-md shadow-lg'
            name='artist'
            value={song.artist._id}
            onChange={handleChange}
          >
            <option value=''>Select an artist</option>
            {artists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name} {artist.lastName}
              </option>
            ))}
          </select>
          <input
            className='py-1 px-3 rounded-md shadow-lg'
            type='date'
            name='releaseDate'
            placeholder='Release date'
            value={song.releaseDate}
            onChange={handleChange}
          />
          <input
            className='py-1 px-3 rounded-md shadow-lg'
            type='text'
            name='coverImage'
            placeholder='Cover image'
            value={song.coverImage}
            onChange={handleChange}
          />
          <input
            className='py-1 px-3 rounded-md shadow-lg'
            type='file'
            name='audioFile'
            placeholder='Audio file'
            onChange={handleAudioChange}
          />
          {/* <input className='py-1 px-3 rounded-md shadow-lg' type='text' name='audioFile' placeholder='Audio file' value={song.audioFile} onChange={handleChange} /> */}
          <select
            className='py-1 px-3 rounded-md shadow-lg'
            name='album'
            value={song.album._id}
            onChange={handleChange}
          >
            <option value=''>Select an album</option>
            {albums.length > 0 &&
              albums?.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.title}
                </option>
              ))}
          </select>
          <button className='w-3/4 mx-auto py-1 px-3 rounded-md shadow-lg bg-green-500 text-white font-bold'>
            Add
          </button>

          {loader && <DefaultLoader />}
        </form>
      </div>
    </div>
  )
}
export default Songs
