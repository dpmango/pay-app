import { getEnv } from '@helpers';

export default {
  session: {
    create: 'api/session/create',
    alive: 'api/session/alive',
  },

  file: {
    upload: 'api/file/upload',
    delete: 'api/file/delete',
  },
};
