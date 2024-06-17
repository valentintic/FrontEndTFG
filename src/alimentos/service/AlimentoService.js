import alimentosApi from '../apis/AlimentosApi.js';

const API_URL = '';

// Obtén todos los alimentos
export const getAllAlimentos = async () => {
  try {
    const response = await alimentosApi.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching alimentos:', error);
    throw error;
  }
};

// Obtén un alimento por ID
export const getAlimentoById = async (id) => {
  try {
    const response = await alimentosApi.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching alimento with id ${id}:`, error);
    throw error;
  }
};

// Guarda un nuevo alimento
export const saveAlimento = async (alimentoDTO) => {
  try {
    const response = await alimentosApi.post(API_URL, alimentoDTO);
    return response.data;
  } catch (error) {
    console.error('Error creating alimento:', error);
    throw error;
  }
};

// Actualiza un alimento existente
export const updateAlimento = async (id, alimentoDTO) => {
  try {
    const response = await alimentosApi.put(`${API_URL}/${id}`, alimentoDTO);
    return response.data;
  } catch (error) {
    console.error(`Error updating alimento with id ${id}:`, error);
    throw error;
  }
};

// Elimina un alimento
export const deleteAlimento = async (id) => {
  try {
    await alimentosApi.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting alimento with id ${id}:`, error);
    throw error;
  }
};

// Obtén todas las categorías
export const getAllCategorias = async () => {
  try {
    const response = await alimentosApi.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};

