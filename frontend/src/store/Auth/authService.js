import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`;

export const loginUserAPI = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data, {
        withCredentials: true
    });
    return response;
};

export const getCurrentUserAPI = async (accessToken) => {

    const response = await axios.get(`${API_URL}/current-user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        }
    });
    return response.data.data;
};

export const logoutUserAPI = async (accessToken) => {
    const response = await axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        },
        withCredentials: true, // Send credentials (cookies) along with the request
    });
    return response.data;
};

export const refreshTokenAPI = async () => {
    const response = await axios.post(`${API_URL}/refresh-token`, {}, {
        withCredentials: true
    });
    return response.data.data.accessToken;
}

export const registerUserAPI = async (data) => {
    const response = await axios.post(`${API_URL}/register`, data, {
        withCredentials: true,
    });
    
    return response;
}


