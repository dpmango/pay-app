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
  profile: async () => {
    return ApiService(api.get('profile'));
  },
};
