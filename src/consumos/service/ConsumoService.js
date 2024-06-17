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

const BASE_URL = ''

export const getConsumosDiarios = async (fecha) => {
    try {
        const response = await consumoApi.get(BASE_URL, { params: { fecha } });
        return response.data;
    } catch (error) {
        console.error('Error fetching consumos diarios:', error);
        throw error;
    }
};

export const createConsumoDiario = async (consumoDiarioDTO) => {
    try {
        const response = await consumoApi.post(BASE_URL, consumoDiarioDTO);
        return response.data;
    } catch (error) {
        console.error('Error creating consumo diario:', error);
        throw error;
    }
};

export const updateConsumoDiario = async (id, nuevaCantidad) => {
    try {
        const response = await consumoApi.put(BASE_URL +`/${id}`, { nuevaCantidad });
        return response.data;
    } catch (error) {
        console.error(`Error updating consumo diario with id ${id}:`, error);
        throw error;
    }
};

export const deleteConsumoDiario = async (id) => {
    try {
        await consumoApi.delete(BASE_URL + `/${id}`);
    } catch (error) {
        console.error(`Error deleting consumo diario with id ${id}:`, error);
        throw error;
    }
};

export const getAllAlimentos = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/alimentos');
        return response.data;
    } catch (error) {
        console.error('Error fetching alimentos:', error);
        throw error;
    }
};