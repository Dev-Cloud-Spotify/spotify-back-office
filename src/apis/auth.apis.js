import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const authAPI = {
    
    login: (email, password) => {
        axios.post(`${API_URL}/login`, { email, password })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },

    register: (email, password) => {
        axios.post(`${API_URL}/register`, { email, password })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

export default authAPI;