import { api } from '@core';
import { ApiService } from '@utils';

export default {
  methods: async (req) => {
    return ApiService(api.get('paymentMethods'));
  },
  methodById: async (id) => {
    return ApiService(api.get(`paymentMethods/${id}`));
  },
  /**
   @paymentMethodId string
   @returnUrl string
  */
  connectMethod: async (req) => {
    return ApiService(api.post('paymentMethods', req));
  },
};
