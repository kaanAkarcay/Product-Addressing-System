import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface CommunicatorProps {
  children: (communicator: Communicator) => React.ReactNode;
  baseUrl: string;
}

interface Communicator {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  // Add other HTTP methods as needed
}

const CommunicatorProvider: React.FC<CommunicatorProps> = ({ children, baseUrl }) => {
  const communicator: Communicator = {
    get: async (url, config) => axios.get(baseUrl + url, config),
    post: async (url, data, config) => axios.post(baseUrl + url, data, config),
    // Implement other HTTP methods
  };

  return <>{children(communicator)}</>;
};

export default CommunicatorProvider;
