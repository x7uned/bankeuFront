import axios from 'axios';

// Создаем экземпляр Axios с базовым URL
const instance = axios.create({
    baseURL: process.env.BACKEND_URL || "http://127.0.0.1:2722/",
});

// Добавляем интерсептор запросов для добавления заголовка Authorization
instance.interceptors.request.use((cfg) => {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('token');
        if (token) {
            cfg.headers.authorization = `Bearer ${token}`;
        }
    }
    return cfg;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
