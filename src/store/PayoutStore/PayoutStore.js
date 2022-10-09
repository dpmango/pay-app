import { makeAutoObservable, runInAction } from 'mobx';
import api from './payout.api';

export default class PayoutStore {
  payouts = [];
  payout = {};

  constructor() {
    makeAutoObservable(this);
  }

  // inner actions
  setPayouts(payload) {
    runInAction(() => {
      this.payouts = [...payload];
    });
  }

  setPayout(payload) {
    runInAction(() => {
      this.payout = { ...this.payout, ...payload };
    });
  }

  // api actions
  async getPayouts(req) {
    const [err, data] = await api.payouts(req);

    if (err) throw err;
    this.setPayouts(data);

    return data;
  }

  async getPayout(id) {
    const [err, data] = await api.payoutById(id);

    if (err) throw err;
    this.setPayout(data);

    return data;
  }

  async getPayoutDocument(id) {
    const [err, data] = await api.payoutDocument(id);

    if (err) throw err;
    this.setPayout({ document: data });

    return data;
  }

  async getPayoutPdf(id) {
    const [err, data] = await api.payoutDocumentPdf(id);

    if (err) throw err;
    // this.setPayout({ document: data });

    return data;
  }

  async acceptPayout(req) {
    const [err, data] = await api.acceptPayout(req);

    if (err) throw err;

    return data;
  }
}
