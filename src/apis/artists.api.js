import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const artistsAPI = {
    
    getArtists: () => {
        return axios.get(`${API_URL}/artists/getArtists`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

   

}

export default artistsAPI;