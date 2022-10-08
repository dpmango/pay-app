import { api } from '@core';
import { ApiService } from '@utils';

export default {
  /**
    @method "PhoneOTP",
    @phone string
  */
  create: async (req) => {
    return ApiService(api.put('login', req));
  },
  /**
    @confirmationToken "PhoneOTP",
    @confirmationCode string
  */
  confirm: async (req) => {
    return ApiService(api.put('login/confirmation', req));
  },
  /**
    @refreshToken string
  */
  renew: async (req) => {
    return ApiService(api.put('login/renewal', req));
  },
  logout: async () => {
    return ApiService(api.delete('login'));
  },
  profile: async () => {
    return ApiService(api.get('profile'));
  },
  getAvatar: async ({ slug, request }) => {
    return ApiService(api.get(`images/${slug}`, { params: { request } }));
  },
  /**
    @firstName string
    @lastName string
    @middleName string
  */
  updateProfile: async (req) => {
    return ApiService(api.put('profile', req));
  },
};
