import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/songs`;


const songsAPI = {

    getSongs: () => {
        return axios.get(`${API_URL}/getSongs`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    
    getSongsWithoutAlbum: () => {
        return axios.get(`${API_URL}/getSongsWithoutAlbum`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    getNumberOfSongs: () => {
        return axios.get(`${API_URL}/countNumberOfSongs`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    getTotalNumberOfListens: () => {
        return axios.get(`${API_URL}/getTotalNumberOfListens`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
    deleteSongById: (id) => {
        return axios.delete(`${API_URL}/deleteSongById/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
    updateSongById: (id, song) => {
        return axios.put(`${API_URL}/updateSongById/${id}`, song)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    createSong: (song) => {
        return axios.post(`${API_URL}/createSong`, song)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    }

}

export default songsAPI;