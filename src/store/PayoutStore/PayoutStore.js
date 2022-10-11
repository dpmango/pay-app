import { makeAutoObservable, runInAction } from 'mobx';
import api from './payout.api';

export default class PayoutStore {
  payouts = [];
  payout = {};
  documents = [];

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

  setDocuments(payload) {
    runInAction(() => {
      this.documents = [...payload];
    });
  }

  updateDocument(payload) {
    runInAction(() => {
      this.documents = [...this.documents.map((x) => (x.id === payload.id ? { ...payload } : x))];
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

  async getAttachedDocuments(id) {
    const [err, data] = await api.attachedDocuments(id);

    if (err) throw err;
    this.setDocuments(data);

    return data;
  }

  async getAttachedDocument(req) {
    const [err, data] = await api.attachedDocumentById(req);

    if (err) throw err;
    this.updateDocument(data);

    return data;
  }

  async uploadDocument(req) {
    const [err, data, status] = await api.uploadDocument(req);

    if (err) throw err;

    if (status === 204) {
      await this.getAttachedDocuments(req.id);
    }

    return data;
  }

  async deleteDocument(req) {
    const [err, data] = await api.deleteDocument(req);

    if (err) throw err;

    return data;
  }
}
