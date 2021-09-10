import axios from 'axios';

// const BASE_URL = '';
const BASE_URL = 'http://localhost:5001/';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
});

export default api;
