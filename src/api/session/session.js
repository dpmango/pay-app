import { api, endpoints, withVersion } from '@api';

export default {
  /**
    @method "PhoneOTP",
    @phone string
  */
  create: async (req) => {
    return api.put(endpoints.session.create, req, {
      ...withVersion(),
    });
  },
  /**
    @confirmationToken "PhoneOTP",
    @confirmationCode string
  */
  confirm: async (req) => {
    return api.put(endpoints.session.confirm, req, {
      ...withVersion(),
    });
  },
  /**
    @refreshToken string
  */
  renew: async (req) => {
    return api.put(endpoints.session.renew, req, {
      ...withVersion(),
    });
  },
  profile: async () => {
    return api.get(endpoints.profile.read, {
      ...withVersion(),
    });
  },
};
