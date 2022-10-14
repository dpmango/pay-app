import { api } from '@core';
import { ApiService } from '@utils';

export default {
  getImage: async ({ slug, ...params }) => {
    return ApiService(
      api.get(`images/${slug}`, {
        responseType: 'blob',
        params: { ...params },
      })
    );
  },
};
