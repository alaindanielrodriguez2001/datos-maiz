import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchLastObservaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/observaciones/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching last observaciones:', error);
        throw error;
    }
};

export const fetchCampos = async () => {
    try {
        const response = await axios.get(`${API_URL}/campos/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching campos:', error);
        throw error;
    }
};

export const fetchCampoNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/campos/`);
        return response.data.map(campo => campo.nombre_del_campo);
    } catch (error) {
        console.error('Error fetching campo names:', error);
        throw error;
    }
};

export const field_name = async (pk) => {
    try {
        const response = await axios.get(`${API_URL}/campos/${pk}`);
        return response.nombre_del_campo;
    } catch (error) {
        console.error('Error fetching campo names:', error);
        throw error;
    }
}

