import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: '/api/v1',
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const api = {
    get: (url: string, params = {}) => axiosInstance.get(url, { params }),
    post: (url: string, data = {}) => axiosInstance.post(url, data),
    put: (url: string, data = {}) => axiosInstance.put(url, data),
    delete: (url: string) => axiosInstance.delete(url),
};

export default api;