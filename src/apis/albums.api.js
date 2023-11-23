import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const albumsAPI = {
    
    getNumberOfAlbums: () => {
        return axios.get(`${API_URL}/albums/countNumberOfAlbums`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

   

}

export default albumsAPI;