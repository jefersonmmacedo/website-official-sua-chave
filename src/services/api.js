import axios from 'axios';

const api = axios.create({
 baseURL: 'https://sua-chave-api.herokuapp.com/'
// baseURL: 'http://localhost:3339/'
});

export default api;