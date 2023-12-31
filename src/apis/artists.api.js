import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/artists`;


const artistsAPI = {
    
    getArtists: () => {
        return axios.get(`${API_URL}/getArtists`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    createArtist: (artist) => {
        return axios.post(`${API_URL}/createArtist`, artist)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
    deleteArtistById: (id) => {
        return axios.delete(`${API_URL}/deleteArtistById/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
    updateArtistById: (id, artist) => {
        return axios.put(`${API_URL}/updateArtistById/${id}`, artist)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
}

export default artistsAPI;