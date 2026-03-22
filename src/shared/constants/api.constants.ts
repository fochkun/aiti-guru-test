export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';
export const ACCESS_TOKEN_LIFETIME = import.meta.env.VITE_ACCESS_TOKEN_LIFETIME 
    ? Number(import.meta.env.VITE_ACCESS_TOKEN_LIFETIME) * 60 * 1000 
    : 60 * 60 * 1000;
export const REFRESH_TOKEN_LIFETIME = import.meta.env.VITE_REFRESH_TOKEN_LIFETIME 
    ? Number(import.meta.env.VITE_REFRESH_TOKEN_LIFETIME) * 24 * 60 * 60 * 1000
    : 7 * 24 * 60 * 60 * 1000;
