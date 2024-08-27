import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async (ruta) => {
  try {    
    const response = await axios.get(`${API_URL}/${ruta}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

export const postData = async (ruta, data, authToken) => {
  try {
    const response = await axios.post(`${API_URL}/${ruta}`, data, authToken);
    return response.data;
  } catch (error) {
    console.error('Failed to post data:', error);
  }
};

export const deleteData = async (ruta, authToken) => {
  try {
    await axios.delete(`${API_URL}/${ruta}`, authToken);
  } catch (error) {
    console.error('Failed to delete data:', error);
  }
};


