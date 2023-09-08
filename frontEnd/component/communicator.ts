// apiConfig.ts (for TypeScript)

import axios, { AxiosInstance } from 'axios';

const baseUrl = 'http://127.0.0.1:5202/api'; // Replace with your API's base URL

const communicator: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers if needed (e.g., authentication tokens)
  },
});

export default communicator;
