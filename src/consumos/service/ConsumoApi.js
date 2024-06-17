import axios from "axios";

const consumoApi = axios.create({
    baseURL: 'http://localhost:8080/api/consumos'
});

consumoApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default consumoApi;
