import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const songsAPI = {
    
    getNumberOfSongs: () => {
        return axios.get(`${API_URL}/songs/countNumberOfSongs`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    },

    getTotalNumberOfListens: () => {
        return axios.get(`${API_URL}/songs/getTotalNumberOfListens`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
    }

}

export default songsAPI;