import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/albums`;

const albumsAPI = {

    getAlbums: () => {
        return axios.get(`${API_URL}/getAllAlbums`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },
    
    getNumberOfAlbums: () => {
        return axios.get(`${API_URL}/countNumberOfAlbums`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

   

}

export default albumsAPI;