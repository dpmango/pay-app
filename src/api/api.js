import React from 'react';
import axios from 'axios';
import { getEnv } from '@helpers';

const api = axios.create({
  baseURL: getEnv('GATEWAY_URL'),
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use((x) => {
  console.log(`${x.method.toUpperCase()} | ${x.url}`, x.params, x.data);

  return x;
});

api.interceptors.response.use((x) => {
  console.log(`${x.status} | ${x.config.url}`, x.data);

  return x;
});

export const setDefaultAxiosParam = (param, value) => {
  api.defaults.params = api.defaults.params || {};
  api.defaults.params[param] = value;
};

export default api;
