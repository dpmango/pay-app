import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getEnv } from '@helpers';
import { AUTH_TOKEN_COOKIE } from '@config/cookie';

const api = axios.create({
  baseURL: getEnv('GATEWAY_URL'),
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use((x) => {
  console.log(`${x.method.toUpperCase()} | ${x.url}`, x.data);

  const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
  if (accessToken) {
    x.headers = {
      ...x.headers,
      ['Authorization']: `Bearer ${accessToken}`,
    };
  }
  return x;
});

api.interceptors.response.use((x) => {
  console.log(`${x.status} | ${x.config.url}`, x.data);

  return x;
});

export default api;
