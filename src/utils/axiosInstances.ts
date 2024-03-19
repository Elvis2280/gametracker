import axios from 'axios';

const enviorment = import.meta.env.VITE_ENV as string;
export const rawgApi = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 10000,
  params: {
    key: import.meta.env.VITE_GAMEAPIKEY as string,
  },
  headers: {},
});

export const backendApi = axios.create({
  baseURL:
    enviorment === 'DEV'
      ? 'http://localhost:8080/api'
      : (import.meta.env.VITE_SUPABASE_PROJECT_URL as string),
  timeout: 10000,
  headers: {},
});
