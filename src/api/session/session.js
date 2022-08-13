import { api, endpoints } from '@api';

export default {
  create: async () => {
    return api.post(endpoints.session.create);
  },
  alive: async (req) => {
    /**
      @sessionId string
      @cartId string
    */
    return api.post(endpoints.session.alive, req);
  },
};
