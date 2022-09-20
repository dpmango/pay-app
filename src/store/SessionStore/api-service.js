import { ApiService } from '@services';
import api from '@api/session';

class SessionService extends ApiService {
  async send(action, req) {
    try {
      // console.log(action, typeof api[action], req);
      const { data } = await api[action](req);

      return [null, data];
    } catch (error) {
      this.handleError(error);

      return [error, null];
    }
  }
}

export default new SessionService();
