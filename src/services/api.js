import axios from "axios";

export const api = axios.create({
    baseURL: 'https://blog-app-web-service.onrender.com/api/',
    timeout: 8000,
})