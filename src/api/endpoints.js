import { getEnv } from '@helpers';

export default {
  session: {
    create: 'login',
    confirm: 'login/confirmation',
    renew: 'login/renewal',
  },

  profile: {
    read: 'profile',
  },

  file: {
    upload: 'api/file/upload',
    delete: 'api/file/delete',
  },
};
