import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/albums`;

const albumsAPI = {

    getAlbums: () => {
        return axios.get(`${API_URL}/getAlbums`)
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

    createAlbum: (album) => {
        return axios.post(`${API_URL}/createAlbum`, album)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

   

}

export default albumsAPI;