import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async (ruta) => {
    const response = await axios.get(`${API_URL}/${ruta}`);
    return response.data;
};

export const postData = async (ruta, data, authToken) => {
    const response = await axios.post(`${API_URL}/${ruta}`, data, authToken);
    return response;
};

export const deleteData = async (ruta, authToken) => {
    await axios.delete(`${API_URL}/${ruta}`, authToken);
    return response;
};


