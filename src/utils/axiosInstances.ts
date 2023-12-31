import axios from 'axios';
export const rawgApi = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 10000,
  params: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    key: import.meta.env.VITE_GAMEAPIKEY,
  },
  headers: {},
});
