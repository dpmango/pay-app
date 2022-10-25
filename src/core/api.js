import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE } from '@core/enum/cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_URL,
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

  const i18nextLng = localStorage.getItem('i18nextLng');

  if (i18nextLng) {
    x.headers = {
      ...x.headers,
      ['Accept-Language']: i18nextLng,
    };
  }

  x.params = {
    ...x.params,
    apiVersion: 1,
  };

  return x;
});

api.interceptors.response.use((x) => {
  if (!x.config.url.includes('images') && !x.config.url.includes('pdf')) {
    console.log(`${x.status} | ${x.config.url}`, x.data);
  }

  return x;
});

export default api;
