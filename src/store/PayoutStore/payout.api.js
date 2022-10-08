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
    return ApiService(api.get(`payouts/${id}/document/pdf`));
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
};
