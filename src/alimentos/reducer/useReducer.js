import { useReducer } from 'react';
import { getAllAlimentos } from '../service/AlimentoService';

const initialState = {
  alimentos: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALIMENTOS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_ALIMENTOS_SUCCESS':
      return { ...state, loading: false, alimentos: action.payload };
    case 'FETCH_ALIMENTOS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useAlimentos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAlimentos = async () => {
    dispatch({ type: 'FETCH_ALIMENTOS_REQUEST' });
    try {
      const data = await getAllAlimentos();
      dispatch({ type: 'FETCH_ALIMENTOS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ALIMENTOS_FAILURE', payload: error.message });
    }
  };


  return { state, fetchAlimentos };
};

export default useAlimentos;
