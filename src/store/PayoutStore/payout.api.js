import { api } from '@core';
import { ApiService } from '@utils';

export default {
  /**
    @completed boolean,
    @pagination skip/take
  */
  payouts: async (req) => {
    return ApiService(
      api.get('payouts', {
        params: req,
      })
    );
  },
  payoutById: async (id) => {
    return ApiService(api.get(`payouts/${id}`));
  },
  payoutDocument: async (id) => {
    return ApiService(api.get(`payouts/${id}/document/content`));
  },
  payoutDocumentPdf: async (id) => {
    return ApiService(
      api.get(`payouts/${id}/document/content/pdf`, {
        responseType: 'blob',
      })
    );
  },
  /**
    @selectedPlanId string,
  */
  acceptPayout: async ({ id, ...req }) => {
    return ApiService(api.put(`payouts/${id}/acceptance`, req));
  },
  rejectPayout: async (id) => {
    return ApiService(api.put(`payouts/${id}/rejection`));
  },

  attachedDocuments: async (id) => {
    return ApiService(api.get(`payouts/${id}/attachedDocuments`));
  },
  attachedDocumentById: async ({ id, docId }) => {
    return ApiService(api.get(`payouts/${id}/attachedDocuments/${docId}`));
  },

  uploadDocument: async ({ id, docId, file, progress }) => {
    const formData = new FormData();
    formData.append('file', file);

    return ApiService(
      api.put(`payouts/${id}/attachedDocuments/${docId}/content`, formData, {
        timeout: 360 * 1000,
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total);
          progress && progress(percentCompleted);
        },
      })
    );
  },
  deleteDocument: async ({ id, docId }) => {
    return ApiService(api.delete(`payouts/${id}/attachedDocuments/${docId}/content`));
  },
  /**
    @sum Number,
    @paymentMethodId String
    @selectedPlanId String
    @returnUrl String
  */
  initPayment: async ({ id, ...req }) => {
    return ApiService(api.post(`payouts/${id}/redemptions`, req));
  },
};
