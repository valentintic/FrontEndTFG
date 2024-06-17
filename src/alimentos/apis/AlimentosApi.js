import axios from 'axios';

const alimentosApi = axios.create({
    baseURL: 'http://localhost:8080/api/alimentos',
    withCredentials: true, // Asegura que las credenciales están incluidas en las solicitudes
});

alimentosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default alimentosApi;
