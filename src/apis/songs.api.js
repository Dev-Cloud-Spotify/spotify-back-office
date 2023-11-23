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
    }

}

export default songsAPI;