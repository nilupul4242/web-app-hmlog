// auth.js
import api from './api';

export const loginService = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // assuming the API response includes the token in data.token
    return response.data.token;
  } catch (error) {
    // You can handle or rethrow the error to be handled by caller
    throw error;
  }
};
