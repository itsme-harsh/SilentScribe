import axios from "axios"
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/blogs`;

export const addBlogAPI = async (data, accessToken) => {
    return response = await axios.post(`${API_URL}/add`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        },
        withCredentials: true, // Send credentials (cookies) along with the request
    });
}

export const getAllBlogsAPI = async () => {
    const response = await axios.get(`${API_URL}`,{}, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true, // Send credentials (cookies) along with the request
    });

    return response;
}

export const getBlogAPI = async (id) => {
    
    const response = await axios.get(`${API_URL}/${id}`,{}, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true, // Send credentials (cookies) along with the request
    });

    return response;

}

