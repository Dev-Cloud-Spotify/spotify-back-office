import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/users`;

const authAPI = {
    
    login: (form) => {
        console.log('Form', form);
        return axios.post(`${API_URL}/login`, form )
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
    });
    },

    register: (username, password) => {
        axios.post(`${API_URL}/register`, { username, password })
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
}

export default authAPI;