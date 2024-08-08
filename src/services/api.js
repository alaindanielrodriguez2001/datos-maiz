import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchLastObservaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/last_observaciones/`);
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
