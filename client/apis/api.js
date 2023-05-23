import axios from 'axios';

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE
});

export const APIPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    withCredentials: true
});
