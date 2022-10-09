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

  /**
    @method "PhoneOTP",
    @phone string
  */
  uploadFile: async (req) => {
    const formData = new FormData();

    Object.keys(req).forEach((key) => {
      if (['progress'].includes(key)) return;

      formData.append(key, req[key]);
    });

    return ApiService(
      api.get('file', formData, {
        timeout: 120 * 1000,
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total);
          req.progress && req.progress(percentCompleted);
        },
      })
    );
  },
};
