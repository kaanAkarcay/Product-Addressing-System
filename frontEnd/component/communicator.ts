import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// You can set the baseUrl once during the application initialization or import it from a config.
const baseUrl = 'your_base_url_here'; 

export const communicator = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => axios.get(baseUrl + url, config),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => axios.post(baseUrl + url, data, config),
  // Implement other HTTP methods
};
