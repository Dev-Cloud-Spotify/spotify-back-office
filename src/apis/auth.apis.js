import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/users`;

const authAPI = {
    
    login: (username, password) => {
        axios.post(`${API_URL}/login`, { username, password })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },

    register: (username, password) => {
        axios.post(`${API_URL}/register`, { username, password })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

export default authAPI;