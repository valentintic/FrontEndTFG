import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8080/usuarios'
});

usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});
export default usersApi;

export const rolesApi = axios.create({
    baseURL: 'http://localhost:8080/roles'
});

rolesApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

