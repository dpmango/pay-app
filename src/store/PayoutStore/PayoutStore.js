import { makeAutoObservable, runInAction } from 'mobx';
import api from './payout.api';

export default class PayoutStore {
  payouts = [];

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  // inner actions
  setPayouts(payload) {
    runInAction(() => {
      this.payouts = [...payload];
    });
  }

  async init() {
    // const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
    // const refreshToken = Cookies.get(AUTH_REFRESH_COOKIE);
  }

  async getPayouts(req) {
    const [err, data] = await api.payouts(req);

    if (err) throw err;
    this.setPayouts(data);

    return data;
  }
}
