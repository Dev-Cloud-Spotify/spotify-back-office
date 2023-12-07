import axios from 'axios';

const API_URL = `${process.env.API_URL}/api/playlists`;

const playlistsAPI = {
    
        getPlaylists: () => {
            return axios.get(`${API_URL}/getPlaylists`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },

        getPlaylistById: (id) => {
            return axios.get(`${API_URL}/getPlaylistById/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },
        
        createPlaylist: (playlist) => {
            return axios.post(`${API_URL}/createPlaylist`, playlist)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },

        updatePlaylist: (id, playlist) => {
            return axios.put(`${API_URL}/updatePlaylist/${id}`, playlist)
                .then(response => response.data)
                .catch(error => {
                    console.log(error);
                });
        },
        deletePlaylistById: (id) => {
            return axios.delete(`${API_URL}/deletePlaylistById/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
        },
    
    
}

export default playlistsAPI;